const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const vendor = require('./src/vendor');

module.exports = env => {
    console.log(`Env: ${env}`);
    const isProduction = env === 'production';

    console.log(`IsProduction: ${isProduction}`);

    const extractSass = new ExtractTextPlugin({
        filename: '[name].[contenthash].css',
        disable: !isProduction
    });

    const extractCss = new ExtractTextPlugin({
        filename: '[name].[contenthash].css',
        disable: !isProduction
    });

    return {
        devtool: isProduction ? false : 'cheap-module-eval-source-map',
        entry: {
            app: './src/index.js',
            vendor: vendor,
        },
        plugins: [
            extractSass,
            extractCss,
            new HtmlWebpackPlugin({
                title: 'Output Management',
                template: 'src/index.ejs',
                chunksSortMode: 'manual',
                chunks: ['runtime', 'vendor', 'app']
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime',
                minChunks: Infinity
            })
        ],
        output: {
            filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [{
                    test: /\.scss$/,
                    use: extractSass.extract({
                        use: [{
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProduction
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !isProduction
                            }
                        }],
                        fallback: {
                            loader: 'style-loader',
                            options: {
                                sourceMap: !isProduction
                            }
                        }
                    })
                },
                {
                    test: /\.css$/,
                    use: extractCss.extract({
                        use: {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProduction
                            }
                        },
                        fallback: {
                            loader: 'style-loader',
                            options: {
                                sourceMap: !isProduction
                            }
                        }
                    })
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