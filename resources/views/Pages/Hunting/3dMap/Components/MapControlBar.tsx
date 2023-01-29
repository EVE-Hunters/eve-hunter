import { Button } from '@mantine/core'
import React, { HTMLAttributes } from 'react'
import { useHuntingStore, useMapStore } from '../../../../../scripts/Stores'
import { MapStatisticTypes } from '../../../../../scripts/types'
import { useEsiRequests } from '../../../../hooks'

interface MapStatControlProps extends React.PropsWithChildren {}

type BtnGroup = {
  type: MapStatisticTypes
  label: string
}

const MapControlBar: React.FC<MapStatControlProps> = ({ ...props }) => {
  const activeStatistic = useMapStore((state) => state.activeStatistic)
  const setActiveStatistic = useMapStore((state) => state.setActiveStatistic)
  const rangeSphere = useMapStore((state) => state.showRangeSphere)
  const toggleRangeSphere = useMapStore((state) => state.toggleRangeSphere)
  const hunters = useHuntingStore((state) => state.hunters)
  const returnSystemId = useHuntingStore((state) => state.returnSystemId)
  const { esiSetDestination } = useEsiRequests()

  const btnGroup: BtnGroup[] = [
    {
      type: 'npc1h',
      label: 'NPC 1H',
    },
    {
      type: 'npc24h',
      label: 'NPC 24H',
    },
    {
      type: 'delta',
      label: 'Delta',
    },
    {
      type: 'jumps',
      label: 'Jumps',
    },
    {
      type: 'shipKills',
      label: 'Ship Kills',
    },
    {
      type: 'podKills',
      label: 'Pod Kills',
    },
  ]
  return (
    <>
      <Button
        size="xs"
        variant="subtle"
        color={rangeSphere ? 'green.6' : 'blue'}
        onClick={() => toggleRangeSphere()}
      >
        Toggle Range Shere
      </Button>
      <Button.Group>
        {btnGroup.map((stat) => (
          <Button
            variant="subtle"
            key={stat.type}
            size="xs"
            color={stat.type == activeStatistic ? 'green.6' : 'blue'}
            onClick={() => setActiveStatistic(stat.type)}
          >
            {stat.label}
          </Button>
        ))}
      </Button.Group>
      <Button
        disabled={returnSystemId == null}
        variant="subtle"
        size="xs"
        color="yellow.7"
        sx={{ marginLeft: 'auto' }}
        onClick={() =>
          returnSystemId != null && esiSetDestination(hunters, returnSystemId)
        }
      >
        Return to Wormhole
      </Button>
    </>
  )
}
export default MapControlBar
