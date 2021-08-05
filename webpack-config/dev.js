const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: ['@babel/polyfill', path.resolve('./', 'dev/main.js')],
    output: {
        path: path.resolve('./', 'public'),
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.resolve('./', 'public'),
        historyApiFallback: true,
        inline: true,
        host: 'localhost', // '0.0.0.0' //
        proxy: {
            '/api': {
                target: 'https://www.shiyix.cn/',
                // pathRewrite: {'^/remote': ''},
                changeOrigin: true,
                secure: false
            }
        }
    },
    module: {
        rules: [{
            test: /(.js)$/,
            use: [{
                loader: 'babel-loader',
            }]
        }, {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
            options: {
                configFile: './.eslintrc.js'
            }
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        }, {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        }, {
            test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 50000,
            },
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    js: 'babel-loader',
                },
            },
        }, {
            test: /\.html$/,
            loader: 'html-loader',
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].min.css',
        }),
        new HtmlWebpackPlugin({
            template: './helper/index.tpl.html',
            filename: 'index.html',
        }),
        new OptimizeCssAssetsPlugin(),
        new VueLoaderPlugin(),
    ]
};