"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatomoTracker = void 0;
const enums_1 = require("../enums");
const types_1 = require("../types");
const utils_1 = require("../utils");
class MatomoTracker {
    constructor(options) {
        this.options = Object.assign(Object.assign({}, types_1.DEFAULT_CONFIG), options);
        if (this.options.disabled !== undefined && this.options.disableTracking === undefined) {
            this.options.disableTracking = this.options.disabled;
        }
        if (this.options.linkTracking !== undefined && this.options.disableLinkTracking === undefined) {
            this.options.disableLinkTracking = !this.options.linkTracking;
        }
        const validationResult = (0, utils_1.validateRequiredOptions)(this.options);
        if (!validationResult.isValid) {
            throw new Error(validationResult.message);
        }
        (0, utils_1.checkForMisconfigurations)(this.options, !!this.options.debug);
        this.initialize();
    }
    initialize() {
        if (typeof window === "undefined") {
            return;
        }
        window._paq = window._paq || [];
        if (window._paq.length !== 0) {
            return;
        }
        if (this.options.disableTracking) {
            return;
        }
        this.configureTracker();
        this.configureHeartbeat();
        this.configureLinkTracking();
        this.applyCustomConfigurations();
        if (this.options.enableJSErrorTracking) {
            this.enableJSErrorTracking();
        }
        this.loadTrackerScript();
    }
    configureTracker() {
        const trackerUrl = (0, utils_1.constructTrackerUrl)(this.options);
        this.addCustomInstruction("setTrackerUrl", trackerUrl);
        this.addCustomInstruction("setSiteId", this.options.siteId);
        if (this.options.userId) {
            this.addCustomInstruction("setUserId", this.options.userId);
        }
        if (this.options.requestMethod) {
            this.addCustomInstruction("setRequestMethod", this.options.requestMethod);
        }
    }
    configureHeartbeat() {
        if (this.options.heartBeat) {
            if (this.options.heartBeat.active !== false) {
                const seconds = this.options.heartBeat.seconds || 15;
                this.enableHeartBeatTimer(seconds);
            }
        }
        else if (this.options.heartbeat === undefined || this.options.heartbeat) {
            const heartbeatInterval = typeof this.options.heartbeat === "number" &&
                Math.round(this.options.heartbeat) > 0
                ? Math.round(this.options.heartbeat)
                : 15;
            this.enableHeartBeatTimer(heartbeatInterval);
        }
    }
    configureLinkTracking() {
        this.enableLinkTracking(!this.options.disableLinkTracking);
    }
    applyCustomConfigurations() {
        if (this.options.configurations) {
            Object.entries(this.options.configurations).forEach(([key, value]) => {
                this.addCustomInstruction(key, value);
            });
        }
    }
    enableJSErrorTracking() {
        this.addCustomInstruction("enableJSErrorTracking");
    }
    loadTrackerScript() {
        (0, utils_1.loadMatomoScript)(this.options);
    }
    trackPageView(parameters) {
        this.track(Object.assign({ data: [enums_1.TrackType.PAGE_VIEW] }, parameters));
    }
    trackEvent(_a) {
        var { category, action, name, value } = _a, otherParams = __rest(_a, ["category", "action", "name", "value"]);
        if (category && action) {
            this.track(Object.assign({ data: [enums_1.TrackType.EVENT, category, action, name, value] }, otherParams));
        }
        else {
            throw new Error("You must specify an action and a category for the event.");
        }
    }
    trackSiteSearch(_a) {
        var { keyword, category, count } = _a, otherParams = __rest(_a, ["keyword", "category", "count"]);
        if (keyword) {
            this.track(Object.assign({ data: [enums_1.TrackType.SEARCH, keyword, category, count] }, otherParams));
        }
        else {
            throw new Error("You must specify a keyword for the site search.");
        }
    }
    addCustomInstruction(name, ...args) {
        if (typeof window !== "undefined") {
            (0, utils_1.logTracking)(name, args, !!this.options.debug);
            window._paq.push([name, ...args]);
        }
        return this;
    }
    enableLinkTracking(active) {
        this.addCustomInstruction("enableLinkTracking", active);
    }
    enableHeartBeatTimer(interval) {
        this.addCustomInstruction("enableHeartBeatTimer", interval);
    }
    track({ data = [], documentTitle = window.document.title, href, customDimensions = false, }) {
        if (this.options.disableTracking) {
            if (this.options.debug) {
                console.log("[Matomo] Tracking disabled, skipping track call:", data);
            }
            return;
        }
        if (data.length) {
            if (customDimensions &&
                Array.isArray(customDimensions) &&
                customDimensions.length) {
                customDimensions.forEach((customDimension) => this.addCustomInstruction("setCustomDimension", customDimension.id, customDimension.value));
            }
            this.addCustomInstruction("setCustomUrl", href !== null && href !== void 0 ? href : this.getPageUrl());
            this.addCustomInstruction("setDocumentTitle", documentTitle);
            const trackCommand = [data[0], ...data.slice(1)];
            this.addCustomInstruction(...trackCommand);
        }
    }
    getPageUrl() {
        if (this.options.urlTransformer) {
            return this.options.urlTransformer(window.location.href);
        }
        return window.location.href;
    }
}
exports.MatomoTracker = MatomoTracker;
//# sourceMappingURL=MatomoTracker.js.map