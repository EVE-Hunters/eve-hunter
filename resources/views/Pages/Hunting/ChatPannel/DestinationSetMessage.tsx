import { Text } from '@mantine/core'
import UserFacade from 'pusher-js/types/src/core/user'
import React, { HTMLAttributes } from 'react'
import { useHuntingStore, useSdeStore } from '../../../../scripts/Stores'
import { DestinationMessage } from '../../../../scripts/types'
import { useEsiRequests } from '../../../hooks'
import Message from './Message'

interface DestinationSetMessageProps extends React.PropsWithChildren {
  message: DestinationMessage
}

const DestinationSetMessage: React.FC<DestinationSetMessageProps> = ({
  message,
  ...props
}) => {
  const SolarSystems = useSdeStore((state) => state.SolarSystems)
  //   const system = SolarSystems.find((x) => x.system_id == message.system_id)
  const hunters = useHuntingStore((state) => state.hunters)
  const { esiSetDestination } = useEsiRequests()

  return (
    <Message user={message.user} datetime={message.datetime}>
      <Text>
        I am heading to{' '}
        <Text
          span
          c="orange"
          sx={{
            '& :hover': {
              textDecoration: 'underscore',
            },
          }}
          onClick={() => esiSetDestination(hunters, message.system.system_id)}
        >
          {message.system.name}
        </Text>
      </Text>
    </Message>
  )
}
export default DestinationSetMessage
