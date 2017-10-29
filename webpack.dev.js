const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = env => {
    const commonConfig = require('./webpack.common')(env);

    return merge(commonConfig, {
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            hot: true
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}