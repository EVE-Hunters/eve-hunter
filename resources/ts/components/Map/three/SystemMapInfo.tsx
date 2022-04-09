import {useThree} from '@react-three/fiber';
import React, {useEffect, useRef} from 'react';
import {useMapControls} from '../../../hooks/Map/useMapControls';
import {MapRenderSettings, SolarSystemInterface} from "../../../interfaces/Map/MapInterfaces";
import {CharacterInterface} from '../../../interfaces/User/CharacterInterface';
import {useMapSettingsStore} from '../../../store';
import {useCharacterLocations} from '../../../stores/UserLocationsStores';
import HunterDisplay from "../HunterDisplay";

interface SystemMapInfoInterface {
    system: SolarSystemInterface
}

const SystemMapInfo: React.FC<SystemMapInfoInterface> = ({system}) => {

    //const inhabitants = useRef<CharacterInterface[]>(useCharacterLocations.getState().SolarSystemInhabitants[system.system_id] ?? []);
    const inhabitants = useCharacterLocations(state => state.SolarSystemInhabitants[system.system_id] ?? [])
    const renderSettings = useRef<MapRenderSettings>(useMapSettingsStore.getState().systemInfo)


    useEffect(() => {
        //useCharacterLocations.subscribe(state => (inhabitants.current = state.SolarSystemInhabitants[system.system_id] ?? []))
        useMapSettingsStore.subscribe(state => (renderSettings.current = state.systemInfo))
    }, [])

    let deltaColor: string = '';
    if (system.npc_delta > 0) deltaColor = 'text-yellow-400';
    if (system.npc_delta > 50) deltaColor = 'text-lime-400';
    if (system.npc_delta > 100) deltaColor = 'text-emerald-400';
    if (system.npc_delta > 200) deltaColor = 'text-emerald-600';
    if (system.npc_delta < 0) deltaColor = 'text-red-500';

    const npcKills = system.kill_stats_latest?.npc_kills ?? 0;
    let npcColor: string = '';
    if (npcKills > 0) npcColor = 'text-yellow-400';
    if (npcKills > 100) npcColor = 'text-lime-400';
    if (npcKills > 200) npcColor = 'text-lime-600';
    if (npcKills > 300) npcColor = 'text-emerald-400';
    if (npcKills > 400) npcColor = 'text-emerald-600';


    return (
        <div className="pl-8 pointer-events-none text-xs">
            {renderSettings.current.delta && <div className={`text-right ${deltaColor}`}>
                Delta: {system?.npc_delta}
            </div>}
            {renderSettings.current.npc1h && <div className={`text-right ${npcColor}`}>
                NPC (1H): {system.kill_stats_latest?.npc_kills}
            </div>}
            {renderSettings.current.npc24h && <div className="text-right">
                NPC (24H): {system?.npc_24h}
            </div>}
            {renderSettings.current.jumps && <div className="text-right">
                Ship Jumps: {system.latest_system_jumps?.ship_jumps}
            </div>}
            <div className="text-right">
                {inhabitants.length > 0 && (<div>Hunters: {inhabitants.length}</div>)}
            </div>
        </div>

    )
}

export default SystemMapInfo
