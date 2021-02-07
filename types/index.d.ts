declare const Browser: (ua?: string) => {
    browser: string;
    version: string;
    engine: string;
    os: string;
    osVersion: string;
    device: string;
    language: string;
};
export default Browser;
