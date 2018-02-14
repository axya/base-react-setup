const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const port = 8081;

module.exports = {
    entry: __dirname + "/app/index.jsx",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        }, {
            test: /\.(scss|css)$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[local]-[hash:base64:3]'
                    }
                },
                'postcss-loader',
                'resolve-url-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        outputStyle: 'expanded'
                    }
                }
            ]
        }, {
            test: /\.(path|svg)$/,
            use: 'raw-loader'
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        host: '0.0.0.0',
        inline: true,
        port,
        hot: true
    }
};
