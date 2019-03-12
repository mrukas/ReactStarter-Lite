const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const sass2less = require('less-plugin-sass2less')

const vendors = require('./src/vendors');

module.exports = env => {
    const buildConfig = require('./build.config.js')(env);
    const isProduction = env === 'production';

    return {
        entry: {
            app: ['@babel/polyfill', './src/index.jsx']
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all'
            }
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'React Starter Lite',
                template: 'src/index.ejs',
                baseHref: buildConfig.baseHref,
                chunks: ['app']
            })
            // ,new BundleAnalyzerPlugin()
        ],
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
            extensions: ['.js', '.jsx', '.json', '*']
        },
        output: {
            filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
            path: path.resolve(__dirname, buildConfig.buildDirectory),
            publicPath: buildConfig.publicPath
        },
        module: {
            rules: [{
                test: /\.jsx?$/,
                include: [path.join(__dirname, 'src')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.scss$/,
                issuer: /^((?!\.less).)*$/,
                use: [
                    isProduction ?
                        MiniCssExtractPlugin.loader :
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !isProduction
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !isProduction
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    isProduction ?
                        MiniCssExtractPlugin.loader :
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !isProduction
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: !isProduction,
                            plugins: [sass2less],
                            javascriptEnabled: true
                        }
                    }]
            },
            {
                test: /\.css$/,
                use: [
                    isProduction ?
                        MiniCssExtractPlugin.loader :
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !isProduction
                        }
                    }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
            ]
        }
    }
};