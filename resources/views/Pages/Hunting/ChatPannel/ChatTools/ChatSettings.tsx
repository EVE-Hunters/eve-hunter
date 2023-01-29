import { ActionIcon, Checkbox, Menu, Switch, Text } from '@mantine/core'
import { IconSettings } from '@tabler/icons'
import React, { HTMLAttributes } from 'react'
import { useChannelStore } from '../../../../../scripts/Stores'

interface ChatSettingsProps extends React.PropsWithChildren {}

const ChatSettings: React.FC<ChatSettingsProps> = ({ ...props }) => {
  const settings = useChannelStore((state) => state.settings)
  const updateSettings = useChannelStore((state) => state.updateChatSetting)

  return (
    <Menu withinPortal withArrow position="left-start" closeOnItemClick={false}>
      <Menu.Target>
        <ActionIcon
          sx={(theme) => ({
            color: theme.white,
            '&:hover': {
              backgroundColor: 'transparent',
              color: theme.colors.gray[2],
            },
          })}
        >
          <IconSettings />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Chat Filters</Menu.Label>
        <Menu.Item
          rightSection={
            <Checkbox
              checked={settings.presence}
              onChange={() => updateSettings('presence', !settings.presence)}
            />
          }
          onClick={() => updateSettings('presence', !settings.presence)}
        >
          <Text sx={{ marginRight: 10 }}>Presence Messages</Text>
        </Menu.Item>
        <Menu.Item
          rightSection={
            <Checkbox
              checked={settings.user}
              onChange={() => updateSettings('user', !settings.user)}
            />
          }
          onClick={() => updateSettings('user', !settings.user)}
        >
          <Text sx={{ marginRight: 10 }}> User Messages</Text>
        </Menu.Item>
        <Menu.Item
          rightSection={
            <Checkbox
              checked={settings.destination}
              onChange={() =>
                updateSettings('destination', !settings.destination)
              }
            />
          }
          onClick={() => updateSettings('destination', !settings.destination)}
        >
          <Text sx={{ marginRight: 10 }}>Destination Messages</Text>
        </Menu.Item>
        <Menu.Item
          rightSection={
            <Checkbox
              checked={settings.cyno}
              onChange={() => updateSettings('cyno', !settings.cyno)}
            />
          }
          onClick={() => updateSettings('cyno', !settings.cyno)}
        >
          <Text sx={{ marginRight: 10 }}>Cyno Requests</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
export default ChatSettings
