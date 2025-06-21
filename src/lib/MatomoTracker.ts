import { TrackType } from "../enums";
import {
  MatomoProviderConfig,
  CustomDimension,
  TrackParams,
  TrackEventParams,
  TrackPageViewParams,
  TrackSiteSearchParams,
} from "../types";

/**
 * Extends the global Window interface to include the _paq array used by Matomo
 * @public
 */
declare global {
  interface Window {
    _paq: any[];
  }
}

/**
 * Main class for interacting with the Matomo analytics tracker
 * @public
 */
export class MatomoTracker {
  private options: MatomoProviderConfig;

  /**
   * Creates a new instance of the Matomo tracker
   * @param options - Configuration options for the Matomo tracker
   * @throws Error if required configuration options are missing
   * @public
   */
  constructor(options: MatomoProviderConfig) {
    // Handle urlBase as an alias for trackerBaseUrl
    if (options.urlBase && !options.trackerBaseUrl) {
      options.trackerBaseUrl = options.urlBase;
    }

    if (!options.trackerBaseUrl && !options.trackerUrl) {
      throw new Error("You must specify either trackerBaseUrl/urlBase or trackerUrl.");
    }
    if (!options.siteId) {
      throw new Error("You must specify the site identifier.");
    }

    // Handle disabled as an alias for disableTracking
    if (options.disabled !== undefined && options.disableTracking === undefined) {
      options.disableTracking = options.disabled;
    }

    // Handle linkTracking as the inverse of disableLinkTracking
    if (options.linkTracking !== undefined && options.disableLinkTracking === undefined) {
      options.disableLinkTracking = !options.linkTracking;
    }

    this.options = options;

    this.launch();
  }

  /**
   * Initializes the Matomo tracker with the provided configuration
   * @private
   */
  private launch() {
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

    // Set tracker URL
    if (this.options.trackerUrl) {
      // Use trackerUrl directly if provided
      this.addCustomInstruction("setTrackerUrl", this.options.trackerUrl);
    } else {
      // Otherwise construct from trackerBaseUrl and matomoPhpFileName
      const phpFileName = this.options.matomoPhpFileName || "matomo.php";
      this.addCustomInstruction(
        "setTrackerUrl",
        this.options.trackerBaseUrl + "/" + phpFileName
      );
    }

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

    // Configure heartbeat
    if (this.options.heartBeat) {
      // New format with active and seconds properties
      if (this.options.heartBeat.active !== false) {
        const seconds = this.options.heartBeat.seconds || 15;
        this.enableHeartBeatTimer(seconds);
      }
    } else if (this.options.heartbeat === undefined || this.options.heartbeat) {
      // Legacy format
      const heartbeatInterval =
        typeof this.options.heartbeat === "number" &&
        Math.round(this.options.heartbeat) > 0
          ? Math.round(this.options.heartbeat)
          : 15;
      this.enableHeartBeatTimer(heartbeatInterval);
    }

    // Configure link tracking
    this.enableLinkTracking(!this.options.disableLinkTracking);

    // Apply custom configurations
    if (this.options.configurations) {
      Object.entries(this.options.configurations).forEach(([key, value]) => {
        this.addCustomInstruction(key, value);
      });
    }

    this.addTrackerToDOM();
  }

  /**
   * Tracks a page view
   * @public
   */
  trackPageView(parameters?: TrackPageViewParams): void {
    this.track({ data: [TrackType.PAGE_VIEW], ...parameters });
  }

  /**
   * Tracks an event
   * @public
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
        "You must specify an action and a category for the event."
      );
    }
  }

  /**
   * Tracks a site search
   * @public
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
    if (data.length) {
      if (
        customDimensions &&
        Array.isArray(customDimensions) &&
        customDimensions.length
      ) {
        customDimensions.forEach((customDimension: CustomDimension) =>
          this.addCustomInstruction(
            "setCustomDimension",
            customDimension.id,
            customDimension.value
          )
        );
      }

      this.addCustomInstruction("setCustomUrl", href ?? this.getPageUrl());
      this.addCustomInstruction("setDocumentTitle", documentTitle);
      this.addCustomInstruction(...(data as [string, ...any[]]));
    }
  }

  /**
   * Adds the Matomo tracking script to the DOM
   * @private
   */
  private addTrackerToDOM(): void {
    const doc = document;
    const scriptElement = doc.createElement("script");
    const scripts = doc.getElementsByTagName("script")[0];

    scriptElement.type = "text/javascript";
    scriptElement.async = true;
    scriptElement.defer = true;

    // Use srcUrl if provided, otherwise construct from trackerBaseUrl and matomoJsFileName
    if (this.options.srcUrl) {
      scriptElement.src = this.options.srcUrl;
    } else {
      const jsFileName = this.options.matomoJsFileName || "matomo.js";
      scriptElement.src = `${this.options.trackerBaseUrl}/${jsFileName}`;
    }

    scripts?.parentNode?.insertBefore(scriptElement, scripts);
  }

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
