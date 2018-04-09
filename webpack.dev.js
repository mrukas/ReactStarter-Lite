const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WriteFilePlugin = require('write-file-webpack-plugin');

const mode = 'development';

const buildConfig = require('./build.config.js')(mode);
const commonConfig = require('./webpack.common')(mode);

const devConfig = merge.strategy({
    'plugins': 'prepend'
})(commonConfig, {
    mode,
    devServer: {
        contentBase: path.join(__dirname, buildConfig.buildDirectory),
        compress: true,
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: [{
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new WriteFilePlugin({
            test: /.html$/
        }),
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

module.exports = devConfig;