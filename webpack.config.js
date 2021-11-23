const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
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
        static: {
            directory: path.resolve(__dirname, 'docs')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: "defaults"}]
                        ]
                    }
                }
            },
            {
                test: /\.json$/,
                use: 'json-loader',
                type: "javascript/auto"
            }
        ]
    },
    resolve: {
        alias: {
            'keras-js$': 'keras-js/dist/keras.min.js',
            'vue$': 'vue/dist/vue.min.js'
        }
    }
    // devtool: 'source-map'
};