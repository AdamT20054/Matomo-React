import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { MatomoTracker } from '../lib';
const defaultContextValue = {
    tracker: null,
};
const MatomoContext = createContext(defaultContextValue);
export const useMatomo = () => useContext(MatomoContext);
export let useMatomoEvent;
useMatomoEvent = () => {
    const { tracker } = useMatomo();
    const trackPageView = useCallback((params) => tracker.trackPageView(params), [tracker]);
    const trackEvent = useCallback((params) => tracker.trackEvent(params), [tracker]);
    const trackSiteSearch = useCallback((params) => tracker.trackSiteSearch(params), [tracker]);
    const addCustomInstruction = useCallback((name, ...args) => tracker.addCustomInstruction(name, ...args), [tracker]);
    return {
        trackPageView,
        trackEvent,
        trackSiteSearch,
        addCustomInstruction,
    };
};
export const MatomoProvider = ({ config, children, }) => {
    const tracker = useMemo(() => new MatomoTracker(config), [config]);
    return React.createElement(MatomoContext.Provider, { value: { tracker } }, children);
};
//# sourceMappingURL=useMatomo.js.map