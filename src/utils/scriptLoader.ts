import { MatomoProviderConfig } from "../types";

/**
 * Extracts the path from a URL
 * @param url - The URL to extract the path from
 * @returns The path part of the URL
 */
function extractPathFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch (e) {
    // If URL parsing fails, return the original URL
    return url;
  }
}

/**
 * Returns default filenames for Matomo trackers
 * @returns An object with default jsFileName and phpFileName
 */
function getDefaultFilenames(): { jsFileName: string, phpFileName: string } {
  return {
    jsFileName: "matomo.js",
    phpFileName: "matomo.php"
  };
}

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

  // Determine the JS filename
  const baseUrl = options.trackerBaseUrl;
  const defaultFilenames = getDefaultFilenames();

  // Use custom filename if specified, otherwise use default
  const jsFileName = (options.matomoJsFileName && options.matomoJsFileName !== "matomo.js") 
    ? options.matomoJsFileName 
    : defaultFilenames.jsFileName;

  // Set the script source
  scriptElement.src = `${baseUrl}/${jsFileName}`;

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
  // Determine the PHP filename
  const baseUrl = options.trackerBaseUrl;
  const defaultFilenames = getDefaultFilenames();

  // Use custom filename if specified, otherwise use default
  const phpFileName = (options.matomoPhpFileName && options.matomoPhpFileName !== "matomo.php") 
    ? options.matomoPhpFileName 
    : defaultFilenames.phpFileName;

  return `${baseUrl}/${phpFileName}`;
}
