import React from 'react';
import { useMapSettingsStore } from '../../../stores/Map/MapSettingsStore';

export const Filters: React.FC = () => {
    const setMinDelta = useMapSettingsStore((state)=> state.setMinDelta)
    const setMin1H = useMapSettingsStore((state)=>state.setMinNpc1h)
    const setMin24H = useMapSettingsStore((state)=> state.setMinNpc24h)
    const setSortBy = useMapSettingsStore((state) => state.setSortBy)

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

        </div>
    )
}
