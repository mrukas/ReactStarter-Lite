const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const vendors = require('./src/vendors');

module.exports = env => {
    const buildConfig = require('./build.config.js')(env);
    const isProduction = env === 'production';

    return {
        entry: {
            app: './src/index.jsx',
            vendors: vendors,
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,

                cacheGroups: {
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    },
                    vendors: {
                        name: 'vendors',
                        test: 'vendors',
                        chunks: 'all',
                        enforce: true,
                        priority: -10
                    }
                }
            }
        },
        plugins: [
            new CleanWebpackPlugin([buildConfig.buildDirectory]),
            new HtmlWebpackPlugin({
                title: 'React Starter Lite',
                template: 'src/index.ejs',
                chunksSortMode: 'manual',
                chunks: ['runtime', 'styles', 'vendors', 'app'],
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