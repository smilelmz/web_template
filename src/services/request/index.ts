/* eslint-disable promise/no-return-wrap */
import axios from 'axios'
import { pp_utils } from '@/utils'
import { reqInterceptor, reqErrorInterceptor, respInterceptor, respErrorInterceptor } from './interceptors'
import { clearPending } from './pending'
import { IAxiosRequestConfig } from '@/types/inteface'

axios.defaults.timeout = 60_000

export interface IResponse<T> {
  code: number
  message: string
  exception?: string
  data?: T
  [key: string]: any
}

type IAxiosFunc = <T>(url: string, data?: Record<string, any>, options?: IAxiosRequestConfig) => Promise<IResponse<T>>
type IAxiosFuncUpload = <T>(url: string, formData: FormData, options?: IAxiosRequestConfig) => Promise<IResponse<T>>
export interface IRequest {
  clearPending: VoidFunction
  request: <T>(config: IAxiosRequestConfig) => Promise<IResponse<T>>
  get: IAxiosFunc
  post: IAxiosFunc
  delete: IAxiosFunc
  put: IAxiosFunc
  download: IAxiosFunc
  upload: IAxiosFuncUpload
}

const instance = axios.create()
instance.interceptors.request.use(reqInterceptor, reqErrorInterceptor)
instance.interceptors.response.use(respInterceptor, respErrorInterceptor)

const request = <T>(config: IAxiosRequestConfig): Promise<IResponse<T>> =>
  new Promise((resolve, reject) => {
    instance
      .request<IResponse<T>>(config)
      .then(res => {
        if (config.hump && res.data && res.data.data) {
          res.data.data = pp_utils.toHump(res.data.data)
        }
        return resolve(res.data)
      })
      .catch(error => {
        console.info(error)
        reject(error)
      })
  })

const services: IRequest = {
  clearPending,
  request,
  get: <T>(url: string, data: Record<string, any> = {}, options: IAxiosRequestConfig = {}) => {
    const params = pp_utils.queryParams(data)
    const query = params ? `${url.includes('?') ? '&' : '?'}${params}` : ''
    return request<T>({ url: url + query, method: 'GET', ...options })
  },
  post: <T>(url: string, data: Record<string, any> = {}, options: IAxiosRequestConfig = {}) =>
    request<T>({
      url,
      method: 'POST',
      data,
      ...options,
    }),
  delete: <T>(url: string, data: Record<string, any> = {}, options: IAxiosRequestConfig = {}) =>
    request<T>({
      url,
      method: 'POST',
      data,
      ...options,
    }),
  put: <T>(url: string, data: Record<string, any> = {}, options: IAxiosRequestConfig = {}) =>
    request<T>({
      url,
      method: 'POST',
      data,
      ...options,
    }),
  download: (url: string, params: Record<string, any> = {}, options: IAxiosRequestConfig = {}) => {
    options.headers = {
      ...(options.headers || {}),
    }
    return instance
      .request({
        method: 'POST',
        url: url,
        data: params,
        responseType: 'blob',
        ...options,
      })
      .then(res => {
        let disposition = res.headers['content-disposition']
        let fileName = `${params.filename ? `${params.filename}_` : ''}${Date.now()}.xlsx`
        if (disposition) {
          const dispositionArr = decodeURIComponent(escape(disposition)).split('=')
          if (dispositionArr.length === 2) {
            fileName = dispositionArr[1]
          }
        }
        const blob = new Blob([res.data])
        if ('download' in document.createElement('a')) {
          const link = document.createElement('a')
          link.download = fileName
          link.style.display = 'none'
          link.href = window.URL.createObjectURL(blob)
          document.body.append(link)
          link.click()
          URL.revokeObjectURL(link.href)
          link.remove()
        } else {
          navigator['msSaveBlob'](blob, fileName)
        }
        return Promise.resolve({ code: 200, message: '下载成功' })
      })
      .catch(error => {
        console.error('response:', error)
        return Promise.resolve({ code: 500, message: `下载失败${error.message ? `, ${error.message}` : ''}` })
      })
  },
  upload: (url: string, data: FormData, options: IAxiosRequestConfig = {}) => {
    options.headers = {
      ...(options.headers || {}),
      'Content-Type': 'multipart/form-data',
    }
    return request({
      method: 'POST',
      url: url,
      data,
      ...options,
    })
  },
}

export default services
