import {
  Text,
  Card,
  Flex,
  ActionIcon,
  Stack,
  Tooltip,
  Title,
} from '@mantine/core'
import { IconX } from '@tabler/icons'
import React, { HTMLAttributes, useMemo, useState } from 'react'
import { isPropertyAccessChain } from 'typescript'
import { SolarSystem } from '../../../scripts/types'
import { useSde } from '../../Providers/SdeProvider.tsx'
import SolarSystemSearch from './SolarSystemSearch'

interface SolarSystemSelectProps extends React.PropsWithChildren {
  selected?: number
  onChange?: (system_id: number) => void
}

const SolarSystemSelect: React.FC<SolarSystemSelectProps> = ({ ...props }) => {
  const { SolarSystems } = useSde()

  const [selectedSolarSystemId, setSelectedSolarSystemId] = useState<
    number | null
  >(props.selected ?? null)

  const selectedSystem =
    SolarSystems.find((x) => x.system_id == selectedSolarSystemId) ?? null

  if (selectedSystem == null) {
    return (
      <SolarSystemSearch
        onSystemSelected={(value) => {
          setSelectedSolarSystemId(value)
          props.onChange && props.onChange(value)
        }}
      />
    )
  }

  return (
    <Card>
      <Text size="lg" weight={500}>
        Staging System
      </Text>
      <Flex justify="space-between" align="center">
        <Stack spacing={0}>
          <Text weight={500}>{selectedSystem.name}</Text>
          <Text>
            {selectedSystem.constellation.name} / {selectedSystem.region.name}
          </Text>
        </Stack>
        <Tooltip label="Clear Selection" position="left">
          <ActionIcon
            color="red"
            onClick={() => setSelectedSolarSystemId(null)}
          >
            <IconX />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </Card>
  )
}
export default SolarSystemSelect
