import React from 'react'
import ReactDOM from 'react-dom'
import Loader, { ILoaderHandler, ILoaderProps } from '.'

type CallbackOptions = {
  ref: ILoaderHandler
  destroy: VoidFunction
}

type InstanceCallback = (opts: CallbackOptions) => void

let times = 0
let instance: CallbackOptions | null = null

const createInstance = (props: ILoaderProps, callback: InstanceCallback) => {
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(
    <Loader
      ref={ref => {
        callback({
          ref: ref!,
          destroy: () => {
            ReactDOM.unmountComponentAtNode(div)
            div.remove()
          },
        })
      }}
      {...props}
    />,
    div,
  )
}

const getInstance = (props: ILoaderProps, callback: InstanceCallback) => {
  times++
  if (instance) {
    callback(instance)
    return
  }
  createInstance(props, ins => {
    if (instance) {
      callback(instance)
      return
    }
    instance = ins
    callback(ins)
  })
}

export default {
  show(tip?: string, props: ILoaderProps = {}) {
    if (instance) {
      instance?.ref?.loading!(true)
    } else {
      times === 0 && getInstance({ tip, position: 'fixed', lockScroll: true, ...props }, function () {})
    }
  },
  hide(delay = 0) {
    if (instance) {
      if (delay <= 0) {
        instance?.ref?.loading!(false)
      } else {
        const timer = setTimeout(() => {
          instance?.ref?.loading!(false)
          clearTimeout(timer)
        }, delay)
      }
    }
  },
  destroy() {
    if (instance) {
      instance.destroy()
      instance = null
      times = 0
    }
  },
}
