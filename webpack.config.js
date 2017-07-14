const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ETP = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    context: path.join(__dirname, 'app'),
    entry: {
        app: './main'
    },
    output: {
        path: path.join(__dirname, 'app', 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: path.join(__dirname, 'app')
            },
            {
                test: /\.(css|scss|sass)$/,
                loader: ETP.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!postcss-loader!sass-loader'
                }),
                include: path.join(__dirname, 'app')
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader',
                include: path.join(__dirname, 'app')
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'app', 'dist'),
        inline: true,
        stats: {
            colors: true,
            reasons: true,
            chunks: false
        }
    },
    resolve: {
        alias: {
            'images': path.resolve(__dirname, 'app', 'assets')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app', 'index.html'),
            inject: 'body',
            hash: true,
            chunks: ['app'],
            filename: 'index.html'
        }),

        new webpack.HotModuleReplacementPlugin(),

        new ETP('main.css')
    ]
};