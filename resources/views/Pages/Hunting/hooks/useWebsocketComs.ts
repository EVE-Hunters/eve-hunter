import Echo from 'laravel-echo'
import { useEffect, useRef } from 'react'
import Pusher from 'pusher-js'
import { useChannelStore, useMapStore } from '../../../../scripts/Stores'
import {
  BatchLocationUpdate,
  ChannelMember,
  ChannelMessage,
  CynoRequest,
  DestinationMessage,
  LocationUpdate,
} from '../../../../scripts/types'
import { EchoSettings } from '../../../../scripts/config'
import dayjs from '../../../../scripts/dayjs'
window.Pusher = Pusher

declare global {
  interface Window {
    Pusher: any
  }
}

export const useWebsocketComs = () => {
  const websocketRef = useRef<Echo>()
  const channels = useChannelStore((state) => state.channels)
  const activeChannel = useChannelStore((state) => state.activeChannel)
  const setMembers = useChannelStore((state) => state.setMembers)
  const addActiveMember = useChannelStore((state) => state.addActiveMember)
  const addMember = useChannelStore((state) => state.addMember)
  const addMessage = useChannelStore((state) => state.addMessage)
  const removeActiveMember = useChannelStore(
    (state) => state.removeActiveMember
  )
  const activeMembers = useChannelStore((state) => state.activeMembers)
  const setActiveMembers = useChannelStore((state) => state.setActiveMembers)

  const messageId = useRef<number>(0)

  const members = useChannelStore((state) => state.members)
  const hunterLocations = useMapStore((state) => state.hunterLocations)
  const updateCharacterLocation = useMapStore(
    (state) => state.updateCharacterLocation
  )

  useEffect(() => {
    websocketRef.current
      ?.join(`hunters.${activeChannel}`)
      .here((users: ChannelMember[]) => {
        setMembers(users)
        setActiveMembers(users.map((x) => x.id))
      })
      .joining((user: ChannelMember) => {
        addMember(user)
        addActiveMember(user.id)
        messageId.current++
        addMessage({
          id: messageId.current,
          type: 'Presence',
          user: user,
          datetime: dayjs.utc().format('YYYY-MM-DD HH:mm:ss'),
          joined: true,
        })
      })
      .leaving((user: ChannelMember) => {
        removeActiveMember(user.id)
        messageId.current++
        addMessage({
          id: messageId.current,
          type: 'Presence',
          user: user,
          datetime: dayjs.utc().format('YYYY-MM-DD HH:mm:ss'),
          joined: false,
        })
      })
      .listen('.destination.set', (msg: DestinationMessage) => {
        messageId.current++
        addMessage({
          ...msg,
          id: messageId.current,
          type: 'DestinationSet',
        })
        console.log(msg)
      })
      .listen('.request-cyno', (msg: CynoRequest) => {
        messageId.current++
        addMessage({
          ...msg,
          id: messageId.current,
          type: 'CynoRequest',
        })
      })
      .listen('.user-message', (msg: ChannelMessage) => {
        messageId.current++
        addMessage({
          ...msg,
          id: messageId.current,
          type: 'Message',
        })
      })
      .listen('.location.batch.update', (msg: BatchLocationUpdate) => {
        msg.data.forEach((location) => {
          updateCharacterLocation(location)
        })
      })
      .listen('.location.update', (msg: LocationUpdate) => {
        updateCharacterLocation(msg)
      })

      .error((response) => {
        console.log(response)
      })

    return () => {
      websocketRef.current?.leave(`hunters.${activeChannel}`)
    }
  }, [activeChannel, websocketRef.current])

  useEffect(() => {
    websocketRef.current = new Echo(EchoSettings)

    return () => {
      websocketRef.current?.disconnect()
    }
  }, [])
}
