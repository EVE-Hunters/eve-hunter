import React from 'react';
import {SolarSystemInterface} from "../../../interfaces/Map/MapInterfaces";

import {HiPaperAirplane} from "../../Icons/HeroIcons/HiPaperAirplane";
import HuntingApi from "../../../httpClient/HuntingApi";
import HunterDisplay from "../HunterDisplay";
import {useCharacters} from "../../../hooks/useCharacters";
import { useMapSettingsStore } from '../../../stores/Map/MapSettingsStore';
import { useStatisticColors } from '../../../hooks/Map/useStatisticColors';
import Broadcaster from '../../../events/Broadcaster';
import useSystemSecurityColor from '../../../hooks/Map/useSystemSecurityColor'

interface SystemPanelInterface {
    system: SolarSystemInterface
    rtn?: boolean
}

const SystemPanel: React.FC<SystemPanelInterface> = ({system, rtn}) => {

    //const focusedSystem = useMapSettingsStore((state) => state.focusedSystem);
    const {huntingCharacters} = useCharacters();
    const setFocusedSystem = useMapSettingsStore((state) => state.setFocusedSystem);
    const [npc_1h_color, npc_24h_color, npc_delta_color] = useStatisticColors(system);
    const systemSecurityColor = useSystemSecurityColor(system);

    const SetDestination = () => {
        HuntingApi.setDestination(system.system_id, huntingCharacters);
    }

    const focusOnSystem = () => {
        let event = `system.${system.system_id}.focus`;
        Broadcaster.fire(event);
    }

    return (
        <div className={`w-44 m-1 rounded shadow bg-gray-200 ${system.ice ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}
             onPointerOver={() => setFocusedSystem(system)}
             onPointerOut={() => setFocusedSystem(null)}>
            <div className="flex flex-col">
                <div className="border-b border-black px-2 py-0.5 text-right flex flex-col">
                    <div className="text-right flex text-sm">
                        {rtn && <div className="text-yellow-400 italic">Return</div>}
                        <div className="ml-auto"/>
                        <div className="w-full hover:text-blue-500 cursor-pointer" onClick={focusOnSystem}>
                            {system.name}
                        </div>
                    </div>
                    <div className="text-right flex text-xs">
                        <span className={`font-semibold ${systemSecurityColor}`}>{Math.round((system.security + Number.EPSILON) * 100) / 100}</span>
                        <div className="ml-auto"/>
                        <span>{system.jumps ?? 0} Jumps</span>
                    </div>
                </div>


                <div className="flex w-full flex-col p-2 border-b">
                    <div className="pl-8 pointer-events-none text-xs">
                        <div className={`text-right ${npc_delta_color}`}>
                            Delta: {system?.npc_delta}
                        </div>
                        <div className={`text-right ${npc_1h_color}`}>
                            NPC (1H): {system.kill_stats_latest?.npc_kills}
                        </div>
                        <div className={`text-right ${npc_24h_color}`}>
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
