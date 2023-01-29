import { Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Group, UnstyledButton, Text, createStyles } from '@mantine/core'
import React, { HTMLAttributes, useState } from 'react'
import { ApplicationProps } from '../../../scripts/types'
import EveAvatar from '../EveImage/EveAvatar'
import { IconChevronRight } from '@tabler/icons'
import { useApplicationState } from '../../../scripts/Stores/ApplicationState'

interface NavUserButtonProps extends React.PropsWithChildren {}

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme == 'light' ? theme.black : theme.white,
  },
  subtitle: {
    color:
      theme.colorScheme == 'light'
        ? theme.fn.lighten(theme.colors.light[8], 0.1)
        : theme.white,
  },
}))

const NavUserButton: React.FC<NavUserButtonProps> = (props) => {
  //const {auth} = usePage<Page<ApplicationProps>>().props;
  const mainCharacter = useApplicationState(
    (state) => state.mainToken?.character
  )
  const { classes } = useStyles()

  if (mainCharacter == null) {
    return null
  }

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
      })}
    >
      <Group>
        <EveAvatar
          sx={{ outline: 1, outlineStyle: 'solid', outlineColor: 'gray' }}
          radius="xl"
          size={45}
          id={mainCharacter.character_id}
          category="characters"
        />
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500} className={classes.title}>
            {mainCharacter.name}
          </Text>
          <Text color="dimmed" size="xs" className={classes.subtitle}>
            {mainCharacter.corporation?.name ?? 'pending'}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  )
}
export default NavUserButton
