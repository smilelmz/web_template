import React from 'react'
import { cloneDeep, isEqual } from 'lodash-es'

type UseEffectParams = Parameters<typeof React.useEffect>
type EffectCallback = UseEffectParams[0]
type DependencyList = UseEffectParams[1]
type UseEffectReturn = ReturnType<typeof React.useEffect>

function checkDeps(deps: DependencyList) {
  if (!deps || deps.length === 0) {
    throw new Error('useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.')
  }
  if (deps.every(element => isPrimitive(element))) {
    throw new Error(
      'useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
    )
  }
}

function isPrimitive(val: unknown) {
  return val === null || /^[bns]/.test(typeof val)
}

function useDeepCompareMemoize(value: DependencyList) {
  const ref = React.useRef<DependencyList>()
  const signalRef = React.useRef<number>(0)
  if (!isEqual(value, ref.current)) {
    ref.current = cloneDeep(value)
    signalRef.current += 1
  }

  return [signalRef.current]
}

export function useDeepEffect(callback: EffectCallback, dependencies: DependencyList): UseEffectReturn {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(dependencies)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useEffect(callback, useDeepCompareMemoize(dependencies))
}
