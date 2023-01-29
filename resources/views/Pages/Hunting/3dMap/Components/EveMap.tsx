import { Box, Flex } from '@mantine/core'
import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useRef } from 'react'

import ControlsProvider from './ControlsProvider'
import HuntingArea from './HuntingArea'
import RangeSphere from './MapElements/RangeSphere'
import Skybox from './SkyBox'

import { MapStatisticTypes } from '../../../../../scripts/types'
import MapControlBar from './MapControlBar'

interface EveMapProps extends React.PropsWithChildren {
  height?: number
}

type BtnGroup = {
  type: MapStatisticTypes
  label: string
}

const EveMap: React.FC<EveMapProps> = ({ ...props }) => {
  //const { mapSettings, toggleSetting } = useMapSettingsProvider()

  const renderCount = useRef<number>(0)
  renderCount.current++

  return (
    <>
      <Box sx={{ height: props.height ? props.height - 35 : 700 }}>
        <Flex sx={{ backgroundColor: 'black', height: 30 }}>
          <MapControlBar />
        </Flex>
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault fov={50} position={[1, 1, 1]} />
          <ambientLight />
          <ControlsProvider>
            <HuntingArea />
            <RangeSphere />
          </ControlsProvider>
          <Skybox />
        </Canvas>
      </Box>
    </>
  )
}
export default EveMap
