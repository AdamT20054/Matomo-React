import { MatomoProviderConfig, ValidationResult } from "../types";

/**
 * Validates the required configuration options
 * @param options - Configuration options for the Matomo tracker
 * @returns Validation result with isValid flag and optional error message
 */
export function validateRequiredOptions(
  options: MatomoProviderConfig,
): ValidationResult {
  // Check for required siteId
  if (!options.siteId) {
    return {
      isValid: false,
      message: "You must specify the site identifier (siteId).",
    };
  }

  // Check for required trackerBaseUrl
  if (!options.trackerBaseUrl) {
    return {
      isValid: false,
      message: "You must specify the trackerBaseUrl.",
    };
  }

  return { isValid: true };
}

/**
 * Checks for common misconfigurations and logs warnings
 * @param options - Configuration options for the Matomo tracker
 * @param debug - Whether debug mode is enabled
 */
export function checkForMisconfigurations(
  options: MatomoProviderConfig,
  debug: boolean,
): void {
  // Skip if debug mode is disabled
  if (!debug) return;

  // No deprecated options warnings - deprecated features have been removed

  // Check for potentially incorrect values
  if (
    options.heartBeat &&
    typeof options.heartBeat.seconds === "number" &&
    options.heartBeat.seconds < 5
  ) {
    console.warn(
      "[Matomo] Very low heartbeat interval detected. Values below 5 seconds may cause performance issues.",
    );
  }
}

/**
 * Logs tracking information to the console in debug mode
 * @param command - The Matomo command being executed
 * @param args - Arguments for the command
 * @param debug - Whether debug mode is enabled
 */
export function logTracking(
  command: string,
  args: any[],
  debug: boolean,
): void {
  if (debug) {
    console.log(`[Matomo] Executing: ${command}`, args);
  }
}
