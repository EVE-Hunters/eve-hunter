import {
  Box,
  createStyles,
  Flex,
  Group,
  Text,
  Sx,
  Menu,
  Tooltip,
} from '@mantine/core'
import { MenuDropdown } from '@mantine/core/lib/Menu/MenuDropdown/MenuDropdown'
import { useDisclosure } from '@mantine/hooks'
import { IconAlertCircle, IconChevronsRight } from '@tabler/icons'
import React, { HTMLAttributes, Suspense, useState } from 'react'
import { useHuntingStore } from '../../../../../../scripts/Stores'
import { useTokenManager } from '../../../../../../scripts/Stores/TokenManager'
import { ScreenPosition, SolarSystem } from '../../../../../../scripts/types'
import { useBroadcasting, useEsiRequests } from '../../../../../hooks'
import { useTokenProvider } from '../../../../../Providers/TokenProvider/TokenProvider'
import {
  UiSdeProviderContext,
  useUiSde,
} from '../../../../../Providers/UiSdeProvider'

interface SystemContextMenuProps extends React.PropsWithChildren {
  system: SolarSystem
  sx?: Sx
}

interface SystemContextMenuItem extends React.HTMLAttributes<HTMLDivElement> {
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
}

const useStyles = createStyles((theme) => ({
  menuContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: theme.fn.radius('xs'),
    padding: 5,
    fontSize: theme.fontSizes.xs,
    userSelect: 'none',
    border: `0.1rem solid ${theme.colors.gray[6]}`,
    zIndex: 167597106,
  },
  menuItem: {
    cursor: 'pointer',
    width: '100%',
    '& :hover': {
      backgroundColor: 'rgba(50,50,50, 0.6)',
    },
    '& :active': {
      backgroundColor: 'rgba(200,200,200, 0.6)',
    },
  },
  menuItemFlex: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  divider: {
    border: `1px solid ${theme.colors.gray[7]}`,
  },
}))

const useCharacterMenuStyles = createStyles((theme) => ({
  characterMenu: {
    backgroundColor:
      theme.colorScheme == 'dark'
        ? theme.colors.grayp[8]
        : theme.colors.gray[2],
  },
}))

const MenuItem = React.forwardRef<HTMLDivElement, SystemContextMenuItem>(
  function (inProps, ref) {
    const { leftIcon, rightIcon, ...props } = inProps
    const { classes } = useStyles()
    return (
      <Box ref={ref} className={classes.menuItem} {...props}>
        <Flex className={classes.menuItemFlex} align="center">
          <Box
            component={Flex}
            align="center"
            sx={{ paddingLeft: 8, paddingRight: 8, width: 15 }}
          >
            {leftIcon}
          </Box>
          <Text>{inProps.children}</Text>
          <Box
            component={Flex}
            align="center"
            sx={{
              marginLeft: 'auto',
              paddingLeft: 8,
              paddingRight: 8,
              width: 15,
            }}
          >
            {rightIcon}
          </Box>
        </Flex>
      </Box>
    )
  }
)

const CharacterMenu: React.FC<{
  activator: React.ReactElement
  onSelect: (id: number) => void
  scope: string
}> = ({ activator, onSelect, scope, ...props }) => {
  const tokens = useTokenManager((state) => state.tokens)
  const { classes } = useStyles()
  const { classes: menuStyles } = useCharacterMenuStyles()
  return (
    <Menu position="right-start" withArrow arrowPosition="center">
      <Box component={Menu.Target} className={classes.menuItem}>
        {activator}
      </Box>
      <Menu.Dropdown>
        {tokens.map((token) => {
          const disabled = !token.scopes.includes(scope)

          return (
            <Menu.Item
              disabled={disabled}
              key={token.character_id}
              onClick={() => onSelect(token.character_id)}
              rightSection={
                disabled && <IconAlertCircle color="red" size="15" />
              }
            >
              {token.character.name}
            </Menu.Item>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  )
}

const SystemContextMenu = React.forwardRef<
  HTMLDivElement,
  SystemContextMenuProps
>(function (inProps, ref) {
  const { sx, system } = inProps
  const { classes } = useStyles()
  const tokens = useTokenManager((state) => state.tokens)
  const hunters = useHuntingStore((state) => state.hunters)
  const setHuntingSystemId = useHuntingStore(
    (state) => state.setHuntingSystemId
  )

  const { esiSetDestination } = useEsiRequests()
  const { broadcastDestinationSet } = useBroadcasting()

  return (
    <Suspense fallback={null}>
      <Box ref={ref} className={classes.menuContainer} sx={{ ...sx }}>
        <Flex sx={{ marginBottom: 10 }}>
          <Text>
            <strong>{system.name}</strong> / {system.constellation.name} /{' '}
            {system.region.name}
          </Text>
        </Flex>

        <MenuItem onClick={() => setHuntingSystemId(system.system_id)}>
          Hunt From Here
        </MenuItem>
        <hr className={classes.divider} />
        <MenuItem
          onClick={() =>
            esiSetDestination(hunters, system.system_id).then((response) => {
              broadcastDestinationSet(system.system_id)
            })
          }
        >
          Set Destination (Hunt Group)
        </MenuItem>
        <CharacterMenu
          onSelect={(id) =>
            esiSetDestination(id, system.system_id).then((response) => {
              broadcastDestinationSet(system.system_id)
            })
          }
          scope="esi-ui.write_waypoint.v1"
          activator={
            <MenuItem rightIcon={<IconChevronsRight size={15} />}>
              Set Destination
            </MenuItem>
          }
        />
      </Box>
    </Suspense>
  )
})
export default SystemContextMenu
