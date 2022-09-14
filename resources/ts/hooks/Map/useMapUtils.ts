
import { ISolarSystem, ISolarSystemGate, SolarSystemInterface } from "../../interfaces/Map/MapInterfaces";
import useSdeStore from "../../stores/sde/SdeStore";

export const useMapUtils = () => {

    const sde = useSdeStore();

    const getGatesAndConnections = (system: ISolarSystem): [ISolarSystemGate[], ISolarSystem[]] => {
        const gates = sde.gates.filter(x => x.fromSolarSystemID === system.system_id)
        const connections = sde.systems.filter(x => gates.map(t => t.toSolarSystemID).includes(x.system_id))

        return [
            gates,
            connections
        ]
    }
    return {
        getGatesAndConnections
    }
}
