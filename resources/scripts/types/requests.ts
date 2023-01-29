import { Channel, EsiSearchResults } from './models'

export interface AddChannelRequest {
  channel: {
    name: string
    staging_system_id: number
  }

  access: EsiSearchResults[]
}

export interface EditChannelRequest {
  channel: Channel
  access: EsiSearchResults[]
}

export interface CharacterLocationResponse {
  solar_system_id: number
  station_id?: number
  structure_id?: number
}

export type CharacterLocationUpdate = {
  system_id: number
  character_id: number
}

export type CharacterLocationsResponse = {
  system_id: number
  character_id: number
}[]
