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
class MatomoTracker {
    constructor(options) {
        if (options.urlBase && !options.trackerBaseUrl) {
            options.trackerBaseUrl = options.urlBase;
        }
        if (!options.trackerBaseUrl && !options.trackerUrl) {
            throw new Error("You must specify either trackerBaseUrl/urlBase or trackerUrl.");
        }
        if (!options.siteId) {
            throw new Error("You must specify the site identifier.");
        }
        if (options.disabled !== undefined && options.disableTracking === undefined) {
            options.disableTracking = options.disabled;
        }
        if (options.linkTracking !== undefined && options.disableLinkTracking === undefined) {
            options.disableLinkTracking = !options.linkTracking;
        }
        this.options = options;
        this.launch();
    }
    launch() {
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
        if (this.options.trackerUrl) {
            this.addCustomInstruction("setTrackerUrl", this.options.trackerUrl);
        }
        else {
            const phpFileName = this.options.matomoPhpFileName || "matomo.php";
            this.addCustomInstruction("setTrackerUrl", this.options.trackerBaseUrl + "/" + phpFileName);
        }
        this.addCustomInstruction("setSiteId", this.options.siteId);
        if (this.options.userId) {
            this.addCustomInstruction("setUserId", this.options.userId);
        }
        if (this.options.requestMethod) {
            this.addCustomInstruction("setRequestMethod", this.options.requestMethod);
        }
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
        this.enableLinkTracking(!this.options.disableLinkTracking);
        if (this.options.configurations) {
            Object.entries(this.options.configurations).forEach(([key, value]) => {
                this.addCustomInstruction(key, value);
            });
        }
        this.addTrackerToDOM();
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
        if (data.length) {
            if (customDimensions &&
                Array.isArray(customDimensions) &&
                customDimensions.length) {
                customDimensions.map((customDimension) => this.addCustomInstruction("setCustomDimension", customDimension.id, customDimension.value));
            }
            this.addCustomInstruction("setCustomUrl", href !== null && href !== void 0 ? href : this.getPageUrl());
            this.addCustomInstruction("setDocumentTitle", documentTitle);
            this.addCustomInstruction(...data);
        }
    }
    addTrackerToDOM() {
        var _a;
        const doc = document;
        const scriptElement = doc.createElement("script");
        const scripts = doc.getElementsByTagName("script")[0];
        scriptElement.type = "text/javascript";
        scriptElement.async = true;
        scriptElement.defer = true;
        if (this.options.srcUrl) {
            scriptElement.src = this.options.srcUrl;
        }
        else {
            const jsFileName = this.options.matomoJsFileName || "matomo.js";
            scriptElement.src = `${this.options.trackerBaseUrl}/${jsFileName}`;
        }
        (_a = scripts === null || scripts === void 0 ? void 0 : scripts.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(scriptElement, scripts);
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