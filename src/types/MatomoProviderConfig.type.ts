import { RequestMethod } from "../enums";

export type MatomoProviderConfig = {
  trackerBaseUrl: string;
  siteId: string | number;
  disableTracking?: boolean;
  urlTransformer?: (url: string) => string;
  heartbeat?: boolean | number;
  disableLinkTracking?: boolean;
  matomoJsFileName?: string;
  matomoPhpFileName?: string;
  requestMethod?: RequestMethod;
};
