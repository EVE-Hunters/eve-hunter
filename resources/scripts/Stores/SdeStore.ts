import { getRegisteredStyles } from '@emotion/utils'
import { useMantineColorScheme } from '@mantine/core'
import { useMantineProviderStyles } from '@mantine/styles/lib/theme/MantineProvider'
import axios from 'axios'
import create from 'zustand'
import { route } from '../helpers'
import { SdeVersion, SolarSystem, Stargate } from '../types'

interface SdeStore {
  loaded: boolean
  SolarSystems: SolarSystem[]
  Stargates: Stargate[]

  loadSde: (version: SdeVersion) => void
}

export const useSdeStore = create<SdeStore>((set) => ({
  loaded: false,
  SolarSystems: [],
  Stargates: [],

  loadSde: async (version) => {
    if ('caches' in window) {
      const universe = await caches.open('eve-universe')

      let current_version_response = await universe.match(route('sde.version'))

      if (current_version_response == undefined) {
        const sde = await universe.addAll([
          route('sde.version'),
          route('sde.systems'),
          route('sde.stargates'),
        ])
      }

      current_version_response = await universe.match(route('sde.version'))
      const current_version: SdeVersion = await current_version_response?.json()
      if (
        version.version !== current_version.version ||
        version.updated_at !== current_version.updated_at
      ) {
        universe.delete(route('sde.version'))
        universe.delete(route('sde.systems'))
        universe.delete(route('sde.stargates'))

        await universe.addAll([
          route('sde.version'),
          route('sde.systems'),
          route('sde.stargates'),
        ])
      }

      const SolarSystemResponse = await universe.match(route('sde.systems'))
      const StargatesResponse = await universe.match(route('sde.stargates'))

      const SolarSystems: SolarSystem[] =
        (await SolarSystemResponse?.json()) ?? []
      const Stargates: Stargate[] = (await StargatesResponse?.json()) ?? []

      set({
        SolarSystems,
        Stargates,
        loaded: true,
      })
    } else {
      const systemResp = await axios.get<SolarSystem[]>(route('sde.systems'))
      const gateResp = await axios.get<Stargate[]>(route('sde.stargates'))

      set({
        SolarSystems: systemResp.data,
        Stargates: gateResp.data,
        loaded: true,
      })
    }
  },
}))
