import {Connection, SolarSystemInterface} from "../interfaces/Map/MapInterfaces";
import create from "zustand";
import {useMapSettingsStore} from "../store";


interface MapStore {
    StagingSystem: SolarSystemInterface|null,
    HuntingSystem: SolarSystemInterface|null,
    NearBySystems: SolarSystemInterface[],
    Connections: Connection[],
}


export const useMapStore = create<MapStore>((set) => ({

    StagingSystem: null,
    HuntingSystem: null,
    NearBySystems: [],
    Connections: [],


}))
