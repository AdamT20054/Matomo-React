import React, { ReactNode, createContext, useContext, useMemo } from "react";
import { MatomoTracker } from "../lib/MatomoTracker";
import { MatomoProviderConfig } from "../types";

type MatomoContextProps = {
  tracker: MatomoTracker;
};

const MatomoContext = createContext<MatomoContextProps>(
  {} as MatomoContextProps
);

export const useMatomo = () => useContext(MatomoContext);

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
