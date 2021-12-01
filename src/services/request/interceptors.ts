/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable unicorn/consistent-destructuring */
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { message } from 'antd'
import config from '@/config'
import { Storage, pp_utils } from '@/utils'
import { addPending, removePending } from './pending'

const { publicPreRoute, publicName, loginUrl, serverUrl, isMock = false, environment } = config
const codeMessage: Record<string, string> = {
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
}

const getCodeMessage = (status: number) => codeMessage[`${status}`] || `连接出错(${status})`

const gotoLogin = () => {
  const { pathname } = window.location
  const urlForm = `?form=${pathname}`
  window.location.href = `${publicPreRoute}${publicName}${loginUrl}${urlForm}`
}

const getToken = (url: string) => {
  const token = Storage.getCookie('Authorization')
  const DontCheckoutToken = pp_utils.getUrlParam('checkoutToken', url) === 'false'
  if (DontCheckoutToken) {
    return ''
  }
  if (token === undefined || token === null || token === '') {
    // gotoLogin()
    return false
  }
  return `${token}`
}

const reqInterceptor = (axiosConfig: AxiosRequestConfig) => {
  const { url, headers = {} } = axiosConfig
  const matchRegExp = /http|https/
  const SERVER_URL = environment === 'local' && isMock ? window.location.origin : serverUrl
  const newUrl = `${matchRegExp.test(url!) ? '' : SERVER_URL}${url}${url!.includes('?') ? '&t=' : '?t='}${Date.now()}`
  const token = getToken(newUrl!)
  if (token) {
    axiosConfig.headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    }
  }
  axiosConfig.url = newUrl
  // 请求检查是否重复请求
  removePending(axiosConfig)
  addPending(axiosConfig)
  return axiosConfig
}

const reqErrorInterceptor = (error: AxiosError) => Promise.reject(error)

const respInterceptor = (response: AxiosResponse) => {
  removePending(response.config) // 在请求结束后，移除本次请求
  const { status, data } = response
  let msg = ''
  if (status < 200 || status >= 300) {
    msg = getCodeMessage(status)
    if (typeof data === 'string' || !data) {
      response.data = { message: msg, code: status }
    } else {
      response.data.message = response.data.message || msg
    }
  }
  if (response.config.responseType === 'blob') {
    return response
  }
  if (response.data.code === 401) {
    message.error(response.data.message || response.data.message, 3, () => {
      gotoLogin()
    })
  } else if (response.data.code !== 0 && response.data.code !== 200) {
    message.error(response.data.exception || response.data.message, 3)
    // throw new Error(response.data.exception || response.data.message)
  }
  return response
}

const respErrorInterceptor = (error: any) => {
  if (error.__CANCEL__) {
    return Promise.reject({ message: '请求取消', code: 500 })
  }
  if (!error.response) {
    message.error('服务器开小差，请稍后重试。', 3)
    return Promise.reject({ message: '服务器开小差，请稍后重试。', code: 500 })
  }
  const { response } = error
  const { status } = response
  if (status === 401) {
    message.error('登录超时，重新登录跳转中...', 3)
  } else {
    message.error(`服务器开小差，请稍后重试。错误状态码：${status}`, 3)
  }
  return Promise.reject(response)
}

export { reqInterceptor, reqErrorInterceptor, respInterceptor, respErrorInterceptor }
