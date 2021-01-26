module.exports = {
    rollup(config, options) {
        // This configuration allows 'immutability-helper' to be included in the UMD bundle.
        // Related issue: https://github.com/formium/tsdx/issues/179
        if (config.output.format === 'umd') {
          delete config.external;
        }
        return config;
    }
};
