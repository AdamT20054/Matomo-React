import React, { ReactNode } from "react";
import { MatomoTracker } from "../lib";
import { MatomoProviderConfig, TrackEventParams, TrackPageViewParams, TrackSiteSearchParams } from "../types";
type MatomoContextProps = {
    tracker: MatomoTracker;
};
export declare const useMatomo: () => MatomoContextProps;
export declare const useMatomoEvent: () => {
    trackPageView: (params?: TrackPageViewParams) => void;
    trackEvent: (params: TrackEventParams) => void;
    trackSiteSearch: (params: TrackSiteSearchParams) => void;
    addCustomInstruction: (name: string, ...args: any[]) => MatomoTracker;
};
export declare const MatomoProvider: ({ config, children, }: {
    children: ReactNode;
    config: MatomoProviderConfig;
}) => React.JSX.Element;
export {};
//# sourceMappingURL=useMatomo.d.ts.map