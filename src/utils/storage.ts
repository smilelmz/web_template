/* eslint-disable unicorn/no-document-cookie */
export const Storage = {
  get(key: string, storage: Storage) {
    const target = storage || localStorage
    const value = target.getItem(key)
    if (!value) {
      return value
    }
    try {
      const dataObj = JSON.parse(value)
      if (typeof dataObj !== 'object') {
        return dataObj
      }
      const { data, timeout } = dataObj
      if (data === undefined && timeout === undefined) {
        return dataObj
      }
      if (timeout === -1) {
        return data
      }
      // 数据已过期
      if (Date.now() - timeout > 0) {
        target.removeItem(key)
      }
      return data
    } catch {
      return value
    }
  },
  set(key: string, value: any, timeout = -1, storage: Storage) {
    const target = storage || localStorage
    if (typeof value === 'object') {
      target.setItem(
        key,
        JSON.stringify({
          data: value,
          timeout: timeout >= 0 ? Date.now() + timeout * 1000 : -1,
        }),
      )
    } else {
      target.setItem(key, value)
    }
  },
  remove(key: string, storage: Storage) {
    const target = storage || localStorage
    if (key) {
      target.removeItem(key)
    }
  },
  getCookie(name: string) {
    // 获取cookie字符串
    const strcookie = document.cookie
    // 分割
    const arrcookie = strcookie.split(';')
    // 遍历匹配
    for (const element of arrcookie) {
      const arr = element.split('=')
      if (arr[0].trim() === name) {
        return arr[1]
      }
    }
    return ''
  },
  setCookie(key: string, value: string, t: number) {
    // 获取cookie字符串
    const date = new Date()
    date.setDate(date.getDate() + t || 0)
    document.cookie = `${key}=${value}; expires=${date.toDateString()}`
    return true
  },
  removeCookie(key: string) {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const cval = this.getCookie(key)
    if (cval !== null) {
      document.cookie = `${key}=${cval};expires=${exp.toUTCString()};domain=.pupumall.net`
    }
  },
  getSession(key: string) {
    return this.get(key, sessionStorage)
  },
  setSession(key: string, value: any, timeout = -1) {
    this.set(key, value, timeout, sessionStorage)
  },
  removeSession(key: string) {
    if (key) {
      this.remove(key, sessionStorage)
    }
  },
}
