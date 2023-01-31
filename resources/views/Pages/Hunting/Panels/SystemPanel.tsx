import {
  Card,
  Stack,
  Text,
  Flex,
  ActionIcon,
  Image,
  Tooltip,
  Box,
  Menu,
  MantineProvider,
  Grid,
} from '@mantine/core'
import { IconBoxMargin, IconMenu2, IconSend } from '@tabler/icons'
import React from 'react'
import {
  useHuntingStore,
  useMapStore,
  useTokenManager,
} from '../../../../scripts/Stores'
import { MapStatisticTypes, SolarSystem } from '../../../../scripts/types'
import { useEsiRequests } from '../../../hooks/useEsiRequests'
import { useSystemItemStatistics } from '../hooks/useSystemItemStatistics'
import PanelActions from './PanelComponents/PanelActions'
import PanelMenu from './PanelComponents/PanelMenu'
import PanelStatistics from './PanelComponents/PanelStatistics'

interface SystemPanelProps extends React.PropsWithChildren {
  system: SolarSystem
  isReturn?: boolean
}

const SystemPanel: React.FC<SystemPanelProps> = ({
  system,
  isReturn = false,
  ...props
}) => {
  const stats = useSystemItemStatistics(system.system_id)
  const filter = useHuntingStore((state) => state.panelFilter)

  const hunters = useHuntingStore((state) => state.hunters)
  const tokens = useTokenManager((state) => state.tokens)
  const setHighlightedSystem = useMapStore(
    (state) => state.setHighlightedSystem
  )
  const setHuntingSystemId = useHuntingStore(
    (state) => state.setHuntingSystemId
  )

  const { esiSetDestination } = useEsiRequests()

  const displayStatRow = (label: string, stat: MapStatisticTypes) => {
    return (
      <Flex justify="space-between">
        <Text size="xs" weight={500}>
          {label}
        </Text>
        <Text size="xs" weight={500}>
          {stats[stat]}
        </Text>
      </Flex>
    )
  }
  const showPanel =
    filter.type == null
      ? true
      : filter.value > 0
      ? stats[filter.type] > filter.value
      : true
  if (!showPanel) {
    return null
  }

  return (
    <Grid.Col span={3}>
      <Card
        onMouseEnter={() => {
          setHighlightedSystem(system.system_id)
        }}
        onMouseLeave={() => {
          setHighlightedSystem(null)
        }}
        sx={(theme) => ({
          ...(isReturn
            ? {
                backgroundColor: 'rgba(242, 173, 75, 0.6)',
              }
            : {
                backgroundColor:
                  theme.colorScheme == 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.light[8],
                color: theme.white,
              }),
        })}
      >
        <Card.Section sx={{ padding: 5, paddingLeft: 10, paddingRight: 10 }}>
          <Flex justify="space-between">
            <Text
              weight={500}
              sx={(theme) => ({
                color: theme.colors.indigo[5],
              })}
            >
              {system.name}
            </Text>
            <PanelMenu system={system} />
          </Flex>

          <Box></Box>
          <Flex justify="space-between">
            <Text size="xs" sx={(theme) => ({ color: theme.colors.green[8] })}>
              {system.region.name}
            </Text>
            <Text size="xs">
              {system?.jumps ? system.jumps - 1 : 0}{' '}
              {system?.jumps && system.jumps - 1 == 1 ? 'Gate' : 'Gates'}
            </Text>
          </Flex>

          <hr />
          <PanelStatistics system={system} />

          <PanelActions system={system} />
        </Card.Section>
      </Card>
    </Grid.Col>
  )
}
export default SystemPanel
