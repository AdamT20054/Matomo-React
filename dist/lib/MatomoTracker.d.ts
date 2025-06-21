import { MatomoProviderConfig, TrackEventParams, TrackPageViewParams, TrackSiteSearchParams } from "../types";
declare global {
    interface Window {
        _paq: any[];
    }
}
export declare class MatomoTracker {
    private options;
    constructor(options: MatomoProviderConfig);
    private launch;
    trackPageView(parameters?: TrackPageViewParams): void;
    trackEvent({ category, action, name, value, ...otherParams }: TrackEventParams): void;
    trackSiteSearch({ keyword, category, count, ...otherParams }: TrackSiteSearchParams): void;
    addCustomInstruction(name: string, ...args: any[]): this;
    private enableLinkTracking;
    private enableHeartBeatTimer;
    private track;
    private addTrackerToDOM;
    private getPageUrl;
}
//# sourceMappingURL=MatomoTracker.d.ts.map