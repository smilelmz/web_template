import config from './base'
import LocalConfig from './config.local'
import DevConfig from './config.dev'
import QaConfig from './config.qa'
import PreConfig from './config.pre'
import ProdConfig from './config.prod'
import { Config } from './index.types'

const ENV = process.env.BUILD_ENV
let envConfig = {}

switch (ENV) {
  case 'local':
    envConfig = LocalConfig
    break
  case 'dev':
    envConfig = DevConfig
    break
  case 'qa':
    envConfig = QaConfig
    break
  case 'pre':
    envConfig = PreConfig
    break
  case 'prod':
    envConfig = ProdConfig
    break
  default:
    envConfig = {}
}

const configModule: Config = {
  ...config,
  ...envConfig,
}

export default configModule
