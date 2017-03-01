const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const pathMap = require('./pathmap.json');

process.noDeprecation = true;

module.exports = {

    entry: {
        app: ['./example/main.js'],
        vendors: ['vue', 'vue-router']
    },

    output: {
        path: path.resolve(__dirname),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        libraryTarget: 'umd'
    },

    resolve: {
        alias: pathMap,
        extensions: ['.js', '.json', '.css', '.scss', '.html']
    },


    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!postcss-loader!sass-loader',
                    },

                    preLoaders: {
                        js: 'eslint-loader?fix'
                    }

                }
            },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },

            {
                test: /\.(js|vue)$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix : true
                },
                include: [
                    path.resolve(__dirname, '../src')
                ]
            },

            {
                test: /\.scss/,

                loader: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },

            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]?[hash]'
                }
            }

        ]
    },

    plugins: [

        new CommonsChunkPlugin({
            name: 'vendors',
            chunks: ['app','vendors']
        })
    ],

    devServer: {

        historyApiFallback: true,

        noInfo: true,

        host: "127.0.0.1",

        port: 3000,

        clientLogLevel: 'none',

        quiet: true,

        lazy: false
    },

    performance: {
        hints: false
    },

    devtool: '#source-map'
};
