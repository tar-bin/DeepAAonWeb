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
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
    // devtool: 'source-map'
};