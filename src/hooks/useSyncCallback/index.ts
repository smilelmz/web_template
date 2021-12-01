import { useEffect, useState, useCallback } from 'react'

type noop = (...args: any[]) => any

export function useSyncCallback<T extends noop>(callback: T) {
  const [proxyState, setProxyState] = useState({ current: false })
  const [params, setParams] = useState<any[]>([])

  const Func = useCallback(
    (...args: any[]) => {
      setProxyState({ current: true })
      setParams(args)
    },
    [proxyState],
  )

  useEffect(() => {
    if (proxyState.current === true) {
      setProxyState({ current: false })
    }
  }, [proxyState])

  useEffect(() => {
    proxyState.current && callback(...params)
  })

  return Func
}
