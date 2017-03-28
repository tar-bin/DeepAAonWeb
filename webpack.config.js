const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './js/app.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'docs'),
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebPackPlugin({
            title: 'DeepAA on Web',
            template: 'index.html'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'docs')
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'keras-js$': 'keras-js/dist/keras.js',
            'vue$': 'vue/dist/vue.min.js'
        }
    }
    // devtool: 'source-map'
};