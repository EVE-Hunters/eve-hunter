import { Node } from "ngraph.graph";
import create from "zustand";
import { MapRenderSettings, SolarSystemInterface } from "../../interfaces/Map/MapInterfaces";


type filterSetting = number | null

interface MapSettingsInterface{
    tracking: boolean,
    toggleTracking: () => void,



    showRangeSphere: boolean,
    jumpRange: number,
    maxSecurity: number
    focusedSystem: SolarSystemInterface | null,
    destination: SolarSystemInterface | null,
    toggleRangeSphere: () => void
    setJumpRange: (range: number) => void,
    setMaxSecurity: (sec: number) => void,
    setFocusedSystem: (system: SolarSystemInterface | null) => void,
    setDestination: (system: SolarSystemInterface | null) => void,
    systemInfo: MapRenderSettings,

    toggleDelta: () => void,
    toggleNpc1h: () => void,
    toggleNpc24h: () => void,
    toggleJumps: () => void,
    toggleSecurity: () => void,

    highlightedRoute: Node<any>[] | null
    setHighlightedRoute: (route: Node<any>[] | null) => void

    // filter settings
    minDelta: filterSetting,
    minNpc1h: filterSetting,
    minNpc24h: filterSetting,
    sortBy: string,

    setMinDelta: (val: filterSetting) => void,
    setMinNpc1h: (val: filterSetting) => void,
    setMinNpc24h: (val: filterSetting) => void,
    setSortBy: (val: string) => void
}

export const useMapSettingsStore = create<MapSettingsInterface>((set) => ({

    tracking: false,
    toggleTracking: () => set((state) => ({tracking: !state.tracking})),


    showRangeSphere: true,
    jumpRange: 5,
    maxSecurity: 100,

    focusedSystem: null,
    destination: null,

    setDestination: (system) => set((state) => ({destination: system})),


    toggleRangeSphere: () => set((state: any) => ({showRangeSphere: !state.showRangeSphere})),
    setJumpRange: (range) => set((state) => ({jumpRange: range})),
    setMaxSecurity: (sec) => set((state) => ({maxSecurity: sec})),
    setFocusedSystem: (system) => set((state) => ({focusedSystem: system})),

    //render settings
    systemInfo: {
        delta: false,
        npc1h: true,
        npc24h: false,
        jumps: false,
        security: false,
    },


    toggleDelta: () => set((state) => ({systemInfo: { ...state.systemInfo, delta: !state.systemInfo.delta}})),
    toggleNpc1h: () => set((state) => ({systemInfo: { ...state.systemInfo, npc1h: !state.systemInfo.npc1h}})),
    toggleNpc24h: () => set((state) => ({systemInfo: { ...state.systemInfo, npc24h: !state.systemInfo.npc24h}})),
    toggleJumps: () => set((state) => ({systemInfo: { ...state.systemInfo, jumps: !state.systemInfo.jumps}})),
    toggleSecurity: () => set((state) => ({systemInfo: { ...state.systemInfo, security: !state.systemInfo.security}})),

    highlightedRoute: null,
    setHighlightedRoute: (route) => set((state) => ({highlightedRoute: route})),


    //filter settings
    minDelta: null,
    minNpc1h: null,
    minNpc24h: null,
    sortBy: 'jumps',

    setMinDelta: (val: filterSetting) => set(() => ({minDelta: val})),
    setMinNpc1h: (val: filterSetting) => set(() => ({minNpc1h: val})),
    setMinNpc24h: (val: filterSetting) => set(() => ({minNpc24h: val})),
    setSortBy: (val: string) => set(() => ({sortBy: val})),

}));
