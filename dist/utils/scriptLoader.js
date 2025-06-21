"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMatomoScript = loadMatomoScript;
exports.constructTrackerUrl = constructTrackerUrl;
function getDefaultFilenames() {
    return {
        jsFileName: 'matomo.js',
        phpFileName: 'matomo.php',
    };
}
function loadMatomoScript(options) {
    var _a;
    const doc = document;
    const scriptElement = doc.createElement('script');
    const scripts = doc.getElementsByTagName('script')[0];
    scriptElement.type = 'text/javascript';
    scriptElement.async = true;
    scriptElement.defer = true;
    const baseUrl = options.trackerBaseUrl;
    const defaultFilenames = getDefaultFilenames();
    const jsFileName = options.matomoJsFileName && options.matomoJsFileName !== 'matomo.js'
        ? options.matomoJsFileName
        : defaultFilenames.jsFileName;
    scriptElement.src = `${baseUrl}/${jsFileName}`;
    if (options.deferTracking) {
        scriptElement.setAttribute('loading', 'lazy');
    }
    (_a = scripts === null || scripts === void 0 ? void 0 : scripts.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(scriptElement, scripts);
    return scriptElement;
}
function constructTrackerUrl(options) {
    const baseUrl = options.trackerBaseUrl;
    const defaultFilenames = getDefaultFilenames();
    const phpFileName = options.matomoPhpFileName && options.matomoPhpFileName !== 'matomo.php'
        ? options.matomoPhpFileName
        : defaultFilenames.phpFileName;
    return `${baseUrl}/${phpFileName}`;
}
//# sourceMappingURL=scriptLoader.js.map