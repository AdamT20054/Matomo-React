import React, { ReactNode } from "react";
import { MatomoTracker } from "../lib";
import { MatomoProviderConfig } from "../types";
type MatomoContextProps = {
    tracker: MatomoTracker;
};
export declare const useMatomo: () => MatomoContextProps;
export declare const MatomoProvider: ({ config, children, }: {
    children: ReactNode;
    config: MatomoProviderConfig;
}) => React.JSX.Element;
export {};
//# sourceMappingURL=useMatomo.d.ts.map