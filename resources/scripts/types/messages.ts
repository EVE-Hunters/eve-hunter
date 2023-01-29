import { ChannelMember, Character, SolarSystem, User } from './models'

export interface LocationUpdate {
  character: Pick<Character, 'character_id' | 'name'>
  system_id: number
}

export interface BatchLocationUpdate {
  data: LocationUpdate[]
}

export interface ChatMessage extends MessageBase {
  message: string
}

export interface MessageBase {
  id: number
  user: ChannelMember
  datetime: string
}

export interface ChannelMessage extends MessageBase {
  type: 'Message'
  message: string
}

export interface DestinationMessage extends MessageBase {
  type: 'DestinationSet'
  system: Pick<SolarSystem, 'system_id' | 'name'>
}

export interface CynoRequest extends MessageBase {
  type: 'CynoRequest'
  system: Pick<SolarSystem, 'system_id' | 'name'>
}

export interface PresenceMessage extends MessageBase {
  type: 'Presence'
  joined: boolean
}

export type Message =
  | ChannelMessage
  | DestinationMessage
  | PresenceMessage
  | CynoRequest
