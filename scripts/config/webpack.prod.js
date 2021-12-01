const webpack = require('webpack')
// const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { ANALYZER_STATUS, ANALYZER_HOST, ANALYZER_PORT } = require('../conf')
const { appDist } = require('../paths')

module.exports = merge(common, {
  output: {
    filename: 'js/[name].[contenthash].js',
    path: appDist,
    publicPath: '/',
    assetModuleFilename: 'images/[name].[contenthash].[ext]',
  },
  mode: 'production',
  devtool: false,
  target: 'browserslist',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].chunk.css',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    // CSS Tree Shaking
    // new PurgeCSSPlugin({
    //   paths: glob.sync(`${appSrc}/**/*`, { nodir: true }),
    // }),
    ANALYZER_STATUS &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: ANALYZER_HOST,
        analyzerPort: ANALYZER_PORT,
      }),
    new webpack.BannerPlugin(`Last update: ${new Date().toLocaleString()}`),
  ].filter(Boolean),
  optimization: {
    runtimeChunk: true,
    minimize: true,
    sideEffects: true, // tree shaking
    moduleIds: 'deterministic', // 减少不必要的hash变化
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        parallel: 4,
        terserOptions: {
          compress: { pure_funcs: ['console.log', 'console.info'] }, // 删除console
        },
      }),
      new CssMinimizerPlugin({ parallel: 4 }),
    ],
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      // 重复打包问题
      cacheGroups: {
        default: {
          name: 'common',
          minSize: 0,
          minChunks: 2,
          priority: -20,
        },
        vendors: {
          // node_modules里的代码
          test: /[/\\]node_modules[/\\]/,
          name: 'vendors',
          priority: -10,
          enforce: true,
        },
      },
    },
  },
})
