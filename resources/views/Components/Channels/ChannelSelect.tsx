import { Menu, Button, Input, Box, Group, Text, Flex } from '@mantine/core'
import { IconCheck } from '@tabler/icons'

import React, { HTMLAttributes, useState } from 'react'
import { Channel } from '../../../scripts/types'

interface ChannelSelectProps {
  items: Channel[]
  selected?: number
  onChange?: (id: number) => void
}

const ChannelSelect: React.FC<ChannelSelectProps> = ({
  items,
  selected,
  onChange,
}) => {
  const [search, setSearch] = useState<string>('')

  const filteredChannels = items.filter((x) => {
    return x.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  })

  const selectedChannel = items.find((x) => x.id == selected)

  return (
    <Menu position="bottom-start" withArrow>
      <Menu.Target>
        <Button>Change Channel</Button>
      </Menu.Target>

      <Menu.Dropdown sx={{ zIndex: 101 }}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <Box sx={{ marginTop: 5 }}>
          {filteredChannels.map((channel) => (
            <Menu.Item
              key={channel.id}
              icon={selected == channel.id ? <IconCheck size={14} /> : null}
              onClick={() => {
                onChange && onChange(channel.id)
                setSearch('')
              }}
            >
              <Flex justify="space-between">
                <span>{channel.name}</span>
                <Text component="span" size="xs" c="dimmed">
                  ({channel.user?.name})
                </Text>
              </Flex>
            </Menu.Item>
          ))}
        </Box>
      </Menu.Dropdown>
    </Menu>
  )
}
export default ChannelSelect
