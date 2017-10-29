const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = env => {
    const commonConfig = require('./webpack.common')(env);

    return merge(commonConfig, {
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new UglifyJSPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ]
    });
};