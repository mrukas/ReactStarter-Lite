const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const GitRevisionPlugin = require('git-revision-webpack-plugin')

const mode = 'production';

const commonConfig = require('./webpack.common')(mode);
const gitRevisionPlugin = new GitRevisionPlugin({
    commithashCommand: 'rev-parse --short HEAD'
});

module.exports = merge(commonConfig, {
    mode,
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'GIT_VERSION': JSON.stringify(gitRevisionPlugin.version()),
            'GIT_COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
            'GIT_BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
        })
    ]
});