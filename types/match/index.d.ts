export declare const HashKey: {
    engine: string[];
    browser: string[];
    os: string[];
    device: string[];
};
export declare const buildMatch: (ua: string, win: Window, nav: Navigator) => Record<string, boolean>;
