"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequiredOptions = validateRequiredOptions;
exports.checkForMisconfigurations = checkForMisconfigurations;
exports.logTracking = logTracking;
function validateRequiredOptions(options) {
    if (!options.siteId) {
        return {
            isValid: false,
            message: "You must specify the site identifier (siteId)."
        };
    }
    if (!options.trackerBaseUrl && !options.urlBase && !options.trackerUrl) {
        return {
            isValid: false,
            message: "You must specify either trackerBaseUrl/urlBase or trackerUrl."
        };
    }
    return { isValid: true };
}
function checkForMisconfigurations(options, debug) {
    if (!debug)
        return;
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
    if (options.trackerUrl && options.trackerBaseUrl) {
        console.warn("[Matomo] Both 'trackerUrl' and 'trackerBaseUrl' are specified. 'trackerUrl' will take precedence.");
    }
    if (options.srcUrl && options.trackerBaseUrl) {
        console.warn("[Matomo] Both 'srcUrl' and 'trackerBaseUrl' are specified. 'srcUrl' will take precedence for script loading.");
    }
    if (options.heartBeat && typeof options.heartBeat.seconds === 'number' && options.heartBeat.seconds < 5) {
        console.warn("[Matomo] Very low heartbeat interval detected. Values below 5 seconds may cause performance issues.");
    }
}
function logTracking(command, args, debug) {
    if (debug) {
        console.log(`[Matomo] Executing: ${command}`, args);
    }
}
//# sourceMappingURL=validation.js.map