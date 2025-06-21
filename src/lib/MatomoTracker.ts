import { TrackType } from "../enums";
import {
  MatomoProviderConfig,
  CustomDimension,
  TrackParams,
  TrackEventParams,
  TrackPageViewParams,
  TrackSiteSearchParams,
  MatomoPaqArray,
  MatomoCommand,
  DEFAULT_CONFIG,
} from "../types";
import {
  loadMatomoScript,
  constructTrackerUrl,
  validateRequiredOptions,
  checkForMisconfigurations,
  logTracking,
} from "../utils";

/**
 * Extends the global Window interface to include the _paq array used by Matomo
 * This declaration is used throughout the codebase when accessing window._paq
 * @public
 * @noinspection JSUnusedGlobalSymbols
 */
declare global {
  interface Window {
    _paq: MatomoPaqArray;
  }
}

/**
 * Main class for interacting with the Matomo analytics tracker
 * @public
 */
export class MatomoTracker {
  private readonly options: MatomoProviderConfig;

  /**
   * Creates a new instance of the Matomo tracker
   * @param options - Configuration options for the Matomo tracker
   * @throws Error if required configuration options are missing
   * @public
   */
  constructor(options: MatomoProviderConfig) {
    // Apply default values
    this.options = {
      ...DEFAULT_CONFIG,
      ...options,
    };

    // Deprecated: disabled property is no longer supported

    // Deprecated: linkTracking property is no longer supported

    // Validate required options
    const validationResult = validateRequiredOptions(this.options);
    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    // Check for misconfigurations
    checkForMisconfigurations(this.options, !!this.options.debug);

    // Initialize the tracker
    this.initialize();
  }

  /**
   * Initializes the Matomo tracker with the provided configuration
   * @private
   */
  private initialize(): void {
    if (typeof window === "undefined") {
      return;
    }

    window._paq = window._paq || [];

    if (window._paq.length !== 0) {
      return;
    }

    if (this.options.disableTracking) {
      return;
    }

    this.configureTracker();
    this.configureHeartbeat();
    this.configureLinkTracking();
    this.applyCustomConfigurations();

    // Enable JS error tracking if configured
    if (this.options.enableJSErrorTracking) {
      this.enableJSErrorTracking();
    }

    // Load the Matomo script
    this.loadTrackerScript();
  }

  /**
   * Configures the basic tracker settings
   * @private
   */
  private configureTracker(): void {
    // Set tracker URL
    const trackerUrl = constructTrackerUrl(this.options);
    this.addCustomInstruction("setTrackerUrl", trackerUrl);

    // Set site ID
    this.addCustomInstruction("setSiteId", this.options.siteId);

    // Set user ID if specified
    if (this.options.userId) {
      this.addCustomInstruction("setUserId", this.options.userId);
    }

    // Set request method if specified
    if (this.options.requestMethod) {
      this.addCustomInstruction("setRequestMethod", this.options.requestMethod);
    }
  }

  /**
   * Configures the heartbeat feature
   * @private
   */
  private configureHeartbeat(): void {
    if (this.options.heartBeat && this.options.heartBeat.active !== false) {
      const seconds = this.options.heartBeat.seconds || 15;
      this.enableHeartBeatTimer(seconds);
    }
  }

  /**
   * Configures link tracking
   * @private
   */
  private configureLinkTracking(): void {
    this.enableLinkTracking(!this.options.disableLinkTracking);
  }

  /**
   * Applies custom configurations
   * @private
   */
  private applyCustomConfigurations(): void {
    if (this.options.configurations) {
      Object.entries(this.options.configurations).forEach(([key, value]) => {
        this.addCustomInstruction(key, value);
      });
    }
  }

  /**
   * Enables JavaScript error tracking
   * @private
   */
  private enableJSErrorTracking(): void {
    this.addCustomInstruction("enableJSErrorTracking");
  }

  /**
   * Loads the Matomo tracking script
   * @private
   */
  private loadTrackerScript(): void {
    loadMatomoScript(this.options);
  }

