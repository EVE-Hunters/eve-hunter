import { MapRenderSettings } from "../../interfaces/Map/MapInterfaces"
import create from 'zustand';

interface MapListSettingsInterface{

    systemInfo: MapRenderSettings,

    toggleDelta: () => void,
    toggleNpc1h: () => void,
    toggleNpc24h: () => void,
    toggleJumps: () => void,
    toggleSecurity: () => void,
}

export const useMapListSettingsStore = create<MapListSettingsInterface>((set) => ({

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
    toggleSecurity: () => set((state) => ({systemInfo: { ...state.systemInfo, security: !state.systemInfo.security}}))

}))
