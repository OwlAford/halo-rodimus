var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

//暴露全局方法
var dep = {
    Vue: 'Vue',
    Router: 'vue-router',
    $: "webpack-zepto"
}

//全局第三方依赖库
var libs = [
        'Vue', 
        'vue-router', 
        'webpack-zepto', 
        './src/plugins'
    ]

var plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.ProvidePlugin(dep)
]

module.exports = {
    entry: {
        main: './src/vux/main.js',
        vendors: libs
    },
    output: {
        path: './dist',
        publicPath: 'dist/',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },{
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=8192'
            },{
                test: /\.js$/,
                exclude: /node_modules|vue\/dist/,
                loader: 'babel'
            },{
                test: require.resolve('webpack-zepto'), 
                loader: 'expose?Zepto'
            },{ 
                test: /\.css$/, 
                loader: 'style-loader!css-loader' 
            },{
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=8192",
                query: {
                    name: '[name].[ext]?[hash]&mimetype=application/font-woff'
                }
            },{
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=8192",
                query: {
                    name: '[name].[ext]?[hash]&mimetype=application/font-woff2'
                }
            },{
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=8192",
                query: {
                    name: '[name].[ext]?mimetype=application/font-woff2'
                }
            },{
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=8192",
                query: {
                    name: '[name].[ext]?mimetype=application/font-woff2'
                }
            },{
                test: /\.json$/,
                loader: 'json'
            }
                  
        ]
    },

    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    plugins: plugins
}