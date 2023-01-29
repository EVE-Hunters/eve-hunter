export interface EntityName {
  entity_id: number
  name: string
  category: string
}

export interface Alliance extends EntityName {}

export interface Corporation extends EntityName {}

export interface Character {
  character_id: number
  name: string
  corporation?: Corporation
  alliance?: Alliance
}

export interface ChannelModel {
  id: number
  name: string
  staging_system_id: number
  hunting_system_id?: number
  access: []
  user_id: number
}

export interface Channel extends ChannelModel {
  user?: User
  staging_system?: SolarSystem | null
  hunting_system?: SolarSystem | null
}

export interface User {
  id: number
  name: string
  current_channel?: Channel
  main_refresh_token: RefreshToken
  primary_hunter: number
}

export interface RefreshToken {
  character_id: number
  user_id: number
  scopes: string[]
  deleted_at: string | null
  character: Character
  refresh_token: string
  token: string
  expires_on: string
}

export interface Region {
  name: string
  region_id: number
}

export interface Constellation {
  name: string
  region_id: number
  conestellation_id: number
}

export interface SolarSystem {
  system_id: number
  region_id: number
  conestellation_id: number
  name: string
  ice: boolean
  isWormhole: boolean
  security: number
  constellation: Constellation
  region: Region
  x: number
  y: number
  z: number
  gates?: Stargate[]
  connections?: SolarSystem[]
  distance?: number
  jumps?: number
}

export interface Connection {
  system1: SolarSystem
  system2: SolarSystem
  jumps: number
}

export interface Stargate {
  fromSolarSystemID: number
  toSolarSystemID: number
}

export interface SdeVersion {
  version: string
  sde: string
  updated_at: string
}

export interface EsiSearchResults {
  entity_id: number
  type: 'character' | 'corporation' | 'alliance'
  name: string
  corporation_id?: number
  alliance_id?: number
  corporation?: Corporation
  alliance?: Alliance
}

export interface HunterLocations {
  [index: number]: Character[]
}

export interface CharacterLocation {
  character: Pick<Character, 'character_id' | 'name'>
  system_id: number
}

export interface ChannelMember {
  id: number
  name: string
}
