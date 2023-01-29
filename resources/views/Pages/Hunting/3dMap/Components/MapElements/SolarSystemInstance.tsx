import { Box, Indicator, Portal, Text } from '@mantine/core'
import { useClickOutside, useDisclosure } from '@mantine/hooks'
import { Html, Instance } from '@react-three/drei'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import { IconCornerRightUpDouble, IconMapPin } from '@tabler/icons'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import { useHuntingStore } from '../../../../../../scripts/Stores/HuntingStore'
import { useMapStore } from '../../../../../../scripts/Stores/MapStore'
import { ScreenPosition, SolarSystem } from '../../../../../../scripts/types'
import IconCircleTarget from '../../../../../CustomIcon/IconCircleTarget'
import { useSystemIsInRoute } from '../../../hooks'
import { useSystemItemStatistics } from '../../../hooks/useSystemItemStatistics'
import { useSystemStatisticColorIntensity } from '../../../hooks/useSystemStatisticColorIntensity'
import SystemContextMenu from './SystemContextMenu'

interface SolarSystemInstanceProps extends React.PropsWithChildren {
  system: SolarSystem
}

const SolarSystemInstance: React.FC<SolarSystemInstanceProps> = ({
  system,
  ...props
}) => {
  const [pointerOver, handlers] = useDisclosure(false)
  const [scale, setScale] = useState<number>(0.07)

  const [isFocused, { open: setFocused, close: unFocused }] =
    useDisclosure(false)
  const [isGrowing, { open: setGrowing, close: setShrinking }] =
    useDisclosure(false)

  const [contextPosition, setContextPosition] = useState<ScreenPosition | null>(
    null
  )
  const returnSystemId = useHuntingStore((state) => state.returnSystemId)
  const menuRef = useClickOutside(() => setContextPosition(null))

  const huntingSystemId = useHuntingStore((state) => state.huntingSystemId)

  const huntersInSystem = useMapStore(
    (state) => state.hunterLocations[system.system_id] ?? []
  )
  const usershunters = useHuntingStore((state) =>
    state.currentLocations.filter((x) => x.system_id == system.system_id)
  )
  const highlightedSystem = useMapStore((state) => state.highlightedSystem)
  const setHighlightedSystem = useMapStore(
    (state) => state.setHighlightedSystem
  )

  const activeStatistic = useMapStore((state) => state.activeStatistic)
  const statistic = useSystemItemStatistics(system.system_id)[activeStatistic]
  const [color, intensity] = useSystemStatisticColorIntensity(statistic)

  const sphereColor = statistic <= 0 ? '#cacbcc' : color

  useEffect(() => {
    if (highlightedSystem == system.system_id) {
      setFocused()
    } else {
      setScale(0.07)
      unFocused()
    }
  }, [highlightedSystem])

  useEffect(() => {
    document.body.style.cursor = pointerOver ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [pointerOver])

  useFrame(() => {
    if (!isFocused) {
      return
    }
    const _r = isGrowing ? scale + 0.0007 : scale - 0.0007
    if (_r >= 0.08) {
      setShrinking()
    }
    if (_r <= 0.05) {
      setGrowing()
    }
    setScale(_r)
  })
  const getAction = () => {
    switch (activeStatistic) {
      case 'npc1h':
      case 'npc24h':
      case 'delta':
        return 'NPC kills'
      case 'jumps':
        return 'Jumps'
      case 'podKills':
        return 'pod kills'
      case 'shipKills':
        return 'ship kills'
    }
  }

  const getTimeFrame = () => {
    if (activeStatistic == 'npc24h') {
      return 'in the last 24 hours'
    } else {
      return 'in the last hour'
    }
  }

  const statSection = (
    <Text size="xs">
      <>
        {activeStatistic == 'delta'
          ? statistic > 0
            ? 'Increase of'
            : 'Decrease of'
          : null}{' '}
        {statistic < 0 ? statistic * -1 : statistic} {getAction()}{' '}
        {getTimeFrame()}
      </>
    </Text>
  )

  const handleConextMenuClick = (event: ThreeEvent<MouseEvent>) => {
    console.log(event)
    setContextPosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  const handleMouseOver = (event: ThreeEvent<MouseEvent>) => {
    handlers.open()
    setHighlightedSystem(system.system_id)
  }

  const handleMouseOut = (event: ThreeEvent<MouseEvent>) => {
    handlers.close()
    setHighlightedSystem(null)
  }

  return (
    <Instance
      color={sphereColor}
      scale={scale}
      position={[system.x, system.y, system.z]}
      onPointerOver={handleMouseOver}
      onPointerLeave={handleMouseOut}
      onContextMenu={handleConextMenuClick}
    >
      <Box
        component={Html}
        pointerEvents="none"
        visible={false}
        sx={{
          position: 'relative',
          width: '6rem',
          opacity: pointerOver ? 1 : 0,
        }}
      >
        <Box
          sx={(theme) => ({
            marginTop: '-0.75rem',
            marginLeft: '1.25rem',
            borderRadius: theme.fn.radius('md'),
            fontWeight: 200,
            backgroundColor: 'rgba(0,0,0, 0.7)',
            paddingLeft: '0.125rem',
            display: 'flex',
            width: '100%',
            userSelect: 'none',
            lineBreak: 'normal',
            flexWrap: 'nowrap',
            color: 'white',
          })}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
            }}
          >
            <Box>
              <Text>{system.name}</Text>
              {statSection}
            </Box>
          </Box>
        </Box>
      </Box>
      {contextPosition != null && (
        <Box component={Html} style={{ position: 'relative' }}>
          <Portal>
            <SystemContextMenu
              ref={menuRef}
              system={system}
              sx={{
                position: 'fixed',
                left: contextPosition.x,
                top: contextPosition.y,
              }}
            />
          </Portal>
        </Box>
      )}
      {huntersInSystem.length > 0 && (
        <Box
          component={Html}
          distanceFactor={2}
          sx={{
            paddingBottom: 90,
          }}
          pointerEvents="none"
          transform
          sprite
          onContextMenu={handleConextMenuClick}
        >
          <Indicator label={`${huntersInSystem.length}`} size={16}>
            <IconMapPin size={40} />
          </Indicator>
        </Box>
      )}
      {usershunters.length > 0 && (
        <Box
          component={Html}
          distanceFactor={2}
          sx={{ paddingTop: 4 }}
          pointerEvents="none"
          transform
          sprite
          onContextMenu={handleConextMenuClick}
        >
          <IconCircleTarget size={50} />
        </Box>
      )}
      {returnSystemId == system.system_id && (
        <Box
          component={Html}
          distanceFactor={2}
          sx={{ paddingTop: 100 }}
          pointerEvents="none"
          transform
          sprite
          onContextMenu={handleConextMenuClick}
        >
          <IconCornerRightUpDouble size={40} />
        </Box>
      )}
    </Instance>
  )
}
export default SolarSystemInstance
