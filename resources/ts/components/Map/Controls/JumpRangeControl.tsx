import React from 'react';
import { useMapSettingsStore } from '../../../stores/Map/MapSettingsStore';


const JumpRangeControl: React.FC = () => {

    const setJumpRange = useMapSettingsStore((state) => state.setJumpRange)
    const jumpRange = useMapSettingsStore((state) => state.jumpRange)

    return (
        <div>
            <label>Jump Range: {jumpRange}</label>
            <input type="range" min={1} max={10} value={jumpRange} onChange={e => setJumpRange(parseInt(e.target.value))} />
        </div>
    )
}

export default JumpRangeControl
