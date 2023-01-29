import axios from 'axios'
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { RefreshToken } from '../../../scripts/types'
import { route } from '../../../scripts/helpers'
import { useTokenProvider } from '../TokenProvider/TokenProvider'
import { useHuntingStore } from '../../../scripts/Stores/HuntingStore'

interface HuntingProviderProps extends React.PropsWithChildren {
  currentHunters: number[]
}

export const HunterProviderContext = React.createContext<{
  currentHunters: number[]
  setHunters: (id: number[]) => void
} | null>(null)

const HuntingProvider: React.FC<HuntingProviderProps> = ({ ...props }) => {
  const [stagingSystemId, setStagingSystemId] = useState<number | null>()
  const [huntingSystemId, setHuntingSystemId] = useState<number | null>()
  const hunterStore = useHuntingStore()

  const [tracking, setTracking] = useState<boolean>(false)
  const { tokens, getToken } = useTokenProvider()

  const trackingTimerRef = useRef<NodeJS.Timeout>()

  const [currentHunters, setCurrentHunters] = useState<number[]>(
    props.currentHunters ?? []
  )

  const setHunters = (id: number[]) => {
    setCurrentHunters(id)
    axios.post(route('account.hunters.set'), { character_id: id })
  }

  const toggleTracking = () => {
    setTracking((o) => !o)
  }

  const getLocations = () => {}

  useEffect(() => {
    if (tracking) {
      trackingTimerRef.current = setInterval(getLocations, 5000)
    } else {
      clearInterval(trackingTimerRef.current)
    }
    return () => {
      clearInterval(trackingTimerRef.current)
    }
  }, [tracking])

  useEffect(() => {
    hunterStore.init(props.currentHunters)
  }, [])

  return (
    <HunterProviderContext.Provider
      value={{
        currentHunters,
        setHunters,
      }}
    >
      {props.children}
    </HunterProviderContext.Provider>
  )
}

export const useHunterProvider = () => {
  const context = React.useContext(HunterProviderContext)
  if (context == null) {
    throw new Error('cannot use this hook outside the HunterProvider')
  }
  return context
}

export default HuntingProvider
