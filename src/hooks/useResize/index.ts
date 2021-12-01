import { useRef } from 'react'

import { useEventListener } from 'ahooks'

type ChangeEvent = {
  widthChange?: (width?: number) => void
  heightChange?: (height?: number) => void
}
const inBrowser = typeof window !== 'undefined'

export function useResize(changeEvent: ChangeEvent = {}) {
  const { widthChange, heightChange } = changeEvent
  const width = useRef(inBrowser ? window.innerWidth : 0)
  const height = useRef(inBrowser ? window.innerHeight : 0)

  const onResize = () => {
    if (width.current !== window.innerWidth) {
      width.current = window.innerWidth
      widthChange?.(window.innerWidth)
    }
    if (height.current !== window.innerHeight) {
      height.current = window.innerHeight
      heightChange?.(window.innerWidth)
    }
  }

  useEventListener('resize', onResize)
  useEventListener('orientationchange', onResize)

  return { width, height }
}
