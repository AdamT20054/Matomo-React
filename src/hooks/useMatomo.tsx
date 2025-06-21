import React, { ReactNode, createContext, useContext, useMemo } from "react";
import { MatomoTracker } from "../lib";
import { MatomoProviderConfig } from "../types";

type MatomoContextProps = {
  tracker: MatomoTracker;
};

const MatomoContext = createContext<MatomoContextProps>(
  {} as MatomoContextProps
);

/**
 * React hook to access the Matomo tracker instance
 * @public
 */
export const useMatomo = () => useContext(MatomoContext);

/**
 * Provider component that initializes the Matomo tracker
 * @public
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
