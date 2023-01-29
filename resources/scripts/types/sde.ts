export type EveImageCategory =
  | 'characters'
  | 'corporations'
  | 'alliances'
  | 'factions'
  | 'types'
  | 'render'
export type EveImageSize = 32 | 64 | 128 | 256 | 512 | 1024
export type EveImageVariant =
  | 'portrait'
  | 'logo'
  | 'render'
  | 'icon'
  | 'bp'
  | 'bpc'

export type SdeItemCategories =
  | 'alliance'
  | 'character'
  | 'constellation'
  | 'corporation'
  | 'inventory_type'
  | 'region'
  | 'solar_system'
  | 'station'
  | 'faction'

export type UniverseName = {
  category: SdeItemCategories
  id: number
  name: string
}

export type EveSdeImageTranslation = {
  [key in SdeItemCategories]?: EveImageCategory
}
