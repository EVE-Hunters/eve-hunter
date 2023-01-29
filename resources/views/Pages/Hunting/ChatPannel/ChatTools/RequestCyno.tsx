import { Menu, Tooltip, ActionIcon, Flex, Text } from '@mantine/core'
import { IconBuildingLighthouse } from '@tabler/icons'
import React, { HTMLAttributes } from 'react'
import {
  useHuntingStore,
  useSdeStore,
  useTokenManager,
} from '../../../../../scripts/Stores'
import { useBroadcasting, useEsiRequests } from '../../../../hooks'

interface RequestCynoProps extends React.PropsWithChildren {}

const RequestCyno: React.FC<RequestCynoProps> = ({ ...props }) => {
  const SolarSystems = useSdeStore((state) => state.SolarSystems)
  const currentLocations = useHuntingStore((state) => state.currentLocations)
  const tokens = useTokenManager((state) => state.tokens)

  const occupiedSystems = SolarSystems.filter((x) =>
    currentLocations.map((y) => y.system_id).includes(x.system_id)
  )

  const { broadcastCynoRequest } = useBroadcasting()

  return (
    <Menu withinPortal withArrow position="right-start">
      <Menu.Target>
        <Tooltip label="Request Cyno asistance">
          <ActionIcon
            size="sm"
            sx={(theme) => ({
              color: theme.white,
              '&:hover': {
                backgroundColor: 'transparent',
                color: theme.colors.gray[2],
              },
            })}
          >
            <IconBuildingLighthouse />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        {tokens.map((token) => {
          const charLocation = currentLocations.find(
            (x) => x.character_id == token.character_id
          )
          const system = SolarSystems.find(
            (x) => x.system_id == charLocation?.system_id
          )

          return (
            <Menu.Item
              key={token.character_id}
              disabled={system == null}
              onClick={() => {
                broadcastCynoRequest(system?.system_id!)
              }}
            >
              <Flex justify="space-between">
                <Text size="xs" sx={{ paddingRight: 10 }}>
                  {token.character.name}
                </Text>
                {system && <Text size="xs"> ({system.name})</Text>}
              </Flex>
            </Menu.Item>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  )
}
export default RequestCyno
