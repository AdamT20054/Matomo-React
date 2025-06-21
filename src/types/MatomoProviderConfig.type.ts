import { RequestMethod } from "../enums";

/**
 * Configuration for the Matomo heartbeat feature
 * @public
 */
export interface HeartBeatConfig {
  /** Whether the heartbeat timer is active (default: true) */
  active?: boolean;
  /** Interval in seconds between heartbeat requests (default: 15) */
  seconds?: number;
}

/**
 * Default configuration values for the Matomo tracker
 * @internal
 */
export const DEFAULT_CONFIG = {
  disableTracking: false,
  disableLinkTracking: false,
  enableJSErrorTracking: false,
  enableHeartBeatTimer: true,
  heartBeatTimerInterval: 15,
  matomoJsFileName: "matomo.js",
  matomoPhpFileName: "matomo.php",
  debug: false,
  deferTracking: false,
};

/**
 * Configuration options for the Matomo tracker
 * @public
 */
export type MatomoProviderConfig = {
  // Required parameters
  /** 
   * The ID of the website in Matomo (required)
   */
  siteId: string | number;

  // Base URL parameters (one of these is required)
  /** 
   * Base URL of your Matomo installation (e.g., "https://analytics.example.com")
   * Either this or trackerUrl must be provided
   */
  trackerBaseUrl?: string;
  /**
   * @deprecated Use trackerBaseUrl instead
   */
  urlBase?: string; // Alias for trackerBaseUrl

  // Optional parameters
  /** 
   * User ID to associate with tracking data
   */
  userId?: string;
  /** 
   * Set to true to disable all tracking
   */
  disableTracking?: boolean;
  /**
   * @deprecated Use disableTracking instead
   */
  disabled?: boolean; // Alias for disableTracking
  /** 
   * Function to transform URLs before they are tracked
   */
  urlTransformer?: (url: string) => string;

  // Heartbeat configuration
  /**
   * @deprecated Use heartBeat with active and seconds properties instead
   */
  heartbeat?: boolean | number; // Legacy format
  /** 
   * Configuration for the heartbeat feature
   */
  heartBeat?: HeartBeatConfig; // New format with active and seconds properties

  // Link tracking
  /** 
   * Set to true to disable automatic link tracking
   */
  disableLinkTracking?: boolean;
  /**
   * @deprecated Use disableLinkTracking instead (with inverse value)
   */
  linkTracking?: boolean; // Inverse of disableLinkTracking

  // Custom file names
  /** 
   * Custom filename for the Matomo JavaScript tracker (default: "matomo.js")
   */
  matomoJsFileName?: string;
  /** 
   * Custom filename for the Matomo PHP tracker (default: "matomo.php")
   */
  matomoPhpFileName?: string;

  // Custom URLs (override trackerBaseUrl + filename)
  /** 
   * Complete URL to the Matomo PHP tracker
   * Overrides trackerBaseUrl + matomoPhpFileName
   */
  trackerUrl?: string;
  /** 
   * Complete URL to the Matomo JavaScript tracker
   * Overrides trackerBaseUrl + matomoJsFileName
   */
  srcUrl?: string;

  // Request method
  /** 
   * HTTP method to use for tracking requests
   */
  requestMethod?: RequestMethod;

  // Custom Matomo configurations
  /** 
   * Additional Matomo tracker configurations
   * Keys are Matomo API method names, values are the parameters
   */
  configurations?: Record<string, any>;

  // Debug and performance options
  /**
   * When true, logs tracking information to the console
   * Useful for debugging tracking issues
   */
  debug?: boolean;

  /**
   * When true, defers tracking until after critical page content has loaded
   * Improves initial page load performance
   */
  deferTracking?: boolean;

  /**
   * Enable JavaScript error tracking
   * When true, uncaught JavaScript errors will be tracked as events
   */
  enableJSErrorTracking?: boolean;
};
