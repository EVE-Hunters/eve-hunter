import { Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { ActionIcon, Box, Flex, Indicator, Menu } from '@mantine/core'
import { IconAlertCircle, IconBell, IconFlag } from '@tabler/icons'
import { Link } from '@inertiajs/inertia-react'
import { route } from '../../scripts/helpers'

import React, { HTMLAttributes } from 'react'
import { ApplicationProps } from '../../scripts/types'

interface HeaderNotificationsProps extends React.PropsWithChildren {}

const HeaderNotifications: React.FC<HeaderNotificationsProps> = ({
  ...props
}) => {
  const { notifications } = usePage<Page<ApplicationProps>>().props

  const totalNotifications =
    notifications.invalidScopes + notifications.invalidTokens

  const hasNotifications = totalNotifications > 0

  if (!hasNotifications) return null

  return (
    <Menu shadow="md" withArrow position="bottom-end">
      <Menu.Target>
        <Indicator color="red">
          <ActionIcon>
            <IconBell />
          </ActionIcon>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        {notifications.invalidScopes > 0 && (
          <Menu.Item component={Link} href={route('inertia.characters')}>
            <Flex align="center">
              <Box
                component={IconAlertCircle}
                size={16}
                color="red"
                sx={{ paddingRight: 5 }}
              />
              {notifications.invalidScopes} Invalid Scopes
            </Flex>
          </Menu.Item>
        )}
        {notifications.invalidTokens > 0 && (
          <Menu.Item component={Link} href={route('inertia.characters')}>
            <Flex align="center">
              <Box
                component={IconFlag}
                size={16}
                color="yellow"
                sx={{ paddingRight: 5 }}
              />
              {notifications.invalidTokens} Invalid Tokens
            </Flex>
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
export default HeaderNotifications
