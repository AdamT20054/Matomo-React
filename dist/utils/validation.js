"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequiredOptions = validateRequiredOptions;
exports.checkForMisconfigurations = checkForMisconfigurations;
exports.logTracking = logTracking;
function validateRequiredOptions(options) {
    if (!options.siteId) {
        return {
            isValid: false,
            message: 'You must specify the site identifier (siteId).',
        };
    }
    if (!options.trackerBaseUrl) {
        return {
            isValid: false,
            message: 'You must specify the trackerBaseUrl.',
        };
    }
    return { isValid: true };
}
function checkForMisconfigurations(options, debug) {
    if (!debug)
        return;
    if (options.heartBeat &&
        typeof options.heartBeat.seconds === 'number' &&
        options.heartBeat.seconds < 5) {
        console.warn('[Matomo] Very low heartbeat interval detected. Values below 5 seconds may cause performance issues.');
    }
}
function logTracking(command, args, debug) {
    if (debug) {
        console.log(`[Matomo] Executing: ${command}`, args);
    }
}
//# sourceMappingURL=validation.js.map