import React, { HTMLAttributes, useRef } from 'react'
import { useMapGenerator, useRouteCalculator, useWebsocketComs } from '../hooks'
import { useCharacterTracking } from '../hooks/useCharacterTracking'

interface MapEventsProps extends React.PropsWithChildren {}

const MapEvents: React.FC<MapEventsProps> = ({ ...props }) => {
  const render = useRef<number>(0)
  render.current++

  useMapGenerator()
  useWebsocketComs()
  useCharacterTracking()
  useRouteCalculator()

  return null
}
export default MapEvents
