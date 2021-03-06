const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = 'production';

const buildConfig = require('./build.config.js')(mode);
const commonConfig = require('./webpack.common')(mode);

const gitRevisionPlugin = new GitRevisionPlugin({
    commithashCommand: 'rev-parse --short HEAD'
});

const prodConfig = merge.strategy({
    'plugins': 'prepend'
})(commonConfig, {
    mode,
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.(s?css|less)$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'GIT_VERSION': JSON.stringify(buildConfig.useGitVersions ? gitRevisionPlugin.version() : ''),
            'GIT_COMMITHASH': JSON.stringify(buildConfig.useGitVersions ? gitRevisionPlugin.commithash() : ''),
            'GIT_BRANCH': JSON.stringify(buildConfig.useGitVersions ? gitRevisionPlugin.branch() : ''),
        })
    ]
});

module.exports = prodConfig;