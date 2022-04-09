import React from 'react';
import {SolarSystemInterface} from "../../../interfaces/Map/MapInterfaces";
import {useMapSettingsStore} from "../../../store";
import {HiPaperAirplane} from "react-icons/hi";
import HuntingApi from "../../../httpClient/HuntingApi";
import HunterDisplay from "../HunterDisplay";
import {useCharacters} from "../../../hooks/useCharacters";

interface SystemPanelInterface {
    system: SolarSystemInterface
    rtn?: boolean
}

const SystemPanel: React.FC<SystemPanelInterface> = ({system, rtn}) => {

    //const focusedSystem = useMapSettingsStore((state) => state.focusedSystem);
    const {huntingCharacters}  = useCharacters();
    const setFocusedSystem = useMapSettingsStore((state) => state.setFocusedSystem);

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

    const SetDestination = () => {
        HuntingApi.setDestination(system.system_id, huntingCharacters);
    }

    return (
        <div className="w-44 m-1 rounded shadow bg-gray-200"
             onPointerOver={() => setFocusedSystem(system)}
             onPointerOut={() => setFocusedSystem(null)}>
            <div className="flex flex-col">
                <div className="border-b border-black px-2 py-0.5 text-right flex flex-col">
                     <div className="text-right flex text-sm">
                        {rtn && <div className="text-yellow-400 italic">Return</div>}
                         <div className="ml-auto" />
                         {system.name}
                    </div>
                    <div className="text-right flex text-xs">
                        <div className="ml-auto" />
                        {system.jumps ?? 0} Jumps
                    </div>
                </div>


                <div className="flex w-full flex-col p-2 border-b">
                    <div className="pl-8 pointer-events-none text-xs">
                        <div className={`text-right ${deltaColor}`}>
                            Delta: {system?.npc_delta}
                        </div>
                        <div className={`text-right ${npcColor}`}>
                            NPC (1H): {system.kill_stats_latest?.npc_kills}
                        </div>
                        <div className="text-right">
                            NPC (24H): {system?.npc_24h}
                        </div>
                        <div className="text-right">
                            Ship Jumps: {system.latest_system_jumps?.ship_jumps ?? 0}
                        </div>
                    </div>
                </div>
                <div className="border-b h-6">
                    <HunterDisplay system_id={system.system_id}/>
                </div>

                <div className="flex w-full p-2">
                    <a target="_blank" href={`https://evemaps.dotlan.net/map/${system.region.name}/${system.name}`}
                       className="mx-1">
                        <img src="/images/dotlan-avatar_400x400.png" alt="evemap" className="w-4 h-4"/>
                    </a>
                    <a target="_blank" href={`https://zkillboard.com/system/${system.system_id}`} className="mx-1">
                        <img src="/images/zkillboard.png" alt="zkillboard" className="w-4 h-4 rounded-full"/>
                    </a>
                    <div className="ml-auto"/>
                    <button className="text-green-500" onClick={SetDestination}>
                        <HiPaperAirplane className="h-4 w-4 transform rotate-90"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SystemPanel
