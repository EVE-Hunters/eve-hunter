import { ActionIcon, Tooltip } from '@mantine/core'
import { IconClearAll } from '@tabler/icons'
import React, { HTMLAttributes } from 'react'
import { useChannelStore } from '../../../../../scripts/Stores'

interface ClearChatProps extends React.PropsWithChildren {}

const ClearChat: React.FC<ClearChatProps> = ({ ...props }) => {
  const clearMessages = useChannelStore((state) => state.clearMessages)

  return (
    <Tooltip label="Clear chat">
      <ActionIcon
        size="sm"
        sx={(theme) => ({
          color: theme.white,
          '&:hover': {
            backgroundColor: 'transparent',
            color: theme.colors.gray[2],
          },
        })}
        onClick={() => clearMessages()}
      >
        <IconClearAll />
      </ActionIcon>
    </Tooltip>
  )
}
export default ClearChat
