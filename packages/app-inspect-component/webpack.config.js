const path = require('path');
const webpackMerge = require('webpack-merge');
const baseComponentConfig = require('@splunk/webpack-configs/component.config').default;

module.exports = webpackMerge(baseComponentConfig, {
    entry: {
        AppInspectComponent: path.join(__dirname, 'src/AppInspectComponent.jsx'),
        themes: path.join(__dirname, 'src/themes.js'),
    },
    output: {
        path: path.join(__dirname),
    },
});
