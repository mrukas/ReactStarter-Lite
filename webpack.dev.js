const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = env => {
    const commonConfig = require('./webpack.common')(env);

    return merge.strategy({
        entry: 'prepend'
    })(commonConfig, {
        entry: {
            app: ['react-hot-loader/patch'],
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            hot: true,
            historyApiFallback: true
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('development')
                },
                'GIT_VERSION': JSON.stringify(''),
                'GIT_COMMITHASH': JSON.stringify(''),
                'GIT_BRANCH': JSON.stringify(''),
            })
        ]
    });
}