import { ActionIcon, Group, Text } from '@mantine/core'
import { IconCircleX } from '@tabler/icons'
import React from 'react'

import { useSdeStore } from '../../../../scripts/Stores'
import { useHuntingStore } from '../../../../scripts/Stores/HuntingStore'
import { SolarSystem } from '../../../../scripts/types'
import SolarSystemSearchMenu from '../../../Components/SolarSystemSearch/SolarSystemSearchMenu'

interface HuntingManagerProps extends React.PropsWithChildren {}

const HuntingManager: React.FC<HuntingManagerProps> = ({ ...props }) => {
  const SolarSystems = useSdeStore((state) => state.SolarSystems)
  const setHuntingSystemId = useHuntingStore(
    (state) => state.setHuntingSystemId
  )
  const setReturnSystemId = useHuntingStore((state) => state.setReturnSystemId)
  const huntingSystemId = useHuntingStore((state) => state.huntingSystemId)

  const handleSystemSelection = (item: SolarSystem) => {
    setHuntingSystemId(item.system_id)
    //generateMap(item.system_id)
  }

  const system = SolarSystems.find((x) => x.system_id == huntingSystemId)

  const clearHuntingsystem = () => {
    setHuntingSystemId(null)
    setReturnSystemId(null)
  }

  return (
    <Group
      spacing={0}
      sx={{
        paddingLeft: 5,
        paddingRight: 5,
        borderRight: '1px solid',
        minWidht: 150,
        width: 270,
      }}
    >
      <SolarSystemSearchMenu onSystemSelected={handleSystemSelection} />
      <Text weight={500}>Hunting From: </Text>
      {system && (
        <>
          <Text sx={{ paddingLeft: 5 }}>{system.name}</Text>
          <ActionIcon radius="xl" color="red" onClick={clearHuntingsystem}>
            <IconCircleX size={20} />
          </ActionIcon>
        </>
      )}
    </Group>
  )
}
export default HuntingManager
