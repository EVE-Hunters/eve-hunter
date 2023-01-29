import { Flex, Stack, Text } from '@mantine/core'
import React, { HTMLAttributes } from 'react'
import { MapStatisticTypes, SolarSystem } from '../../../../../scripts/types'
import { useSystemItemStatistics } from '../../hooks/useSystemItemStatistics'
import {
  useSystemStatisticColorIntensity,
  useSystemStatisticsColors,
} from '../../hooks/useSystemStatisticColorIntensity'

interface PanelStatisticsProps extends React.PropsWithChildren {
  system: SolarSystem
}

const PanelStatistics: React.FC<PanelStatisticsProps> = ({
  system,
  ...props
}) => {
  const stats = useSystemItemStatistics(system.system_id)
  const colors = useSystemStatisticsColors(system.system_id)

  const displayStatRow = (label: string, stat: MapStatisticTypes) => {
    return (
      <Flex justify="space-between">
        <Text size="xs" weight={500}>
          {label}
        </Text>
        <Text size="xs" weight={500} color={colors[stat]}>
          {stats[stat]}
        </Text>
      </Flex>
    )
  }
  return (
    <Stack spacing={0}>
      {displayStatRow('NPC 1h', 'npc1h')}
      {displayStatRow('NPC 24h', 'npc24h')}
      {displayStatRow('Delta', 'delta')}
      {displayStatRow('Ship Kills', 'shipKills')}
      {displayStatRow('Pod Kills', 'podKills')}
      {displayStatRow('Jumps', 'jumps')}
    </Stack>
  )
}
export default PanelStatistics
