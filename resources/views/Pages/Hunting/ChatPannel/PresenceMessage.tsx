import { Text } from '@mantine/core'
import React, { HTMLAttributes } from 'react'
import { PresenceMessage as PresanceMsg } from '../../../../scripts/types'

interface PresenceMessageProps extends React.PropsWithChildren {
  message: PresanceMsg
}

const PresenceMessage: React.FC<PresenceMessageProps> = ({
  message,
  ...props
}) => {
  return (
    <Text size="xs" sx={{ paddingLeft: 15 }}>
      {message.user.name} has {message.joined ? 'joined' : 'left'} the channel
    </Text>
  )
}
export default PresenceMessage
