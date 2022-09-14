import {Connection, SolarSystemInterface, SolarSystemWithStats} from '../../interfaces/Map/MapInterfaces';
import create from 'zustand';
import { countBy, get } from 'underscore';


interface MapStore {
    range: number,
    StagingSystem: SolarSystemInterface|null,
    HuntingSystem: SolarSystemInterface|null,
    NearBySystems: SolarSystemInterface[],
    Connections: Connection[],

    average_24h: number,
    average_1h: number,
    average_delta: number,

    mapEnabled: boolean,

    //Mutators
    reset: () => void,
    setStagingSystem: (system: SolarSystemInterface|null) => void,
    setHuntingSystem: (system: SolarSystemInterface|null) => void,
    setNearBysystems: (systems: SolarSystemInterface[]) => void,
    setConnections: (connections: Connection[]) => void,
    toggleMap: () => void,

}


export const useMapStore = create<MapStore>((set) => {
	return ({
		range: 10,

		StagingSystem: null,
		HuntingSystem: null,
		NearBySystems: [],
		Connections: [],

		mapEnabled: false,
		toggleMap: () => (set((state) => ({ mapEnabled: !state.mapEnabled }))),

		average_24h: 0,
		average_1h: 0,
		average_delta: 0,


		setStagingSystem: (system) => set(() => ({ StagingSystem: system })),
		setHuntingSystem: (system) => set(() => ({ HuntingSystem: system })),
		reset: () => set(() => ({
			NearBySystems: [],
			Connections: [],
		})),


		//Mutators
		setNearBysystems: (systems) => set(() => {

			let average_24h = 0;
			let average_1h = 0;
			let average_delta = 0;

			systems.forEach(sys => {
				average_24h += sys.system_kill_day.npc_kills;
				average_1h += sys.system_kill_hour.npc_kills;
				average_delta += sys.npc_delta;
			});

			average_1h = average_1h / systems.length;
			average_24h = average_24h / systems.length;
			average_delta = average_delta / systems.length;

			return {
				NearBySystems: systems,
				average_1h,
				average_24h,
				average_delta
			};
		}),
		setConnections: (connections) => set(() => ({ Connections: connections })),
	});
});
