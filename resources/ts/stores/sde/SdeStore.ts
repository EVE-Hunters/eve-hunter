import create from "zustand";
import { ISolarSystem, ISolarSystemGate } from "../../interfaces/Map/MapInterfaces";

interface SdeStore {

    systems: ISolarSystem[],
    gates: ISolarSystemGate[],
    setSystems: (systems: ISolarSystem[]) => void,
    setGates: (gates: ISolarSystemGate[]) => void,
}

const useSdeStore = create<SdeStore>((set) => {
    return {

        systems: [],
        gates: [],

        setSystems: (systems) => (set((state) => ({ systems: systems }))),
        setGates: (gates) => (set((state) => ({gates: gates})))

    }
})


export default useSdeStore
