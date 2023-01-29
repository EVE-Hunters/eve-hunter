import axios from 'axios'
import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { route } from '../helpers'
import {
  CharacterLocation,
  CharacterLocationUpdate,
  MapStatisticTypes,
  SolarSystem,
} from '../types'

type CurrentLocations = {
  character_id: number
  system_id: number
}

interface HunterStore {
  returnSystemId: number | null
  setReturnSystemId: (id: number | null) => void

  //Hunting System
  huntingSystemId: number | null
  setHuntingSystemId: (id: number | null) => void

  //Hunting Range
  huntingRange: number
  setHuntingRange: (id: number) => void

  primaryHunter: number | null
  setPrimaryHunter: (id: number | null) => void

  hunters: number[]
  setHunters: (id: number[]) => void

  init: (hunters: number[], primaryHunter: number) => void

  currentLocations: CurrentLocations[]
  setLocation: (characterId: number, locationId: number) => void
  setLocationBatch: (locations: CharacterLocationUpdate[]) => void

  tracking: boolean
  toggleTracking: () => void

  panelFilter: {
    type: MapStatisticTypes | null
    value: number
  }

  updatePanelFilter: (key: MapStatisticTypes | null, value: number) => void
}

const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log(' appliying', args)
      set(...args)
      console.log('new state', get())
    },
    get,
    api
  )

export const useHuntingStore = create<HunterStore>((set, get) => ({
  returnSystemId: null,
  setReturnSystemId: (id) => set({ returnSystemId: id }),

  huntingSystemId: null,
  setHuntingSystemId: (id) => set({ huntingSystemId: id }),

  huntingRange: 5,
  setHuntingRange: (id: number) => set({ huntingRange: id }),

  primaryHunter: null,
  setPrimaryHunter: async (id) => {
    if (id != null) {
      const response = await axios.post(
        route('account.hunter.primary', { character: id })
      )
      if (response.status == 200) {
        set(() => ({ primaryHunter: id }))
      }
    }
  },

  hunters: [],
  setHunters: async (id) => {
    const response = await axios.post(route('account.hunters.set'), {
      character_id: id,
    })
    if (response.status == 200) {
      set(() => ({ hunters: id }))
    }
  },

  init: (hunters, primaryHunter) => set(() => ({ hunters, primaryHunter })),

  currentLocations: [],

  setLocation: (characterId, locationId) => {
    set((state) => ({
      currentLocations: [
        ...state.currentLocations.filter((x) => x.character_id != characterId),
        {
          character_id: characterId,
          system_id: locationId,
        },
      ],
    }))
  },

  setLocationBatch: (locations) => set(() => ({ currentLocations: locations })),

  tracking: false,
  toggleTracking: () => set((state) => ({ tracking: !state.tracking })),

  panelFilter: {
    type: null,
    value: 0,
  },

  updatePanelFilter: (type, value) =>
    set(() => ({
      panelFilter: {
        type,
        value,
      },
    })),
}))
