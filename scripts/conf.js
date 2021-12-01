const APP_TITLE = 'Web后台管理平台'
const APP_KEYWORD = 'Web后台管理平台'
const APP_DESCRIPTION = 'Web后台管理平台'

// develop server host and port
const SERVER_HOST = '0.0.0.0'
const SERVER_PORT = '8000'

// analyzer server host and port
const ANALYZER_HOST = '127.0.0.1'
const ANALYZER_PORT = '8889'

// Resource size limit
const IMAGE_LIMIT_SIZE = 4 * 1024

// show analyzer page
const ANALYZER_STATUS = process.env.NODE_ANA === 'analyze'

module.exports = {
  APP_TITLE,
  APP_KEYWORD,
  APP_DESCRIPTION,
  SERVER_HOST,
  SERVER_PORT,
  ANALYZER_HOST,
  ANALYZER_PORT,
  IMAGE_LIMIT_SIZE,
  ANALYZER_STATUS,
}
