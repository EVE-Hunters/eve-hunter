import { Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Box, Flex, Group, Sx, Text } from '@mantine/core'
import UserFacade from 'pusher-js/types/src/core/user'
import React, { HTMLAttributes } from 'react'
import { isError } from 'underscore'
import { theme } from '../../../../scripts/theme'
import { ApplicationProps, ChannelMember } from '../../../../scripts/types'

interface MessageProps extends React.PropsWithChildren {
  user: ChannelMember
  message?: React.ReactElement
  datetime: string
  alert?: boolean
}

const Message: React.FC<MessageProps> = ({ alert = false, ...props }) => {
  const { auth } = usePage<Page<ApplicationProps>>().props
  const isAuthedMessage = auth.user?.id == props.user.id
  return (
    <Flex
      align="flex-start"
      direction="column"
      justify={isAuthedMessage ? 'end' : 'start'}
    >
      <Text
        size="xs"
        sx={{
          paddingLeft: 15,
          marginLeft: isAuthedMessage ? 'auto' : 'inherit',
        }}
        span
      >
        {isAuthedMessage ? 'You' : props.user.name}
      </Text>
      <Flex
        sx={(theme) => ({
          borderRadius: 15,
          backgroundColor: alert
            ? theme.colors.orange[9]
            : isAuthedMessage
            ? theme.colors.blue[8]
            : theme.colors.cyan[9],
          color: 'white',
          paddingTop: 3,
          paddingBottom: 3,
          paddingLeft: 15,
          paddingRight: 15,
          flexShrink: 1,
          marginLeft: isAuthedMessage ? 'auto' : 'inherit',
        })}
      >
        {props.message ?? props.children}
      </Flex>
    </Flex>
  )
}
export default Message
