import { useEffect, useRef } from 'react'

type BasicFunction = () => void

export const useInterval = (callback: BasicFunction, delay: number | null) => {
  const savedCallback = useRef<BasicFunction>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
