import { Group, Input, NumberInput, Text } from '@mantine/core'
import React, { HTMLAttributes } from 'react'
import { useHuntingStore } from '../../../../scripts/Stores/HuntingStore'

interface RangeManagerProps extends React.PropsWithChildren {}

const RangeManager: React.FC<RangeManagerProps> = ({ ...props }) => {
  const huntingRange = useHuntingStore((state) => state.huntingRange)
  const setHuntingRange = useHuntingStore((state) => state.setHuntingRange)
  return (
    <Group sx={{ paddingLeft: 5, paddingRight: 5 }} spacing={0}>
      <Text weight={500} sx={{ marginRight: 5 }}>
        Range:
      </Text>
      <NumberInput
        min={1}
        max={20}
        type="number"
        sx={{ width: 70 }}
        value={huntingRange}
        onChange={(val) => setHuntingRange(val ?? 5)}
      />
    </Group>
  )
}
export default RangeManager
