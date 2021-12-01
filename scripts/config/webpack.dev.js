const Webpack = require('webpack')
const apiMocker = require('mocker-api')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { SERVER_HOST, SERVER_PORT } = require('../conf')
const { appDist, appMock } = require('../paths')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  output: {
    filename: 'js/[name].js',
    publicPath: '/',
    path: appDist,
  },
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    client: {
      logging: 'none',
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    compress: true,
    open: false,
    hot: true,
    historyApiFallback: true,
    onBeforeSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }
      apiMocker(devServer.app, appMock)
    },
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
})
