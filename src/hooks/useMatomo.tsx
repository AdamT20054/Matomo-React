import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { MatomoTracker } from "../lib";
import {
  MatomoProviderConfig,
  TrackEventParams,
  TrackPageViewParams,
  TrackSiteSearchParams,
} from "../types";

/**
 * Props for the Matomo context
 * @internal
 */
type MatomoContextProps = {
  tracker: MatomoTracker;
};

/**
 * Default value for the Matomo context
 * This provides a better alternative to type casting with {} as MatomoContextProps
 * @internal
 */
const defaultContextValue: MatomoContextProps = {
  // This will be replaced by the actual tracker in the provider
  tracker: null as unknown as MatomoTracker,
};

/**
 * React context for the Matomo tracker
 * @internal
 */
const MatomoContext = createContext<MatomoContextProps>(defaultContextValue);

/**
 * React hook to access the Matomo tracker instance
 * @returns The Matomo tracker instance
 * @public
 */
export const useMatomo = () => useContext(MatomoContext);

/**
 * Custom hook for tracking events with optimized rendering
 * Uses useCallback to prevent unnecessary re-renders
 * @returns Memoized tracking functions
 * @public
 * @noinspection JSUnusedGlobalSymbols
 */
export let useMatomoEvent: () => {
  trackPageView: (params?: TrackPageViewParams) => void;
  trackEvent: (params: TrackEventParams) => void;
  trackSiteSearch: (params: TrackSiteSearchParams) => void;
  addCustomInstruction: (name: string, ...args: any[]) => MatomoTracker;
};
useMatomoEvent = () => {
  const { tracker } = useMatomo();

  const trackPageView = useCallback(
    (params?: TrackPageViewParams) => tracker.trackPageView(params),
    [tracker],
  );

  const trackEvent = useCallback(
    (params: TrackEventParams) => tracker.trackEvent(params),
    [tracker],
  );

  const trackSiteSearch = useCallback(
    (params: TrackSiteSearchParams) => tracker.trackSiteSearch(params),
    [tracker],
  );

  const addCustomInstruction = useCallback(
    (name: string, ...args: any[]) =>
      tracker.addCustomInstruction(name, ...args),
    [tracker],
  );

  return {
    trackPageView,
    trackEvent,
    trackSiteSearch,
    addCustomInstruction,
  };
};

/**
 * Provider component that initializes the Matomo tracker
 * @param props - Component props
 * @param props.config - Configuration options for the Matomo tracker
 * @param props.children - Child components
 * @public
 * @noinspection JSUnusedGlobalSymbols
 */
export const MatomoProvider = ({
  config,
  children,
}: {
  children: ReactNode;
  config: MatomoProviderConfig;
}) => {
  const tracker = useMemo(() => new MatomoTracker(config), [config]);
  return (
    <MatomoContext.Provider value={{ tracker }}>
      {children}
    </MatomoContext.Provider>
  );
};
