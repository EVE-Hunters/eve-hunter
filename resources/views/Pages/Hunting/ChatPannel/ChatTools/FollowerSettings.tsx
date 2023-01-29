import {
  ActionIcon,
  Menu,
  Tooltip,
  Box,
  Checkbox,
  Text,
  TextInput,
} from '@mantine/core'
import { IconUsers } from '@tabler/icons'
import React, { HTMLAttributes, useState } from 'react'
import { useChannelStore } from '../../../../../scripts/Stores'

interface FollowerSettingsProps extends React.PropsWithChildren {}

const FollowerSettings: React.FC<FollowerSettingsProps> = ({ ...props }) => {
  const members = useChannelStore((state) => state.members)
  const activeMembers = useChannelStore((state) => state.activeMembers)
  const following = useChannelStore((state) => state.following)
  const setFollowing = useChannelStore((state) => state.setFollowing)

  const [search, setSearch] = useState<string>('')

  const toggleFollowing = (id: number) => {
    if (following.includes(id)) {
      setFollowing(following.filter((x) => x != id))
    } else {
      setFollowing([...following, id])
    }
  }

  const membersInChannel = members.filter((x) => activeMembers.includes(x.id))

  return (
    <Menu
      withinPortal
      withArrow
      position="right-start"
      closeOnItemClick={false}
      onClose={() => setSearch('')}
    >
      <Menu.Target>
        <Tooltip label="Filter by user">
          <ActionIcon
            size="sm"
            sx={(theme) => ({
              color: theme.white,
              width: 40,
              '&:hover': {
                backgroundColor: 'transparent',
                color: theme.colors.gray[2],
              },
            })}
          >
            <Box component={IconUsers} sx={{ marginRight: 5 }} />
            {members.length}
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          <Text sx={{ maxWidth: 200 }}>
            {' '}
            If any members are selected, only messages from them will be shown
          </Text>
        </Menu.Label>
        <TextInput
          placeholder="Search Name"
          value={search}
          size="xs"
          onChange={(e) => setSearch(e.target.value)}
        />
        {membersInChannel
          .filter(
            (x) =>
              search.length == 0 ||
              x.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
          .map((member) => (
            <Menu.Item
              key={member.id}
              onClick={() => toggleFollowing(member.id)}
              rightSection={
                <Checkbox
                  checked={following.includes(member.id)}
                  onChange={() => toggleFollowing(member.id)}
                />
              }
            >
              <Text sx={{ marginRight: 10 }}>{member.name}</Text>
            </Menu.Item>
          ))}
      </Menu.Dropdown>
    </Menu>
  )
}
export default FollowerSettings