  /**
   * Tracks a page view
   * @public
   * @noinspection JSUnusedGlobalSymbols
   */
  trackPageView(parameters?: TrackPageViewParams): void {
    this.track({ data: [TrackType.PAGE_VIEW], ...parameters });
  }

  /**
   * Tracks an event
   * @public
   * @noinspection JSUnusedGlobalSymbols
   */
  trackEvent({
    category,
    action,
    name,
    value,
    ...otherParams
  }: TrackEventParams): void {
    if (category && action) {
      this.track({
        data: [TrackType.EVENT, category, action, name, value],
        ...otherParams,
      });
    } else {
      throw new Error(
        "You must specify an action and a category for the event.",
      );
    }
  }

  /**
   * Tracks a site search
   * @public
   * @noinspection JSUnusedGlobalSymbols
   */
  trackSiteSearch({
    keyword,
    category,
    count,
    ...otherParams
  }: TrackSiteSearchParams) {
    if (keyword) {
      this.track({
        data: [TrackType.SEARCH, keyword, category, count],
        ...otherParams,
      });
    } else {
      throw new Error("You must specify a keyword for the site search.");
    }
  }

  /**
   * Adds a custom instruction to the Matomo tracker
   * @param name - The name of the Matomo tracking API method to call
   * @param args - Arguments to pass to the Matomo tracking API method
   * @returns The tracker instance for method chaining
   * @public
   */
  addCustomInstruction(name: string, ...args: any[]): this {
    if (typeof window !== "undefined") {
      // Log the tracking command if debug mode is enabled
      logTracking(name, args, !!this.options.debug);

      window._paq.push([name, ...args]);
    }
    return this;
  }

  /**
   * Enables or disables automatic link tracking
   * @param active - Whether link tracking should be enabled
   * @private
   */
  private enableLinkTracking(active: boolean): void {
    this.addCustomInstruction("enableLinkTracking", active);
  }

  /**
   * Enables the heartbeat timer to track time spent on page
   * @param interval - Interval in seconds between heartbeat requests
   * @private
   */
  private enableHeartBeatTimer(interval: number): void {
    this.addCustomInstruction("enableHeartBeatTimer", interval);
  }

  /**
   * Core tracking method used by all specific tracking methods
   * @param params - Parameters for the tracking request
   * @param params.data - Array containing tracking data to be sent to Matomo
   * @param params.documentTitle - Custom document title for the page view
   * @param params.href - Custom URL for the page view
   * @param params.customDimensions - Custom dimensions to set for this tracking request
   * @private
   */
  private track({
    data = [],
    documentTitle = window.document.title,
    href,
    customDimensions = false,
  }: TrackParams): void {
    // Skip tracking if disabled
    if (this.options.disableTracking) {
      if (this.options.debug) {
        console.log("[Matomo] Tracking disabled, skipping track call:", data);
      }
      return;
    }

    if (data.length) {
      // Set custom dimensions if provided
      if (
        customDimensions &&
        Array.isArray(customDimensions) &&
        customDimensions.length
      ) {
        customDimensions.forEach((customDimension: CustomDimension) =>
          this.addCustomInstruction(
            "setCustomDimension",
            customDimension.id,
            customDimension.value,
          ),
        );
      }

      // Set custom URL and document title
      this.addCustomInstruction("setCustomUrl", href ?? this.getPageUrl());
      this.addCustomInstruction("setDocumentTitle", documentTitle);

      // Execute the tracking command
      const trackCommand: MatomoCommand = [data[0] as string, ...data.slice(1)];
      this.addCustomInstruction(...trackCommand);
    }
  }

  // The addTrackerToDOM method has been replaced by the loadTrackerScript method
  // which uses the loadMatomoScript utility function

  /**
   * Gets the current page URL, applying any configured URL transformer
   * @returns The current page URL, possibly transformed
   * @private
   */
  private getPageUrl(): string {
    if (this.options.urlTransformer) {
      return this.options.urlTransformer(window.location.href);
    }
    return window.location.href;
  }
}
