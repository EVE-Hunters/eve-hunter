import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Modal,
  Stack,
  Text,
} from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons'
import React, { HTMLAttributes } from 'react'
import { Channel } from '../../../scripts/types'
import { Link } from '@inertiajs/inertia-react'
import { route } from '../../../scripts/helpers'
import { useDisclosure } from '@mantine/hooks'
import axios from 'axios'
import { showNotification } from '@mantine/notifications'
import { Inertia } from '@inertiajs/inertia'

interface ChannelListItemProps extends React.PropsWithChildren {
  channel: Channel
  editable?: boolean
}

const ChannelListItem: React.FC<ChannelListItemProps> = ({
  editable = false,
  ...props
}) => {
  const [showDelete, handle] = useDisclosure(false)

  const handleDelete = () => {
    axios
      .delete(route('inertia.channel.delete', { channel: props.channel.id }))
      .then((response) => {
        showNotification({
          message: 'Channel has been deleted',
          color: 'green',
        })
        Inertia.visit(route('inertia.channels'), { replace: true })
      })
  }

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={showDelete}
        onClose={() => handle.close()}
        title="Are you sure?"
      >
        <Text>
          Are you use you want to delete the {props.channel.name} Channel?
        </Text>
        <Flex justify="space-between" sx={{ marginTop: 20 }}>
          <Button onClick={() => handle.close()} variant="subtle">
            Cancel
          </Button>
          <Button color="red" onClick={() => handleDelete()}>
            Yes, Delete
          </Button>
        </Flex>
      </Modal>
      <Card radius="sm" withBorder shadow="sm" p="sm">
        <Text weight={600}>{props.channel.name}</Text>
        <Flex justify="space-between" align="center">
          <Stack spacing={0}>
            <Text size="sm" color="dimmed">
              Staging from <strong>{props.channel.staging_system?.name}</strong>
            </Text>
            <Text size="sm" color="dimmed">
              Created By <strong>{props.channel.user?.name}</strong>
            </Text>
          </Stack>
          {editable && (
            <Flex>
              <ActionIcon color="red" onClick={() => handle.open()}>
                <IconTrash />
              </ActionIcon>
              <ActionIcon
                color="primary"
                component={Link}
                href={route('inertia.channel.edit', {
                  channel: props.channel.id,
                })}
              >
                <IconEdit />
              </ActionIcon>
            </Flex>
          )}
        </Flex>
      </Card>
    </>
  )
}
export default ChannelListItem
