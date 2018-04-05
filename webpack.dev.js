const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const mode = 'development';

const commonConfig = require('./webpack.common')(mode);

module.exports = merge.strategy({
})(commonConfig, {
    mode,
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.EvalSourceMapDevToolPlugin({
            columns: false,
            exclude: /node_modules/
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'GIT_VERSION': JSON.stringify(''),
            'GIT_COMMITHASH': JSON.stringify(''),
            'GIT_BRANCH': JSON.stringify(''),
        })
    ]
});