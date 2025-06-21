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
 * Determines if a custom filename is needed based on the trackerBaseUrl
 * @param trackerBaseUrl - The base URL of the Matomo installation
 * @returns An object with jsFileName and phpFileName if custom filenames are detected, and baseUrl if it needs to be modified
 */
function detectCustomFilenames(trackerBaseUrl: string): { jsFileName?: string, phpFileName?: string, baseUrl?: string } {
  const path = extractPathFromUrl(trackerBaseUrl);

  // If the path ends with a filename (not just a directory)
  if (path && path.includes('.')) {
    const lastSegment = path.split('/').pop() || '';

    // If the path ends with a .js file, extract the filename
    if (lastSegment.endsWith('.js')) {
      const baseName = lastSegment.replace('.js', '');
      return {
        jsFileName: lastSegment,
        phpFileName: `${baseName}.php`,
        baseUrl: trackerBaseUrl.substring(0, trackerBaseUrl.lastIndexOf('/'))
      };
    }
  }

  // No custom filenames detected - use default filenames at the current path
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

  // Determine the JS filename and base URL
  let jsFileName = "matomo.js";
  let baseUrl = options.trackerBaseUrl;

  // Check if custom filenames are specified explicitly
  if (options.matomoJsFileName && options.matomoJsFileName !== "matomo.js") {
    jsFileName = options.matomoJsFileName;
  } else {
    // Auto-detect custom filenames from the trackerBaseUrl
    const customFilenames = detectCustomFilenames(options.trackerBaseUrl);
    jsFileName = customFilenames.jsFileName || "matomo.js";

    // Only modify the base URL if it was detected from a URL with a file extension
    if (customFilenames.baseUrl) {
      baseUrl = customFilenames.baseUrl;
    }
  }

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
  // Determine the PHP filename and base URL
  let phpFileName = "matomo.php";
  let baseUrl = options.trackerBaseUrl;

  // Check if custom filenames are specified explicitly
  if (options.matomoPhpFileName && options.matomoPhpFileName !== "matomo.php") {
    phpFileName = options.matomoPhpFileName;
  } else {
    // Auto-detect custom filenames from the trackerBaseUrl
    const customFilenames = detectCustomFilenames(options.trackerBaseUrl);
    phpFileName = customFilenames.phpFileName || "matomo.php";

    // Only modify the base URL if it was detected from a URL with a file extension
    if (customFilenames.baseUrl) {
      baseUrl = customFilenames.baseUrl;
    }
  }

  return `${baseUrl}/${phpFileName}`;
}
