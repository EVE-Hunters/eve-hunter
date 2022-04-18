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
import { Connection, SolarSystemInterface } from '../interfaces/Map/MapInterfaces';



const Hunting: React.FC = () => {

    const MapStore = useMapStore();
    const HuntingSystem = useMapStore((state) => state.HuntingSystem)
    const NearBySystems = useMapStore((state) => state.NearBySystems)

    //Enables and disables tracking of a user.
    useUserTracking()

    //Tracks hunter locations and destination messages
    useHunterLocations()

    useEffect(() => {
        MapStore.reset()

        if(HuntingSystem != null){
            LocationApi.getNearbySystems({jumps: MapStore.range}, HuntingSystem.system_id).then((data) => {
                let _systems: SolarSystemInterface[] = [];
                data.forEach(sys => {
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
        <ApplicationLayout>

                    <HuntingControls/>
                    <div className="p-2">
                        <SystemFilters/>
                    </div>
                    <div className="flex flex-col lg:flex-row w-full">
                        <div className="w-full xl:w-6/12">
                            <Map/>
                        </div>
                        <div className="w-full xl:w-6/12">
                            <SystemsList/>
                        </div>
                    </div>

        </ApplicationLayout>
    )
}

export default Hunting
