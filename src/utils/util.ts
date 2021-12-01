import { message } from 'antd'
import { isObject } from 'lodash-es'
import Regex from './regex'

export const pp_utils = {
  delay(ms: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  },
  assertNull(val: any, msg = '', showMessage = true) {
    let flag = false
    if (!val || val === null || val === '' || val.replace(/(^\s+)|(\s+$)/g, '').length === 0) {
      flag = true
    }
    if (showMessage && flag) {
      message.error(msg, 2.5)
    }
    return flag
  },
  getUrlParam(name: string, url: string = window.location.href) {
    return (
      decodeURIComponent(
        (new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(url) || ['', ''])[1].replace(/\+/g, '%20'),
      ) || null
    )
  },
  getUrlParamsObj(url: string = window.location.href) {
    if (!url.includes('?')) {
      return {}
    }
    const paramsStr = url.split('?')[1]
    const paramsArr = paramsStr.split('&')
    let paramsObj: Record<string, any> = {}
    for (const param of paramsArr) {
      if (new RegExp('=').test(param)) {
        const KV = param.split('=')
        let key = KV[0]
        let val: string | number = KV[1]
        val = decodeURIComponent(val)
        val = /^\d+$/.test(val) ? Number.parseFloat(val) : val
        if (paramsObj.hasOwnProperty(key)) {
          if (Array.isArray(paramsObj[key])) {
            paramsObj[key] = [...paramsObj[key], val]
          } else {
            paramsObj[key] = [paramsObj[key], val]
          }
        } else {
          paramsObj[key] = val
        }
      }
    }
    return paramsObj
  },
  queryParams(data: RecordType, excludeNull = true) {
    const params: string[] = []
    const keysArr = Object.keys(data)
    for (const key of keysArr) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key]
        if (!(excludeNull && ['', undefined, null].includes(value))) {
          if (value.constructor === Array) {
            for (const item of value) {
              params.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
            }
          } else {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          }
        }
      }
    }
    return params.length > 0 ? params.join('&') : ''
  },
  leftTrim(str: string, content = '') {
    return str.replace(Regex.left_blank, content)
  },
  rightTrim(str: string, content = '') {
    return str.replace(Regex.right_blank, content)
  },
  trim(str: string, content = '') {
    return str.replace(Regex.left_right_blank, content)
  },
  copyText(text: string) {
    const input = document.createElement('input')
    input.value = text
    document.body.append(input)
    input.select()
    document.execCommand('Copy')
    input.remove()
  },
  randomString(len = 32) {
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const maxPos = $chars.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  },
  formatDate(time: string | number | Date, fmt = '{y}-{m}-{d} {h}:{i}:{s}') {
    if (time === undefined || !time) {
      return null
    }
    let date: Date
    if (typeof time === 'object') {
      date = time as Date
    } else {
      if (typeof time === 'string') {
        time = /^\d+$/.test(time) ? Number.parseInt(time, 10) : time.replace(new RegExp(/-/gm), '/')
      }
      if (typeof time === 'number' && time.toString().length === 10) {
        time = time * 1000
      }
      date = new Date(time)
    }
    const formatObj: { [key: string]: number } = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    }
    const timeStr = fmt.replace(/{([adhimsy])+}/g, (result, key) => {
      const value = formatObj[key]

      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        console.info(value)
        return `星期${['日', '一', '二', '三', '四', '五', '六'][value]}`
      }
      return value.toString().padStart(2, '0')
    })
    return timeStr
  },
  compressImg: (file: File, cb: (f: File) => void, opt: Record<string, any> = {}) => {
    let defOpt = {
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
    }
    opt = Object.assign(defOpt, opt)
    let reader = new FileReader()
    let img = new Image()
    const dataURLtoFile = (dataurl: string, filename: string) => {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)![1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }
    img.addEventListener('load', () => {
      let originWidth = img.width
      let originHeight = img.height
      let canvas = document.createElement('canvas')
      let drawer = canvas.getContext('2d')
      // 宽高设置
      if (originWidth < opt.maxWidth && originHeight < opt.maxHeight) {
        canvas.width = originWidth
        canvas.height = originHeight
      } else if (originWidth > opt.maxWidth && originHeight < opt.maxHeight) {
        canvas.width = opt.maxWidth
        canvas.height = (originHeight / originWidth) * opt.maxWidth
      } else if (originWidth < opt.maxWidth && originHeight > opt.maxHeight) {
        canvas.width = (originWidth / originHeight) * opt.maxHeight
        canvas.height = opt.maxHeight
      } else {
        if (originWidth >= originHeight) {
          canvas.width = opt.maxWidth
          canvas.height = (originHeight / originWidth) * opt.maxWidth
        } else {
          canvas.width = (originWidth / originHeight) * opt.maxHeight
          canvas.height = opt.maxHeight
        }
      }
      drawer!.drawImage(img, 0, 0, canvas.width, canvas.height)
      let suffix = file.name.slice(Math.max(0, file.name.lastIndexOf('.') + 1))
      let type = 'image/jpeg'
      if (suffix === 'png') {
        type = 'image/png'
      }
      let base64 = canvas.toDataURL(type, opt.quality)
      let newFile = dataURLtoFile(base64, 'new_' + file.name)
      cb(newFile)
    })
    reader.addEventListener('load', function () {
      img.src = reader.result! as string
    })
    if (file.type.indexOf('image') === 0) {
      reader.readAsDataURL(file) // 以数据url的方式读取文件内容
    }
  },
  toHump(obj: any): any {
    if (!obj) {
      return obj
    }
    if (!isObject(obj)) {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.toHump(item))
    }

    const newObj = {}
    Object.keys(obj).map(key => {
      const value = this.toHump(obj[key])
      key = key.replace(/_(\w)/g, function (all, letter) {
        return letter.toUpperCase()
      })
      newObj[key] = value
    })
    return newObj
  },
  toLine(obj: any): any {
    if (!obj) {
      return obj
    }
    if (!isObject(obj)) {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.toHump(item))
    }

    const newObj = {}
    Object.keys(obj).map(key => {
      const value = this.toHump(obj[key])
      key = key.replace(/([A-Z])/g, '_$1').toLowerCase()
      newObj[key] = value
    })
    return newObj
  },
}
