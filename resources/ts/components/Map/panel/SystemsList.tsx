import React, {useEffect, useState} from 'react';
import SystemPanel from "./SystemPanel";
import {SolarSystemInterface} from "../../../interfaces/Map/MapInterfaces";
import {get} from 'underscore';
import { useMapStore } from '../../../stores/Map/MapStore';
import { useMapSettingsStore } from '../../../stores/Map/MapSettingsStore';
import {Filters} from "./Filters";

const SystemsList: React.FC = () => {
    const HuntingSystem = useMapStore((state) => state.HuntingSystem);
    const NearBySystems = useMapStore((state) => state.NearBySystems);

    const [shownSystems, setShownSystems] = useState<SolarSystemInterface[]>([])
    const minDelta = useMapSettingsStore((state) => state.minDelta)
    const minNpc1h = useMapSettingsStore((state) => state.minNpc1h)
    const minNpc24h = useMapSettingsStore((state) => state.minNpc24h)
    const sortBy = useMapSettingsStore((state) => state.sortBy)
    const jumpRange = useMapSettingsStore((state) => state.jumpRange)

    const updateShownSites = () => {
        let _systems = NearBySystems.filter(sys => (sys.jumps ?? 0) < jumpRange)
        _systems = _systems.filter(sys => (sys?.distance ?? 0) <= 8)
        if(minDelta){
            _systems = _systems.filter(sys => sys.npc_delta > minDelta)
        }
        if(minNpc1h){
            _systems = _systems.filter(sys => sys.kill_stats_latest.npc_kills > minNpc1h)
        }
        if(minNpc24h){
            _systems = _systems.filter(sys => sys.npc_24h > minNpc24h)
        }
        if(sortBy != 'jumps'){
            _systems.sort((sys1, sys2) => {
                return get(sys2, sortBy.split('.'), 0) - get(sys1, sortBy.split('.'), 0)
            })
        }
        setShownSystems(_systems);
    }

    useEffect(() => {
        updateShownSites();
    }, [jumpRange, NearBySystems, minDelta, minNpc1h, minNpc24h, sortBy])


    return (
        <div className="p-2">
            <Filters />
            <div className="flex flex-wrap p-2 max-h-[600px] overflow-y-auto">
                {HuntingSystem && <SystemPanel rtn system={HuntingSystem}/>}
                {shownSystems.map(system => {
                    return (<SystemPanel key={system.system_id} system={system}/>)
                })}
            </div>
        </div>
    )
}

export default SystemsList
