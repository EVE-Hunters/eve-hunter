import { Sx, Text } from '@mantine/core'
import React from 'react'
import { useHuntingStore } from '../../../../scripts/Stores'
import { CynoRequest, DestinationMessage } from '../../../../scripts/types'
import { useEsiRequests } from '../../../hooks'
import Message from './Message'

interface SystemDestinationMessageProps extends React.PropsWithChildren {
  message: CynoRequest | DestinationMessage
  prefixMessage: string
  messageSx?: Sx
}

const SystemDestinationMessage: React.FC<SystemDestinationMessageProps> = ({
  message,
  messageSx = {},
  ...props
}) => {
  const { esiSetDestination } = useEsiRequests()

  const hunters = useHuntingStore((state) => state.hunters)
  return (
    <Message user={message.user} datetime={message.datetime} alert>
      <Text>
        {props.prefixMessage}{' '}
        <Text
          c="blue.7"
          sx={{
            cursor: 'pointer',
            fontWeight: 'bolder',
            '&:hover': {
              fontWeight: 'bold',
              textDecoration: 'underline',
            },
          }}
          span
          onClick={() => {
            esiSetDestination(hunters, message.system.system_id).then(
              (response) => {}
            )
          }}
        >
          {message.system.name}
        </Text>
      </Text>
    </Message>
  )
}
export default SystemDestinationMessage
