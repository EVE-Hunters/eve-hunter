import React from 'react';
import SearchHuntingSystem from "./Map/Controls/SearchHuntingSystem";
import { useMapStore } from '../stores/Map/MapStore';
import SystemFilters from './Map/Controls/SystemFilters';

const HuntingControls: React.FC = () => {
    const StagingSystem = useMapStore((state) => state.StagingSystem)
    const HuntingSystem = useMapStore((state) => state.HuntingSystem);

    return (
        <div className="flex">
            <div>
                <div>Staging From: {StagingSystem?.name ?? ''}</div>
                <div className="flex space-x-2">
                    <SearchHuntingSystem />
                    <span>Hunting From: {HuntingSystem?.name ?? ''}</span>
                </div>
            </div>
            <SystemFilters />
        </div>
    )
}

export default HuntingControls
