import { RequestMethod } from "../enums";
export interface HeartBeatConfig {
    active?: boolean;
    seconds?: number;
}
export type MatomoProviderConfig = {
    siteId: string | number;
    trackerBaseUrl?: string;
    urlBase?: string;
    userId?: string;
    disableTracking?: boolean;
    disabled?: boolean;
    urlTransformer?: (url: string) => string;
    heartbeat?: boolean | number;
    heartBeat?: HeartBeatConfig;
    disableLinkTracking?: boolean;
    linkTracking?: boolean;
    matomoJsFileName?: string;
    matomoPhpFileName?: string;
    trackerUrl?: string;
    srcUrl?: string;
    requestMethod?: RequestMethod;
    configurations?: Record<string, any>;
};
//# sourceMappingURL=MatomoProviderConfig.type.d.ts.map