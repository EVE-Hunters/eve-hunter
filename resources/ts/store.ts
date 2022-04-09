import create from 'zustand'
import {MapRenderSettings, SolarSystemInterface} from "./interfaces/Map/MapInterfaces";

type MapSettingsStore = {
    showRangeSphere: boolean,

    toggleRangeSphere: () => void
}

export const useRangeSphereStore = create<MapSettingsStore>((set) => ({
    showRangeSphere: false,
    toggleRangeSphere: () => set((state: any) => ({showRangeSphere: !state.showRangeSphere}))
}))

type filterSetting = number | null
type filterSortValue =
    "jumps"
    | "npc_delta"
    | "kill_stats_latest.npc_kills"
    | "npc_24h"
    | "latest_system_jumps.ship_jumps"


interface MapSettings {
    showRangeSphere: boolean,
    jumpRange: number,
    maxSecurity: number
    focusedSystem: SolarSystemInterface | null,
    toggleRangeSphere: () => void
    setJumpRange: (range: number) => void,
    setMaxSecurity: (sec: number) => void,
    setFocusedSystem: (system: SolarSystemInterface | null) => void,

    systemInfo: MapRenderSettings

    toggleDelta: () => void
    toggleNpc1h: () => void
    toggleNpc24h: () => void
    toggleJumps: () => void
    toggleSecurity: () => void


    // filter settings
    minDelta: filterSetting,
    minNpc1h: filterSetting
    minNpc24h: filterSetting,
    sortBy: string,

    setMinDelta: (val: filterSetting) => void,
    setMinNpc1h: (val: filterSetting) => void,
    setMinNpc24h: (val: filterSetting) => void,
    setSortBy: (val: string) => void


}

export const useMapSettingsStore = create<MapSettings>((set) => ({
    showRangeSphere: true,
    jumpRange: 5,
    maxSecurity: 100,

    focusedSystem: null,


    toggleRangeSphere: () => set((state: any) => ({showRangeSphere: !state.showRangeSphere})),
    setJumpRange: (range) => set((state) => ({jumpRange: range})),
    setMaxSecurity: (sec) => set((state) => ({maxSecurity: sec})),
    setFocusedSystem: (system) => set((state) => ({focusedSystem: system})),

    //render settings
    systemInfo: {
        delta: true,
        npc1h: true,
        npc24h: true,
        jumps: false,
        security: false,
    },


    toggleDelta: () => set((state) => ({systemInfo: { ...state.systemInfo, delta: !state.systemInfo.delta}})),
    toggleNpc1h: () => set((state) => ({systemInfo: { ...state.systemInfo, npc1h: !state.systemInfo.npc1h}})),
    toggleNpc24h: () => set((state) => ({systemInfo: { ...state.systemInfo, npc24h: !state.systemInfo.npc24h}})),
    toggleJumps: () => set((state) => ({systemInfo: { ...state.systemInfo, jumps: !state.systemInfo.jumps}})),
    toggleSecurity: () => set((state) => ({systemInfo: { ...state.systemInfo, security: !state.systemInfo.security}})),

    //filter settings
    minDelta: null,
    minNpc1h: null,
    minNpc24h: null,
    sortBy: 'jumps',

    setMinDelta: (val: filterSetting) => set(() => ({minDelta: val})),
    setMinNpc1h: (val: filterSetting) => set(() => ({minNpc1h: val})),
    setMinNpc24h: (val: filterSetting) => set(() => ({minNpc24h: val})),
    setSortBy: (val: string) => set(() => ({sortBy: val})),

}))