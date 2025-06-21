import { RequestMethod } from "../enums";

export interface HeartBeatConfig {
  active?: boolean;
  seconds?: number;
}

export type MatomoProviderConfig = {
  // Required parameters
  siteId: string | number;

  // Base URL parameters (one of these is required)
  trackerBaseUrl?: string;
  urlBase?: string; // Alias for trackerBaseUrl

  // Optional parameters
  userId?: string;
  disableTracking?: boolean;
  disabled?: boolean; // Alias for disableTracking
  urlTransformer?: (url: string) => string;

  // Heartbeat configuration
  heartbeat?: boolean | number;
  heartBeat?: HeartBeatConfig; // New format with active and seconds properties

  // Link tracking
  disableLinkTracking?: boolean;
  linkTracking?: boolean; // Inverse of disableLinkTracking

  // Custom file names
  matomoJsFileName?: string;
  matomoPhpFileName?: string;

  // Custom URLs (override trackerBaseUrl + filename)
  trackerUrl?: string; // Override for trackerBaseUrl + matomoPhpFileName
  srcUrl?: string; // Override for trackerBaseUrl + matomoJsFileName

  // Request method
  requestMethod?: RequestMethod;

  // Custom Matomo configurations
  configurations?: Record<string, any>;
};
