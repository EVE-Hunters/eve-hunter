import { Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import React, { HTMLAttributes } from 'react'
import { ApplicationProps, MessageColors } from '../../scripts/types'

interface MessageDisplayProps extends React.PropsWithChildren {}

const AlertColors: MessageColors = {
  error: 'red',
  success: 'green',
  warning: 'yellow',
  info: 'cyan',
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ ...props }) => {
  const { flash, messages } = usePage<Page<ApplicationProps>>().props

  return <></>
}
export default MessageDisplay
