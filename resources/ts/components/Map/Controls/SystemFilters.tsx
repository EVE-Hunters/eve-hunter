import React from 'react';
import { useHuntingLocationContext } from '../../../hooks/Location/useHuntingLocationContext';
import {useMapSettingsStore} from "../../../store";
import HunterSelector from "../../HunterSelector/HunterSelector";


const SystemFilters: React.FC = () => {

    const setMinDelta = useMapSettingsStore((state)=> state.setMinDelta)
    const setMin1H = useMapSettingsStore((state)=>state.setMinNpc1h)
    const setMin24H = useMapSettingsStore((state)=> state.setMinNpc24h)
    const setSortBy = useMapSettingsStore((state) => state.setSortBy)
    const setJumpRange = useMapSettingsStore((state) => state.setJumpRange)
    const jumpRange = useMapSettingsStore((state) => state.jumpRange)
    const {tracking, toggleTracking} = useHuntingLocationContext()

    return (
        <div className="w-full flex align-center rounded-lg bg-white shadow overflow-hidden">
            <div className="p-2 border-r-2 bg-gray-200">
                Filters
            </div>
            <div className="flex p-2 border-r-2">
                <span>Min Delta</span>
                <input type="number" className="ml-1 w-16 rounded border px-1"
                       onChange={e => setMinDelta(e.target.value ? parseInt(e.target.value) : null)}/>
            </div>
            <div className="flex p-2 border-r-2">
                <span>Min Npc (1H)</span>
                <input type="number" className="ml-1 w-16 rounded border px-1"
                       onChange={e => setMin1H(e.target.value ? parseInt(e.target.value) : null)}/>
            </div>
            <div className="flex p-2 border-r-2">
                <span>Min Npc (24H)</span>
                <input type="number" className="ml-1 w-16 rounded border px-1"
                       onChange={e => setMin24H(e.target.value ? parseInt(e.target.value) : null)}/>
            </div>



            <div className="ml-auto"></div>
            <div className="flex p-2">
                <span>Sort By</span>
                <select className="ml-1 w-24 rounded border px-1" onChange={e => setSortBy(e.target.value)}>
                    <option value="jumps">Jumps</option>
                    <option value="npc_delta">Delta</option>
                    <option value="kill_stats_latest.npc_kills">Npc (1H)</option>
                    <option value="npc_24h">NPC (24H)</option>
                    <option value="latest_system_jumps.ship_jumps">Traffic</option>
                </select>
            </div>
            <div className="flex p-2 space-x-2">
                <span>Hunt Range</span>
                <input type="range" min="1" max="10" className="m-w-44 text-blue-500"
                    value={jumpRange} onChange={e => setJumpRange(parseInt(e.target.value))}/>
                <span>({jumpRange})</span>
            </div>
            <button className={`w-34 rounded ml-2 px-2 py-0.5 ${tracking ? 'bg-red-500 hover:bg-red-600 text-blue-100' : 'bg-blue-500 hover:bg-blue-600 text-blue-100'}`} onClick={() => toggleTracking()}>
                {tracking ? 'Disable Tracking' : 'Enable Tracking'}
            </button>
        </div>
    )
}

export default SystemFilters
