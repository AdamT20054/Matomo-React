import { RequestMethod } from '../enums';
export interface HeartBeatConfig {
    active?: boolean;
    seconds?: number;
}
export declare const DEFAULT_CONFIG: {
    disableTracking: boolean;
    disableLinkTracking: boolean;
    enableJSErrorTracking: boolean;
    heartBeat: {
        active: boolean;
        seconds: number;
    };
    matomoJsFileName: string;
    matomoPhpFileName: string;
    debug: boolean;
    deferTracking: boolean;
};
export type MatomoProviderConfig = {
    siteId: string | number;
    trackerBaseUrl: string;
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
    requestMethod?: RequestMethod;
    configurations?: Record<string, any>;
    debug?: boolean;
    deferTracking?: boolean;
    enableJSErrorTracking?: boolean;
};
//# sourceMappingURL=MatomoProviderConfig.type.d.ts.map