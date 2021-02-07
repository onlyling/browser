export declare const isArray: (v: unknown) => boolean;
export declare type BuildMatchAndKeysConfig = [string, string[]?];
declare type MatchMap = Record<string, (u: string) => boolean>;
export declare const buildMatchAndKeys: (configs: BuildMatchAndKeysConfig[]) => [MatchMap, string[]];
export declare const getChromeVision: (u: string) => string;
export declare const getGlobalWindow: () => Window;
export {};
