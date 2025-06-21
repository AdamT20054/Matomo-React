import { MatomoProviderConfig, TrackEventParams, TrackPageViewParams, TrackSiteSearchParams, MatomoPaqArray } from "../types";
declare global {
    interface Window {
        _paq: MatomoPaqArray;
    }
}
export declare class MatomoTracker {
    private options;
    constructor(options: MatomoProviderConfig);
    private initialize;
    private configureTracker;
    private configureHeartbeat;
    private configureLinkTracking;
    private applyCustomConfigurations;
    private enableJSErrorTracking;
    private loadTrackerScript;
    trackPageView(parameters?: TrackPageViewParams): void;
    trackEvent({ category, action, name, value, ...otherParams }: TrackEventParams): void;
    trackSiteSearch({ keyword, category, count, ...otherParams }: TrackSiteSearchParams): void;
    addCustomInstruction(name: string, ...args: any[]): this;
    private enableLinkTracking;
    private enableHeartBeatTimer;
    private track;
    private getPageUrl;
}
//# sourceMappingURL=MatomoTracker.d.ts.map