const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  resolveApp,
  appDirectory,
  appSrc: resolveApp('src'),
  appDist: resolveApp('dist'),
  appIndex: resolveApp('src/index'),
  appHtml: resolveApp('public/index.html'),
  appPublic: resolveApp('public'),
  appTsConfig: resolveApp('tsconfig.json'),
  appNodeModules: resolveApp('node_modules'),
  appLessVar: resolveApp('src/themes/vars.less'),
  appMock: resolveApp('.mocks'),
  aliasPath: {
    '@': resolveApp('src'),
    '@config': resolveApp('src/config'),
    '@utils': resolveApp('src/utils'),
    '@components': resolveApp('src/components'),
    '@services': resolveApp('src/services'),
    '@assets': resolveApp('src/assets'),
    '@pages': resolveApp('src/pages'),
    '@themes': resolveApp('src/themes'),
    '@types': resolveApp('src/types'),
    '@hooks': resolveApp('src/hooks'),
  },
}
