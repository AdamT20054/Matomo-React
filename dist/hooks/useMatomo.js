"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatomoProvider = exports.useMatomo = void 0;
const react_1 = __importStar(require("react"));
const lib_1 = require("../lib");
const MatomoContext = (0, react_1.createContext)({});
const useMatomo = () => (0, react_1.useContext)(MatomoContext);
exports.useMatomo = useMatomo;
const MatomoProvider = ({ config, children, }) => {
    const tracker = (0, react_1.useMemo)(() => new lib_1.MatomoTracker(config), [config]);
    return (react_1.default.createElement(MatomoContext.Provider, { value: { tracker } }, children));
};
exports.MatomoProvider = MatomoProvider;
//# sourceMappingURL=useMatomo.js.map