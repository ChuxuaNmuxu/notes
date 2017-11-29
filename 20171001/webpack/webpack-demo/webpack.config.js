const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/index.js')
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },

    devtool: 'inline-source-map', // source map

    /**
     * 以下都是需要下载的
     */
    devServer: { // dev-server服务器
        contentBase: './dist',
        hot: true // 热加载
    },

    plugins: [
        new HtmlWebpackPlugin({ // 生成html，并自动引入js文件
            title: 'output management'
        }),
        new CleanWebpackPlugin(['dist']), // 每次打包清理dist文件夹
        new webpack.HotModuleReplacementPlugin() // 热加载
        // new UglifyJSPlugin() // tree shaking 不加载没有使用的模块
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
        ]
    }
}
