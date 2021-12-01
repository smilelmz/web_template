/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react'
import { Skeleton } from 'antd'

const PH: React.FC = () => {
  // 防止加载过快时闪屏
  const [show, setshow] = useState<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout>()
  useEffect(() => {
    const timer = setTimeout(() => {
      setshow(true)
    }, 200)
    timeoutRef.current = timer
    return () => {
      clearTimeout(timeoutRef.current!)
    }
  }, [])
  return (
    <>
      {show && (
        <div style={{ padding: '20px' }}>
          <Skeleton active />
          <Skeleton active paragraph={{ rows: 15 }} />
        </div>
      )}
    </>
  )
}
function HOCLazy<T>(chunk: any): React.FC<T> {
  const WrappedComponent: React.FC = React.lazy(chunk)
  const Comp: React.FC<any> = ({ ...props }) => (
    <React.Suspense fallback={<PH />}>
      <WrappedComponent {...props} />
    </React.Suspense>
  )
  return Comp
}
export default HOCLazy
