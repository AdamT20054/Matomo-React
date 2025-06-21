import { MatomoProviderConfig, ValidationResult } from "../types";

/**
 * Validates the required configuration options
 * @param options - Configuration options for the Matomo tracker
 * @returns Validation result with isValid flag and optional error message
 */
export function validateRequiredOptions(options: MatomoProviderConfig): ValidationResult {
  // Check for required siteId
  if (!options.siteId) {
    return {
      isValid: false,
      message: "You must specify the site identifier (siteId)."
    };
  }

  // Check for required URL options
  if (!options.trackerBaseUrl && !options.urlBase && !options.trackerUrl) {
    return {
      isValid: false,
      message: "You must specify either trackerBaseUrl/urlBase or trackerUrl."
    };
  }

  return { isValid: true };
}

/**
 * Checks for common misconfigurations and logs warnings
 * @param options - Configuration options for the Matomo tracker
 * @param debug - Whether debug mode is enabled
 */
export function checkForMisconfigurations(options: MatomoProviderConfig, debug: boolean): void {
  // Skip if debug mode is disabled
  if (!debug) return;

  // Check for deprecated options
  if (options.urlBase) {
    console.warn("[Matomo] 'urlBase' is deprecated. Use 'trackerBaseUrl' instead.");
  }

  if (options.disabled !== undefined) {
    console.warn("[Matomo] 'disabled' is deprecated. Use 'disableTracking' instead.");
  }

  if (options.linkTracking !== undefined) {
    console.warn("[Matomo] 'linkTracking' is deprecated. Use 'disableLinkTracking' (with inverse value) instead.");
  }

  if (options.heartbeat !== undefined) {
    console.warn("[Matomo] 'heartbeat' is deprecated. Use 'heartBeat' with 'active' and 'seconds' properties instead.");
  }

  // Check for potential conflicts
  if (options.trackerUrl && options.trackerBaseUrl) {
    console.warn("[Matomo] Both 'trackerUrl' and 'trackerBaseUrl' are specified. 'trackerUrl' will take precedence.");
  }

  if (options.srcUrl && options.trackerBaseUrl) {
    console.warn("[Matomo] Both 'srcUrl' and 'trackerBaseUrl' are specified. 'srcUrl' will take precedence for script loading.");
  }

  // Check for potentially incorrect values
  if (options.heartBeat && typeof options.heartBeat.seconds === 'number' && options.heartBeat.seconds < 5) {
    console.warn("[Matomo] Very low heartbeat interval detected. Values below 5 seconds may cause performance issues.");
  }
}

/**
 * Logs tracking information to the console in debug mode
 * @param command - The Matomo command being executed
 * @param args - Arguments for the command
 * @param debug - Whether debug mode is enabled
 */
export function logTracking(command: string, args: any[], debug: boolean): void {
  if (debug) {
    console.log(`[Matomo] Executing: ${command}`, args);
  }
}