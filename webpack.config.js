const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const indexHtml = path.join(__dirname, 'app', 'index.html')

module.exports = {
    entry: [
        path.join(__dirname, 'app/scripts/', 'app.js'),
        indexHtml
    ],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader'
                    }]
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        query: {
                            name: 'images/[hash].[ext]'
                        }
                    },
                    'image-webpack-loader'
                ]
            }, {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        query: {
                            name: 'images/svg/[hash].[ext]'
                        }
                    },
                    'image-webpack-loader'
                ]
            },
            {
              test: /favicon\.ico$/,
              loader: 'url',
              query: {
                limit: 1,
                name: '[name].[ext]',
              },
            },
            {
                test: indexHtml,
                use: [
                    'html-loader',
                    'markup-inline-loader'
                ]
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'file-loader',
                        query: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon: 'app/images/favicon.ico',
            template: 'app/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './build')
    }
};
