import React, { useEffect, useRef } from 'react';
import Map from "../components/Map/Map";
import HuntingControls from "../components/HuntingControls";
import SystemsList from "../components/Map/panel/SystemsList";
import ApplicationLayout from "../layouts/ApplicationLayout";
import SystemFilters from "../components/Map/Controls/SystemFilters";
import { useMapStore } from '../stores/Map/MapStore';
import useUserTracking from '../hooks/Map/useUserTracking';
import useHunterLocations from '../hooks/Map/useHunterLocations';
import LocationApi from '../httpClient/LocationApi';
import { Connection, ISolarSystem, ISolarSystemGate, SolarSystemInterface, SolarSystemWithConnections } from '../interfaces/Map/MapInterfaces';
import HunterNotifications from '../components/HunterNotifications';
import SystemSearch from '../components/Map/Controls/SystemSearch';
import useSdeStore from '../stores/sde/SdeStore';
import { Data3DTexture } from 'three';
import { useMapUtils } from '../hooks/Map/useMapUtils';
import axios from 'axios';

const Hunting: React.FC = () => {

    const MapStore = useMapStore();
    const HuntingSystem = useMapStore((state) => state.HuntingSystem)
    const NearBySystems = useMapStore((state) => state.NearBySystems)

    const mapEnabled = useMapStore((state) => state.mapEnabled)
    const sde = useSdeStore();
    const { getGatesAndConnections } = useMapUtils();

    //Enables and disables tracking of a user.
    useUserTracking()

    //Tracks hunter locations and destination messages
    useHunterLocations()

    /*const getSystemsWithinRange = () => {
        if(!HuntingSystem) return null;

        //Setup first system
        const [ hGates, hConnections ] = getGatesAndConnections(HuntingSystem);
        const stageSystem: SolarSystemWithConnections = {
            gates: hGates,
            connections: hConnections,
            ...HuntingSystem
        }

        let visited: number[] = [HuntingSystem?.system_id];
        let systems: SolarSystemWithConnections[] = [stageSystem];
        let currentSystems: SolarSystemWithConnections[] = [stageSystem];


        for(let i = 0; i <= MapStore.range; i++){

            let _systems: SolarSystemWithConnections[] = currentSystems.map((system) => {

                const [ gates, connections ] = getGatesAndConnections(system);


                let _system: SolarSystemWithConnections = {
                    ...system,
                    gates,
                    connections
                }
                return _system;
            })

            const nextSystems = _systems.map(x => x.connections ?? []).flat();
            const unique = nextSystems.filter(sys => !visited.includes(sys.system_id));
            visited = [...visited, ...unique.map(x => x.system_id)];
            systems = [...systems, ...unique];
            currentSystems = unique;
        }

        //const getSystemStats = await axios.

        //MapStore.setNearBysystems(systems);

    }*/

    useEffect(() => {
        MapStore.reset()

        if(HuntingSystem != null){
            //getSystemsWithinRange()
            LocationApi.getNearbySystems({jumps: MapStore.range}, HuntingSystem.system_id).then((data) => {
                let _systems: SolarSystemInterface[] = [];
                data.forEach(sys => {
                    if(sys.system_id != HuntingSystem.system_id){
                        sys.distance = Math.sqrt(
                            Math.pow(sys.x - HuntingSystem.x, 2) + Math.pow(sys.y - HuntingSystem.y, 2) + Math.pow(sys.z - HuntingSystem.z, 2)
                        );
                    }
                    sys.x = sys.x - HuntingSystem.x
                    sys.y = sys.y - HuntingSystem.y
                    sys.z = sys.z - HuntingSystem.z
                    _systems.push(sys);
                })
                MapStore.setNearBysystems(_systems);
            })
        }

    }, [HuntingSystem])

    useEffect(() => {
        let _connections: Connection[] = [];
        NearBySystems.forEach(s => {
            s.connections.forEach(c => {
                let connection = _connections.find(co => (co.system1.system_id === c.fromSolarSystemID && co.system2.system_id === c.toSolarSystemID) || (co.system1.system_id === c.toSolarSystemID && co.system2.system_id === c.fromSolarSystemID))
                if(connection == null){
                    let system2 = NearBySystems.find(ns => ns.system_id === c.toSolarSystemID)
                    if(system2) {
                        let s2Jumps = system2.jumps ?? 0
                        let jumps = (s?.jumps ?? 0 > s2Jumps) ? s.jumps : system2?.jumps
                        _connections.push({system1: s, system2: system2, jumps: jumps ?? 0})
                    }
                }
            })
        })
        MapStore.setConnections(_connections);
    }, [NearBySystems])

    return (
        <>
            <SystemFilters/>
            <div className="flex flex-col lg:flex-row w-full">
                { !mapEnabled ? (
                    <div className="w-3/12 bg-black min-h-[600px] mt-2">
                        <HunterNotifications />
                    </div>) : (
                    <div className="w-full xl:w-6/12">
                        <Map/>
                    </div>
                )}

                <div className={`w-full ${mapEnabled ? 'xl:w-6/12' : 'w-full'}`}>
                    <SystemsList/>
                </div>
            </div>
        </>
    )
}

export default Hunting
