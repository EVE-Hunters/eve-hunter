import { Line } from '@react-three/drei'
import React, { HTMLAttributes, useEffect, useMemo, useRef } from 'react'
import { snapshot } from 'valtio'
import { useHuntingStore } from '../../../../../scripts/Stores/HuntingStore'
import { useMapStore } from '../../../../../scripts/Stores/MapStore'
import {
  Connection,
  Coordinates,
  SolarSystem,
  Stargate,
} from '../../../../../scripts/types'
import { useSde } from '../../../../Providers/SdeProvider.tsx'
import { useMapGenerator } from '../../hooks'
import { useMapProvider } from '../MapProvider'
import RenderConnections from './MapElements/RenderConnections'
import RenderStars from './MapElements/RenderStars'
import SolarsystemSphere from './MapElements/SolarSystemItem'

interface HuntingAreaProps extends React.PropsWithChildren {}

type SystemConnection = [Coordinates, Coordinates]

type Network = {
  systems: SolarSystem[]
  links: SystemConnection[]
}

const HuntingArea: React.FC<HuntingAreaProps> = ({ ...props }) => {
  return (
    <>
      <RenderConnections />
      <RenderStars />
    </>
  )
}
export default HuntingArea
