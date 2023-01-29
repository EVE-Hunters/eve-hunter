import { useEffect, useRef } from 'react'

function usePrevious<T = unknown>(value: T): T {
  const ref = useRef<T>(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
