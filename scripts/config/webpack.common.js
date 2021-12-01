const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const WebpackBar = require('webpackbar')
const os = require('os')
const { isDevelopment, isProduction } = require('../env')
const { APP_TITLE, APP_KEYWORD, APP_DESCRIPTION, IMAGE_LIMIT_SIZE } = require('../conf')
const { appDist, appIndex, appHtml, appPublic, aliasPath, appLessVar } = require('../paths')
const { customTheme } = require('../theme')

const getCssLoaders = importLoaders =>
  [
    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: isDevelopment,
        importLoaders,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            require('postcss-flexbugs-fixes'),
            isProduction && [
              'postcss-preset-env',
              {
                autoprefixer: {
                  grid: true,
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
          ].filter(Boolean),
        },
      },
    },
    isProduction && {
      loader: 'thread-loader',
      options: {
        workers: os.cpus(),
        workerParallelJobs: 2,
      },
    },
  ].filter(Boolean)

const externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  axios: 'axios',
}

module.exports = {
  entry: {
    app: appIndex,
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: aliasPath,
    symlinks: false, // 禁用如 npm link 或者 yarn link等功能，减少解析工作量。
  },
  externals: isProduction ? externals : {},
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: [
          isProduction && {
            loader: 'thread-loader',
            options: {
              workers: os.cpus(),
            },
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ].filter(Boolean),
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1),
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDevelopment,
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: customTheme,
              },
            },
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: appLessVar,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif｜bmp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: IMAGE_LIMIT_SIZE,
          },
        },
      },
      {
        test: /.(svg|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ].filter(Boolean),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: APP_TITLE,
      keyword: APP_KEYWORD,
      description: APP_DESCRIPTION,
      template: appHtml,
      cache: true,
      minify: isProduction,
      isProduction,
    }),
    new Webpack.DefinePlugin({
      'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV),
    }),
    new CopyPlugin({
      patterns: [
        {
          context: appPublic,
          from: '*',
          to: appDist,
          toType: 'dir',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    // component hot update
    isDevelopment && new ReactRefreshWebpackPlugin(),
    // Display elegant progress bar while building or watch
    new WebpackBar({
      name: isDevelopment ? 'RUNNING' : 'BUNDLING',
      color: '#52c41a',
    }),
  ].filter(Boolean),
}
