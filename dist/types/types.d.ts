export interface Platform {
    name: string;
    platform: string;
    arch: string;
    version: string;
    isWindows: boolean;
    isMacOS: boolean;
    isLinux: boolean;
}
export declare class Properties {
    rust_toolchain: string;
    profile: string;
    components: string;
    /**
     * Creates an instance of Properties.
     *
     * @constructor
     * @param {string} rust_toolchain
     * @param {string} profile
     * @param {components} components
     */
    constructor(rust_toolchain: string, profile: string, components: string);
    /**
     * Verify if the properties are correct, throws an error when they aren't correct
     *
     * @returns {(void | never)}
     */
    verify(): void | never;
}
