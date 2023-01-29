import {
  ActionIcon,
  Box,
  Button,
  Card,
  createStyles,
  Flex,
  Group,
  Menu,
  Modal,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'
import React, { HTMLAttributes, useState } from 'react'
import { RefreshToken } from '../../../scripts/types'
import EveAvatar from '../EveImage/EveAvatar'
import { IconAlertCircle, IconAlertTriangle, IconMenu } from '@tabler/icons'
import axios from 'axios'
import { showNotification } from '@mantine/notifications'
import { off } from 'process'
import { useApplicationState } from '../../../scripts/Stores/ApplicationState'
import { ThemeContext } from '@emotion/react'

interface CharacterItemProps extends React.PropsWithChildren {
  token: RefreshToken
  requiredScopes: string[]
  onDeleted?: () => void
  noActions?: boolean
}

const useStyles = createStyles((theme) => ({
  button: {
    // backgroundColor:
    //   theme.colorScheme == 'light' ? theme.white : theme.colors.gray[8],
    padding: 10,
    borderRadius: 5,
  },
}))

const CharacterItem: React.FC<CharacterItemProps> = ({
  token,
  requiredScopes,
  noActions = false,
  ...props
}) => {
  const { classes } = useStyles()

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)

  const setMainToken = useApplicationState((state) => state.setMainToken)

  const scopesValid =
    requiredScopes.filter((value) => token.scopes.includes(value)).length ==
    requiredScopes.length

  const resetDeleting = () => {
    setDeleting(false)
    setConfirmDeleteOpen(false)
  }

  const setMainCharacterRequest = async () => {
    const response = await axios.put(`/api/character/${token.character_id}`)

    if (response.status == 200) {
      showNotification({
        message: response.data.message,
        color: 'green',
      })
      setMainToken(token)
    }
  }

  const deleteCharacter = async () => {
    setDeleting(true)
    const response = await axios.delete(`/api/character/${token.character_id}`)

    if (response.status == 200) {
      setDeleting(false)
      setConfirmDeleteOpen(false)
      showNotification({
        message: response.data.message,
        color: 'green',
      })
      props.onDeleted && props.onDeleted()
    } else {
      showNotification({
        message: response.statusText,
        color: 'red',
      })
    }
  }

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={confirmDeleteOpen}
        onClose={() => resetDeleting()}
        title="Are you sure?"
      >
        <Text>Are you use you want to delete {token.character.name}</Text>
        <Flex justify="space-between" sx={{ marginTop: 20 }}>
          <Button onClick={() => resetDeleting()} variant="subtle">
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => deleteCharacter()}
            loading={deleting}
          >
            Yes, Delete
          </Button>
        </Flex>
      </Modal>

      <Card shadow="sm" withBorder>
        <Card.Section>
          <Flex justify="space-between" className={classes.button}>
            <Group>
              <EveAvatar
                radius="xl"
                imageSize={64}
                size={48}
                id={token.character_id}
                category="characters"
              />
              <Stack spacing={0}>
                <Text>{token.character.name}</Text>
                <Text size="sm" color="dimmed">
                  {token.character.corporation?.name ?? 'Corp Pending'}
                  {token.character.alliance &&
                    ` / ${token.character.alliance.name}`}
                </Text>
              </Stack>
            </Group>
            <Group>
              {!scopesValid && token.deleted_at == null && (
                <Tooltip
                  multiline
                  width={300}
                  label="Tokens scopes differ from app requirements. Please re-auth this character"
                  withArrow
                  withinPortal
                >
                  <ActionIcon>
                    <Box
                      component={IconAlertCircle}
                      size={32}
                      sx={(theme) => ({
                        color:
                          theme.colorScheme == 'dark'
                            ? theme.colors.yellow[5]
                            : theme.colors.yellow[9],
                      })}
                    />
                  </ActionIcon>
                </Tooltip>
              )}
              {token.deleted_at != null && (
                <Tooltip
                  width={300}
                  multiline
                  label="This token is invalid. Please re-auth character"
                  withArrow
                  withinPortal
                >
                  <ActionIcon>
                    <Box
                      component={IconAlertTriangle}
                      size={32}
                      sx={(theme) => ({
                        color:
                          theme.colorScheme == 'dark'
                            ? theme.colors.red[5]
                            : theme.colors.red[9],
                      })}
                    />
                  </ActionIcon>
                </Tooltip>
              )}
              {!noActions && (
                <Menu
                  shadow="md"
                  width={200}
                  position="right-start"
                  withinPortal
                >
                  <Menu.Target>
                    <ActionIcon>
                      <IconMenu size={32} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Character Menu</Menu.Label>

                    <Menu.Item
                      color="red"
                      onClick={() => setConfirmDeleteOpen(true)}
                    >
                      Delete Character
                    </Menu.Item>
                    <Menu.Item
                      disabled={token.deleted_at != null || !scopesValid}
                      onClick={() => setMainCharacterRequest()}
                    >
                      Make Main
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>
          </Flex>
        </Card.Section>
      </Card>
    </>
  )
}
export default CharacterItem
