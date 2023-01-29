import React, { HTMLAttributes, useRef } from 'react'
import EveMap from './Components/EveMap'
import MapEvents from './MapEvents'
import MapProvider from './MapProvider'

interface MapProps extends React.PropsWithChildren {
  height?: number
}

const Map: React.FC<MapProps> = ({ ...props }) => {
  return (
    <MapProvider>
      <MapEvents />
      <EveMap height={props.height} />
    </MapProvider>
  )
}
export default Map
