const path = require('path')
const webpack = require('webpack')
const cssnano = require('cssnano')
const styleLoader = require('./style-loader')
const assetsPath = require('./assetsPath')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
  entry: {
    app: './src/entry/index.js',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-thunk',
      'md5',
      'nprogress',
      'antd/lib/button',
      'antd/lib/checkbox',
      'antd/lib/col',
      'antd/lib/date-picker',
      'antd/lib/form',
      'antd/lib/icon',
      'antd/lib/input',
      'antd/lib/message',
      'antd/lib/modal',
      'antd/lib/notification',
      'antd/lib/radio',
      'antd/lib/row',
      'antd/lib/select',
      'antd/lib/slider',
      'antd/lib/spin',
      'antd/lib/table',
      'antd/lib/tree',
      'antd/lib/tree-select'
    ]
  },
  output: {
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      // 自定义路径别名
      ASSET      : resolve('src/assets'),
      COMPONENT  : resolve('src/components'),
      CONSTANT   : resolve('src/constants'),
      CORE       : resolve('src/core'),
      GLOBAL     : resolve('src/globals'),
      IMAGE      : resolve('src/assets/images'),
      LAYOUT     : resolve('src/layouts'),
      MIDDLEWARE : resolve('src/middleware'),
      REDUCER    : resolve('src/reducers'),
      ROUTE      : resolve('src/routes'),
      STORE      : resolve('src/store'),
      STYLE      : resolve('src/assets/styles'),
      UTIL       : resolve('src/utils'),
      VIEW       : resolve('src/views')
    }
  },
  module: {
    rules: [/*{
      test: /\.(js|jsx)$/,
      loader: 'eslint-loader',
      enforce: "pre",
      include: [resolve('src'), resolve('test')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },*/ {
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')]
    }, {
      test: /\.css$/,
      use: styleLoader()
    }, {
      test: /\.less$/,
      use: styleLoader('less-loader')
    }, {
      test: /\.(scss|sass)$/,
      use: styleLoader('sass-loader')
    }, {
      test: /\.(stylus|styl)$/,
      use: styleLoader('stylus-loader')
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 8192,
        name: assetsPath('images/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 8192,
        name: assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          cssnano({
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['last 2 versions']
            },
            discardComments: {
              removeAll: true
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: true
          })
        ]
      }
    })
  ]
}
