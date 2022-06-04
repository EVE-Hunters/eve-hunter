import React from 'react';
import { useMapSettingsStore } from '../../../stores/Map/MapSettingsStore';
import { useMapStore } from '../../../stores/Map/MapStore';
import { HiXCircle } from '../../Icons/HeroIcons/HiXCircle';
import SearchHuntingSystem from './SearchHuntingSystem';


const SystemFilters: React.FC = () => {

    const jumpRange = useMapSettingsStore((state) => state.jumpRange)
    const tracking = useMapSettingsStore((state) => state.tracking)

    const setJumpRange = useMapSettingsStore((state) => state.setJumpRange)
    const toggleTracking  = useMapSettingsStore((state) => state.toggleTracking)

    const StagingSystem = useMapStore((state) => state.StagingSystem)
    const HuntingSystem = useMapStore((state) => state.HuntingSystem);
    const SetHuntingSystem = useMapStore((state) => state.setHuntingSystem)
    const mapEnabled = useMapStore((state) => state.mapEnabled)
    const toggleMap = useMapStore((state) => state.toggleMap)


    //const {tracking, toggleTracking} = useHuntingLocationContext()

    return (
        <div className="w-full flex align-center rounded-lg bg-white shadow overflow-hidden">
            <div className="p-2 border-r-2 bg-gray-200">
                Settings
            </div>

            <button className={`px-3 py-1 rounded shadow ${mapEnabled ? 'bg-red-400 text-red-100':'bg-green-400 text-green-100'}`} onClick={() => toggleMap()}>
                { mapEnabled ? 'Disable ': 'Enable '}Map
            </button>

            <div className="flex min-w-72 w-72 items-center pl-2">
                Staging From: {StagingSystem?.name ?? ''}
            </div>

            <div className="flex min-w-72 w-72 items-center">
                <SearchHuntingSystem />
                <div className="flex">Hunting From: {HuntingSystem == null ? null : (
                    <>
                        {HuntingSystem.name}
                        <HiXCircle className="cursor-pointer hover:text-red-500" onClick={() => SetHuntingSystem(null)} />
                     </>
                )}</div>
            </div>


            <div className="ml-auto"></div>

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
