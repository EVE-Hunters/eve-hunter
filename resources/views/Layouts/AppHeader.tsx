import React from 'react'
import {
  ActionIcon,
  Burger,
  Button,
  createStyles,
  Flex,
  Group,
  Header,
  NavLink,
  Title,
  useMantineColorScheme,
} from '@mantine/core'
import { usePage } from '@inertiajs/inertia-react'
import { ApplicationProps } from '../../scripts/types'
import { Page } from '@inertiajs/inertia'
import { IconMoon, IconSun } from '@tabler/icons'
import HeaderNotifications from './HeaderNotifications'
import { useApplicationState } from '../../scripts/Stores/ApplicationState'
import { useHeaderSytles } from './styles'

interface AppHeaderProps extends React.PropsWithChildren {
  extended?: boolean
}

const AppHeader: React.FC<AppHeaderProps> = ({
  extended = false,
  ...props
}) => {
  const { appSettings, auth, notifications } =
    usePage<Page<ApplicationProps>>().props
  const app = useApplicationState()
  const { toggleColorScheme, colorScheme } = useMantineColorScheme()
  const { classes } = useHeaderSytles()

  const isLight = colorScheme == 'light'

  return (
    <>
      <Header height={extended ? 100 : 50} className={classes.header}>
        <Flex
          className={classes.headerInner}
          mih={50}
          justify="space-between"
          align="center"
        >
          <Flex>
            {auth.isAuthed && (
              <Burger opened={false} onClick={() => app.toggleNav()} />
            )}
            <Title order={3}>{appSettings.name}</Title>
          </Flex>
          <Group spacing={10}>
            <HeaderNotifications />
            <ActionIcon variant="outline" onClick={() => toggleColorScheme()}>
              {isLight ? <IconMoon size={16} /> : <IconSun size={16} />}
            </ActionIcon>
            {auth.isAuthed ? (
              auth.user?.name
            ) : (
              <Button component="a" size="xs" href="/auth/eveonline/redirect">
                Login
              </Button>
            )}
          </Group>
        </Flex>
        {extended ? <div id="page-controls"></div> : null}
      </Header>
    </>
  )
}
export default AppHeader
