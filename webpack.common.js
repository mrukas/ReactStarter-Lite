const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const vendor = require('./src/vendor');

module.exports = env => {
    const buildConfig = require('./build.config.js')(env);
    const isProduction = env === 'production';

    return {
        entry: {
            app: './src/index.jsx',
            vendor: vendor,
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: "vendor",
                        test: "vendor",
                        enforce: true
                    },
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            },
            //     minimizer: [
            //         new UglifyJsPlugin({
            //             cache: true,
            //             parallel: true,
            //           }),
            //         new OptimizeCSSAssetsPlugin({})
            //       ]
        },
        plugins: [
            // new MiniCssExtractPlugin({
            //     filename: "[name].[contenthash].css",
            // }),
            new HtmlWebpackPlugin({
                title: 'Output Management',
                template: 'src/index.ejs',
                chunksSortMode: 'manual',
                chunks: ['vendor', 'app'],
                publicPath: buildConfig.publicPath,
                baseHref: buildConfig.baseHref
            })
            //new BundleAnalyzerPlugin()
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
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: !isProduction
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
                    }]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: !isProduction
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