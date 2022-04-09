import React, {useEffect, useState} from 'react';
import {useHuntingLocationContext} from "../../../hooks/Location/useHuntingLocationContext";
import {useMapSettingsStore} from "../../../store";
import SystemPanel from "./SystemPanel";
import {SolarSystemInterface} from "../../../interfaces/Map/MapInterfaces";
import {get} from 'underscore';

const SystemsList: React.FC = () => {
    const {SourceSystem, nearBySystems} = useHuntingLocationContext()
    const [shownSystems, setShownSystems] = useState<SolarSystemInterface[]>([])
    const minDelta = useMapSettingsStore((state) => state.minDelta)
    const minNpc1h = useMapSettingsStore((state) => state.minNpc1h)
    const minNpc24h = useMapSettingsStore((state) => state.minNpc24h)
    const sortBy = useMapSettingsStore((state) => state.sortBy)
    const jumpRange = useMapSettingsStore((state) => state.jumpRange)

    const updateShownSites = () => {
        let _systems = nearBySystems.filter(sys => (sys.jumps ?? 0) < jumpRange)
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
    }, [jumpRange, nearBySystems, minDelta, minNpc1h, minNpc24h, sortBy])


    return (
        <div className="p-2">
            <div className="flex flex-wrap p-2 max-h-[600px] overflow-y-auto">
                {SourceSystem && <SystemPanel rtn system={SourceSystem}/>}
                {shownSystems.map(system => {
                    return (<SystemPanel key={system.system_id} system={system}/>)
                })}
            </div>
        </div>
    )
}

export default SystemsList
