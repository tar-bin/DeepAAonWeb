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
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebPackPlugin({
            title: 'DeepAA on Web',
            template: 'index.html'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
        module: {
        loaders: [
            // {
            //     loader: 'babel',
            //     exclude: /node_modules/,
            //     test: /\.js[x]?$/,
            //     query: {
            //         cacheDirectory: true,
            //         presets: ['react', 'es2015']
            //     }
            // },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml' },
            { test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff' }
        ]
    }
    // devtool: 'source-map'
};