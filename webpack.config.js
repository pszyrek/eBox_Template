var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
})

module.exports = {
    entry: './app/main.js',
    output: {
        path: path.resolve('./app/dist'),
        filename: 'bundle.js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015'],
                            compact: false
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        extractPlugin,
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: './app/index.html',
            inject: 'body'
        })
    ]
};


