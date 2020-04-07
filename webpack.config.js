const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => ({
  entry: {
    app: [
      './lib/js/app.js'
    ]
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  devtool: argv.mode !== 'production' && 'inline-source-map',
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
        }
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~': path.resolve(__dirname, 'lib/js')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      ITEMS_PER_PAGE: 12
    }),
    // new BundleAnalyzerPlugin()
  ]
})
