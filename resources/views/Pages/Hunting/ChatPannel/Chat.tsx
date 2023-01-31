import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Indicator,
  Menu,
  Space,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { IconBuildingLighthouse, IconSend, IconUsers } from '@tabler/icons'
import React, { HTMLAttributes, useEffect, useRef } from 'react'
import {
  useChannelStore,
  useHuntingStore,
  useTokenManager,
} from '../../../../scripts/Stores'
import Chatdisplay from './ChatDisplay'
import ChatInput from './ChatInput'
import ChatSettings from './ChatTools/ChatSettings'
import ClearChat from './ChatTools/ClearChat'
import FollowerSettings from './ChatTools/FollowerSettings'
import RequestCyno from './ChatTools/RequestCyno'
import Message from './Message'

interface ChatProps extends React.PropsWithChildren {
  height: number
}

const Chat: React.FC<ChatProps> = ({ ...props }) => {
  const members = useChannelStore((state) => state.members)

  const chatRef = useRef<HTMLDivElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleDomInserted = (event: Event) => {
      if (chatRef.current) {
        chatRef.current.scroll({
          behavior: 'smooth',
          top: chatRef.current.scrollHeight,
        })
      }
    }

    if (chatRef.current) {
      chatRef.current.addEventListener('DOMNodeInserted', handleDomInserted)
    }

    return () =>
      chatRef.current?.removeEventListener('DOMNodeInserted', handleDomInserted)
  }, [])

  return (
    <Flex direction="column" sx={{ height: props.height }}>
      <Box
        sx={(theme) => ({
          height: 40,
          backgroundColor:
            theme.colorScheme == 'dark'
              ? theme.colors.gray[7]
              : theme.colors.dark[4],
        })}
      >
        <Flex
          align="center"
          sx={{ height: 40, paddingLeft: 10, paddingRight: 10 }}
        >
          <RequestCyno />

          <Space sx={{ marginLeft: 'auto' }} />
          <ClearChat />
          <ChatSettings />
          <FollowerSettings />
        </Flex>
      </Box>

      <Box
        ref={chatRef}
        sx={(theme) => ({
          //flexGrow: 1,
          color: '',
          backgroundColor:
            theme.colorScheme == 'dark'
              ? theme.colors.gray[6]
              : theme.colors.gray[3],
          overflow: 'hidden',
          overflowY: 'scroll',
          paddingTop: 10,
          paddingRight: 10,
          paddingBottom: 10,
          marginBottom: 36,
          height: '100%',
        })}
      >
        <Chatdisplay />
      </Box>

      <ChatInput />
      <div ref={divRef} />
    </Flex>
  )
}
export default Chat
