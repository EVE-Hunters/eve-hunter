import { ActionIcon, Box, Flex, Image, Tooltip } from '@mantine/core'
import { IconBoxMargin, IconSend } from '@tabler/icons'
import React, { HTMLAttributes } from 'react'
import { useHuntingStore } from '../../../../../scripts/Stores'
import { SolarSystem } from '../../../../../scripts/types'
import { useBroadcasting, useEsiRequests } from '../../../../hooks'

interface PanelActionsProps extends React.PropsWithChildren {
  system: SolarSystem
}

const PanelActions: React.FC<PanelActionsProps> = ({ system, ...props }) => {
  const { esiSetDestination } = useEsiRequests()
  const { broadcastDestinationSet } = useBroadcasting()
  const hunters = useHuntingStore((state) => state.hunters)
  return (
    <Flex sx={{ marginTop: 10 }}>
      <Tooltip label="Open Dotlan" withinPortal>
        <ActionIcon
          component="a"
          target="_blank"
          href={`https://evemaps.dotlan.net/map/${system.region.name
            .split(' ')
            .join('_')}/${encodeURIComponent(
            system.name.split(' ').join('_')
          )}`}
        >
          <Image
            src="/images/dotlan-avatar_400x400.png"
            alt="dotlan"
            radius="xl"
            width="1rem"
          />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Open ZKill">
        <ActionIcon
          component="a"
          target="_blank"
          href={`https://zkillboard.com/system/${system.system_id}/`}
        >
          <Image
            src="/images/zkillboard.png"
            alt="zkillboard"
            radius="xl"
            width="1rem"
          />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Open Rangemap">
        <ActionIcon
          component="a"
          target="_blank"
          href={`https://evemaps.dotlan.net/range/Marshal,5/${system.name
            .split(' ')
            .join('_')}`}
          color="blue.6"
        >
          <IconBoxMargin />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Set destination (Hunt Group)">
        <ActionIcon
          color="green.7"
          sx={{ marginLeft: 'auto' }}
          onClick={() =>
            esiSetDestination(hunters, system.system_id).then(() => {
              broadcastDestinationSet(system.system_id)
            })
          }
        >
          <Box component={IconSend} sx={{ transform: 'rotate(45deg)' }} />
        </ActionIcon>
      </Tooltip>
    </Flex>
  )
}
export default PanelActions
