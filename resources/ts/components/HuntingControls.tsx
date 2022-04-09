import React from 'react';
import SystemSearch from "./Map/Controls/SystemSearch";
import {useHuntingLocationContext} from "../hooks/Location/useHuntingLocationContext";
import JumpRangeControl from "./Map/Controls/JumpRangeControl";
import MaxSecurity from "./Map/Controls/MaxSecurity";
import HunterSelector from "./HunterSelector/HunterSelector";
import SearchHuntingSystem from "./Map/Controls/SearchHuntingSystem";

const HuntingControls: React.FC = () => {

    const {updateSourceSystem, SourceSystem, StagingSystem} = useHuntingLocationContext()


    return (
        <>
            <div>Staging From: {StagingSystem?.name ?? ''}</div>
            <div className="flex space-x-2">
                <SearchHuntingSystem />
                <span>Hunting From: {SourceSystem?.name ?? ''}</span>
            </div>
        </>
    )
}

export default HuntingControls
