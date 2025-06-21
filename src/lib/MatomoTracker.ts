import { TrackType } from "../enums";
import {
  MatomoProviderConfig,
  CustomDimension,
  TrackParams,
  TrackEventParams,
  TrackPageViewParams,
  TrackSiteSearchParams,
} from "../types";

declare global {
  interface Window {
    _paq: any[];
  }
}

export class MatomoTracker {
  private options: MatomoProviderConfig;

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

  trackPageView(parameters?: TrackPageViewParams): void {
    this.track({ data: [TrackType.PAGE_VIEW], ...parameters });
  }

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

  addCustomInstruction(name: string, ...args: any[]): this {
    if (typeof window !== "undefined") {
      window._paq.push([name, ...args]);
    }
    return this;
  }

  private enableLinkTracking(active: boolean): void {
    this.addCustomInstruction("enableLinkTracking", active);
  }

  private enableHeartBeatTimer(interval: number): void {
    this.addCustomInstruction("enableHeartBeatTimer", interval);
  }

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
        customDimensions.map((customDimension: CustomDimension) =>
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

  private getPageUrl(): string {
    if (this.options.urlTransformer) {
      return this.options.urlTransformer(window.location.href);
    }
    return window.location.href;
  }
}
