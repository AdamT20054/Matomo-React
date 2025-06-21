"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMatomoScript = loadMatomoScript;
exports.constructTrackerUrl = constructTrackerUrl;
function loadMatomoScript(options) {
    var _a;
    const doc = document;
    const scriptElement = doc.createElement("script");
    const scripts = doc.getElementsByTagName("script")[0];
    scriptElement.type = "text/javascript";
    scriptElement.async = true;
    scriptElement.defer = true;
    if (options.srcUrl) {
        scriptElement.src = options.srcUrl;
    }
    else {
        const jsFileName = options.matomoJsFileName || "matomo.js";
        scriptElement.src = `${options.trackerBaseUrl}/${jsFileName}`;
    }
    if (options.deferTracking) {
        scriptElement.setAttribute("loading", "lazy");
    }
    (_a = scripts === null || scripts === void 0 ? void 0 : scripts.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(scriptElement, scripts);
    return scriptElement;
}
function constructTrackerUrl(options) {
    if (options.trackerUrl) {
        return options.trackerUrl;
    }
    const phpFileName = options.matomoPhpFileName || "matomo.php";
    return `${options.trackerBaseUrl}/${phpFileName}`;
}
//# sourceMappingURL=scriptLoader.js.map