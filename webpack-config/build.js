const path = require('path');
const fs = require('fs');
require('../helper/copy-to-npm');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

fs.writeFileSync(
    path.resolve(__dirname, '../src/version.js'),
    `export default '${require('../package.json').version}';`,
    'utf8'
);

module.exports = {
    mode: 'production',
    entry: ['@babel/polyfill', path.resolve('./', 'src/index.js')],
    output: {
        path: path.resolve('./', 'npm'),
        filename: 'tc-comment.min.js',
        library: 'TComment',
        libraryTarget: 'umd',
        globalObject: 'this',
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
            use: ['style-loader', 'css-loader'],
            // use: ['css-loader'],
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
            // use: ['css-loader', 'less-loader'],
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
        new VueLoaderPlugin(),
        // new MiniCssExtractPlugin(),
        // new HtmlWebpackPlugin({
        //     template: './helper/index.tpl.html',
        //     filename: 'index.html',
        // }),
        new OptimizeCssAssetsPlugin()
    ]
};