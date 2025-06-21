import { MatomoProviderConfig } from "../types";

/**
 * Loads the Matomo tracking script into the DOM
 * @param options - Configuration options for the Matomo tracker
 * @returns The created script element
 */
export function loadMatomoScript(options: MatomoProviderConfig): HTMLScriptElement {
  const doc = document;
  const scriptElement = doc.createElement("script");
  const scripts = doc.getElementsByTagName("script")[0];

  scriptElement.type = "text/javascript";
  scriptElement.async = true;
  scriptElement.defer = true;

  // Use srcUrl if provided, otherwise construct from trackerBaseUrl and matomoJsFileName
  if (options.srcUrl) {
    scriptElement.src = options.srcUrl;
  } else {
    const jsFileName = options.matomoJsFileName || "matomo.js";
    scriptElement.src = `${options.trackerBaseUrl}/${jsFileName}`;
  }

  // If defer tracking is enabled, set the loading attribute to "lazy"
  if (options.deferTracking) {
    scriptElement.setAttribute("loading", "lazy");
  }

  scripts?.parentNode?.insertBefore(scriptElement, scripts);
  
  return scriptElement;
}

/**
 * Constructs the Matomo tracker URL based on configuration
 * @param options - Configuration options for the Matomo tracker
 * @returns The constructed tracker URL
 */
export function constructTrackerUrl(options: MatomoProviderConfig): string {
  if (options.trackerUrl) {
    return options.trackerUrl;
  }
  
  const phpFileName = options.matomoPhpFileName || "matomo.php";
  return `${options.trackerBaseUrl}/${phpFileName}`;
}