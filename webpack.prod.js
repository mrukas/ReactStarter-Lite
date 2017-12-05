const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const GitRevisionPlugin = require('git-revision-webpack-plugin')

module.exports = env => {
    const commonConfig = require('./webpack.common')(env);
    const gitRevisionPlugin = new GitRevisionPlugin({
        commithashCommand: 'rev-parse --short HEAD'
    });

    return merge(commonConfig, {
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new UglifyJSPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                },
                'GIT_VERSION': JSON.stringify(gitRevisionPlugin.version()),
                'GIT_COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
                'GIT_BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
            })
        ]
    });
};