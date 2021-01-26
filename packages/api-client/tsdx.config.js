module.exports = {
    rollup(config) {
        // This configuration allows 'immutability-helper' to be included in the UMD bundle.
        // Related issue: https://github.com/formium/tsdx/issues/179
        if (config.output.format === 'umd') {
            delete config.external;
            config.output = {
                name: 'opendatasoft.apiClient',
                file: __dirname + '/umd/opendatasoft.apiclient.umd.js',
                name: 'opendatasoft.apiClient',
                format: 'umd'
            }
        }
        return config;
    }
};
