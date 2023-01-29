import { Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Stack, Text } from '@mantine/core'
import React, { HTMLAttributes } from 'react'
import {
  useApplicationState,
  useChannelStore,
} from '../../../../scripts/Stores'
import { ApplicationProps } from '../../../../scripts/types'
import DestinationSetMessage from './DestinationSetMessage'
import Message from './Message'
import PresenceMessage from './PresenceMessage'
import SystemDestinationMessage from './SystemDestinationMessage'

interface ChatdisplayProps extends React.PropsWithChildren {}

const Chatdisplay: React.FC<ChatdisplayProps> = ({ ...props }) => {
  const { auth } = usePage<Page<ApplicationProps>>().props
  const messages = useChannelStore((state) => state.messages)
  const settings = useChannelStore((state) => state.settings)
  const following = useChannelStore((state) => state.following)

  const displayMessages = messages
    .filter(
      (x) =>
        (settings.cyno && x.type == 'CynoRequest') ||
        (settings.destination && x.type == 'DestinationSet') ||
        (settings.presence && x.type == 'Presence') ||
        (settings.user && x.type == 'Message')
    )
    .filter((x) =>
      following.length == 0
        ? true
        : following.includes(x.user.id) || x.id == auth.user?.id
    )

  return (
    <Stack spacing={0} sx={{ padding: 10, gap: 10, width: '100%' }}>
      {displayMessages.map((message, index) => {
        if (message.type == 'Message') {
          return (
            <Message
              key={message.id}
              user={message.user}
              message={<Text>{message.message}</Text>}
              datetime={message.datetime}
            />
          )
        }

        if (message.type == 'DestinationSet') {
          return (
            <SystemDestinationMessage
              prefixMessage="I am heading to "
              message={message}
            />
          )
        }

        if (message.type == 'Presence') {
          return <PresenceMessage key={message.id} message={message} />
        }

        if (message.type == 'CynoRequest') {
          return (
            <SystemDestinationMessage
              prefixMessage="I need a cyno at: "
              message={message}
              messageSx={{
                backgroundColor: 'red.7',
                color: 'white',
              }}
            />
          )
        }

        return null
      })}
    </Stack>
  )
}
export default Chatdisplay
