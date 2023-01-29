import create from 'zustand'
import { Character, RefreshToken } from '../types'

interface IApplicationStore {
  navOpen: boolean
  toggleNav: () => void
  setNavOpen: (val: boolean) => void

  mainToken: RefreshToken | null
  setMainToken: (token: RefreshToken | null) => void
}

export const useApplicationState = create<IApplicationStore>((set) => ({
  mainToken: null,
  setMainToken: (token) => set(() => ({ mainToken: token })),

  navOpen: true,
  toggleNav: () => set((state) => ({ navOpen: !state.navOpen })),
  setNavOpen: (val) =>
    set(() => ({
      navOpen: val,
    })),
}))
