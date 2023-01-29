import create from 'zustand'
import { Node } from 'ngraph.graph'
import {
  Connection,
  SolarSystem,
  HunterLocations,
  CharacterLocation,
  MapStatisticTypes,
} from '../types'

interface MapStore {
  systems: SolarSystem[]
  connections: Connection[]

  updateMap: (systems: SolarSystem[], connections: Connection[]) => void

  hunterLocations: HunterLocations
  updateCharacterLocation: (locaiton: CharacterLocation) => void

  activeStatistic: MapStatisticTypes
  setActiveStatistic: (type: MapStatisticTypes) => void

  showRangeSphere: boolean
  toggleRangeSphere: () => void

  highlightedSystem: number | null
  setHighlightedSystem: (id: number | null) => void

  highlightedRoute: Node<any>[] | null
  setHighlightedRoute: (route: Node<any>[] | null) => void
}

export const useMapStore = create<MapStore>((set, get) => ({
  systems: [],
  connections: [],

  updateMap: (systems, connections) => set(() => ({ systems, connections })),

  hunterLocations: {},

  updateCharacterLocation: (newLocation) => {
    let currentLocations = get().hunterLocations
    let current_system_id: string | null = null

    Object.keys(currentLocations).every((key) => {
      if (
        currentLocations[key].findIndex(
          (char) => char.character_id == newLocation.character.character_id
        ) >= 0
      ) {
        current_system_id = key
        return false
      }
      return true
    })
    if (current_system_id != null) {
      if (current_system_id == newLocation.system_id) {
        return
      } else {
        let index = currentLocations[current_system_id].findIndex(
          (char) => (char.character_id = newLocation.character.character_id)
        )
        currentLocations[current_system_id].splice(index, 1)
        if (currentLocations[current_system_id].length == 0) {
          delete currentLocations[current_system_id]
        }
      }
    }

    if (!currentLocations[newLocation.system_id]) {
      currentLocations[newLocation.system_id] = []
    }
    currentLocations[newLocation.system_id] = [
      ...currentLocations[newLocation.system_id],
      newLocation.character,
    ]

    return set({ hunterLocations: currentLocations })
  },

  activeStatistic: 'npc1h',
  setActiveStatistic: (type: MapStatisticTypes) =>
    set(() => ({ activeStatistic: type })),

  showRangeSphere: true,
  toggleRangeSphere: () =>
    set((state) => ({ showRangeSphere: !state.showRangeSphere })),

  highlightedSystem: null,
  setHighlightedSystem: (id) => set(() => ({ highlightedSystem: id })),

  highlightedRoute: null,
  setHighlightedRoute: (route) => set((state) => ({ highlightedRoute: route })),
}))
