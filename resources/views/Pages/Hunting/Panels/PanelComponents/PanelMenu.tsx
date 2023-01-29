import { ActionIcon, Menu } from '@mantine/core'
import { IconMenu2 } from '@tabler/icons'
import React, { HTMLAttributes } from 'react'
import { useHuntingStore, useTokenManager } from '../../../../../scripts/Stores'
import { SolarSystem } from '../../../../../scripts/types'
import { useEsiRequests } from '../../../../hooks'

interface PanelMenuProps extends React.PropsWithChildren {
  system: SolarSystem
}

const PanelMenu: React.FC<PanelMenuProps> = ({ system, ...props }) => {
  const tokens = useTokenManager((state) => state.tokens)
  const hunters = useHuntingStore((state) => state.hunters)
  const setHuntingSystemId = useHuntingStore(
    (state) => state.setHuntingSystemId
  )
  const { esiSetDestination } = useEsiRequests()
  return (
    <Menu withinPortal>
      <Menu.Target>
        <ActionIcon sx={{ marginLeft: 'auto' }}>
          <IconMenu2 />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown sx={{ backgroundColor: 'black' }}>
        <Menu.Item onClick={() => setHuntingSystemId(system.system_id)}>
          Hunt from here
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={() => esiSetDestination(hunters, system.system_id)}>
          Set Destination (Hunt Group)
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Set Destination For</Menu.Label>
        {tokens.map((token) => (
          <Menu.Item
            key={token.character_id}
            onClick={() =>
              esiSetDestination(token.character_id, system.system_id)
            }
          >
            {token.character.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
export default PanelMenu
