import axios from 'axios'
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { route } from '../../../scripts/helpers'
import { Channel, ChannelMember } from '../../../scripts/types'

interface ChannelProviderProps extends React.PropsWithChildren {}

const BroadcastContext = React.createContext<{
  destinationSet: (system_id: number) => void
} | null>(null)

const BroadcastProvider: React.FC<ChannelProviderProps> = ({ ...props }) => {
  const communicateLocation = (character_id: number, location_id: number) => {
    console.log('I am at:', location_id)
  }

  const destinationSet = (location_id: number) => {}

  return (
    <BroadcastContext.Provider
      value={{
        destinationSet,
      }}
    >
      {props.children}
    </BroadcastContext.Provider>
  )
}

export const useChannels = () => {
  const context = React.useContext(BroadcastContext)
  if (context == null) {
    throw new Error(
      'This hook must be used within the channel provider context'
    )
  }
  return context
}

export default BroadcastProvider
