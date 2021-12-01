import React, { CSSProperties, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { Spin, SpinProps } from 'antd'
import { BASE_PREFIX, createNamespace } from '@/utils'
import './index.less'

const [bem] = createNamespace('loader')

export type ILoaderProps = {
  position?: 'absolute' | 'fixed'
  lockScroll?: boolean
} & SpinProps

export type ILoaderHandler = {
  loading?: (status?: boolean) => void
}

const Loader = (props: ILoaderProps, ref: React.Ref<ILoaderHandler>) => {
  const { position, lockScroll = false, ...rest } = props
  const [loading, setLoading] = useState(true)

  useImperativeHandle(ref, () => ({
    loading: (status = true) => {
      setLoading(status)
    },
  }))

  useEffect(() => {
    if (!loading) {
      document.body.classList.remove(`${BASE_PREFIX}overflow-hidden`)
    }
  }, [loading])

  useEffect(() => {
    if ((props.spinning || loading) && lockScroll) {
      document.body.classList.add(`${BASE_PREFIX}overflow-hidden`)
    }
    return () => {
      if (lockScroll) {
        document.body.classList.remove(`${BASE_PREFIX}overflow-hidden`)
      }
    }
  }, [loading, lockScroll, props.spinning])

  const style = useMemo(() => {
    const style: CSSProperties = {}
    if (position) {
      style.position = position!
    }
    return style
  }, [position])
  if (!loading) {
    return <></>
  }
  return (
    <div className={bem()} style={style}>
      <Spin {...rest} spinning={loading}>
        <div className={bem('mask')} />
      </Spin>
    </div>
  )
}

export default React.forwardRef(Loader)
