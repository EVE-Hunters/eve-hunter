import { ActionIcon, Card, Flex, Stack, Text } from '@mantine/core'
import { IconEdit } from '@tabler/icons'
import React, { HTMLAttributes } from 'react'
import { Channel } from '../../../scripts/types'
import { Link } from '@inertiajs/inertia-react'
import { route } from '../../../scripts/helpers'

interface ChannelListItemProps extends React.PropsWithChildren {
  channel: Channel
  editable?: boolean
}

const ChannelListItem: React.FC<ChannelListItemProps> = ({
  editable = false,
  ...props
}) => {
  return (
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
          <ActionIcon
            color="primary"
            component={Link}
            href={route('inertia.channel.edit', { channel: props.channel.id })}
          >
            <IconEdit />
          </ActionIcon>
        )}
      </Flex>
    </Card>
  )
}
export default ChannelListItem
