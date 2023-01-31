import { Box, TextInput } from '@mantine/core'
import { IconSend } from '@tabler/icons'
import React, { HTMLAttributes, useState } from 'react'
import { useBroadcasting } from '../../../hooks'

interface ChatInputProps extends React.PropsWithChildren {}

const ChatInput: React.FC<ChatInputProps> = ({ ...props }) => {
  const [message, setMessage] = useState<string>('')

  const { broadcastMessage } = useBroadcasting()

  const sendMessage = () => {
    if (message.trim().length != 0) {
      broadcastMessage(message)
      setMessage('')
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage()
  }

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ position: 'absolute', bottom: 0, width: '100%' }}
    >
      <TextInput
        radius="xs"
        max="255"
        autoComplete="off"
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        rightSection={
          <Box
            component={IconSend}
            color="blue"
            sx={{ transform: 'rotate(45deg)', cursor: 'pointer' }}
            onClick={() => sendMessage()}
          />
        }
      />
    </Box>
  )
}
export default ChatInput
