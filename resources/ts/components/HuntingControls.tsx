import React from 'react';
import SearchHuntingSystem from "./Map/Controls/SearchHuntingSystem";
import { useMapStore } from '../stores/Map/MapStore';

const HuntingControls: React.FC = () => {
    const StagingSystem = useMapStore((state) => state.StagingSystem)
    const HuntingSystem = useMapStore((state) => state.HuntingSystem);

    return (
        <>
            <div>Staging From: {StagingSystem?.name ?? ''}</div>
            <div className="flex space-x-2">
                <SearchHuntingSystem />
                <span>Hunting From: {HuntingSystem?.name ?? ''}</span>
            </div>
        </>
    )
}

export default HuntingControls
