// @ts-nocheck
const mockerApiDelay = require('mocker-api/lib/delay')
const demoProxy = require('./demo')
const tableProxy = require('./table')

const proxy = {
  ...demoProxy,
  ...tableProxy,
}

module.exports = mockerApiDelay(proxy, 2000)
