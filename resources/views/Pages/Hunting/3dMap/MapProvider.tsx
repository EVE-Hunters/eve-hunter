import { useLocalStorage } from '@mantine/hooks'
import React, { useContext } from 'react'
import { ThreeMapSettings } from '../../../../scripts/types/application'
import { Connection, Coordinates, SolarSystem } from '../../../../scripts/types'
import { useMapGenerator, useWebsocketComs } from '../hooks'
import { useCharacterTracking } from '../hooks/useCharacterTracking'

interface MapProviderProps extends React.PropsWithChildren {}

export const MapProviderContext = React.createContext<{
  mapSettings: ThreeMapSettings
  toggleSetting: (value: keyof ThreeMapSettings) => void
  systems: SolarSystem[]
  connections: Connection[]
} | null>(null)

const MapProvider: React.FC<MapProviderProps> = ({ ...props }) => {
  const [mapSettings, setMapSettings] = useLocalStorage<ThreeMapSettings>({
    key: 'map-range-sphere',
    defaultValue: {
      range: true,
      npc1h: true,
      npc24h: false,
      delta: false,
      jumps: false,
      security: true,
    },
  })

  const toggleSetting = (key: keyof ThreeMapSettings) => {
    setMapSettings({
      ...mapSettings,
      [key]: !mapSettings[key],
    })
  }

  return <>{props.children}</>
}

export const useMapProvider = () => {
  const context = useContext(MapProviderContext)
  if (context == null) {
    throw new Error('Cannot use this hook ourside mapsettings provider')
  }
  return context
}

export default MapProvider
