import React from 'react';
import { useMapSettingsStore } from '../../../stores/Map/MapSettingsStore';

const MaxSecurity: React.FC = () => {
    const setMaxSecurity = useMapSettingsStore((state) => state.setMaxSecurity)
    const maxSecurity = useMapSettingsStore((state) => state.maxSecurity)

    return (
        <div className="flex items-center">
            <label className="w-36 mr-4">Max Security: {maxSecurity/100}</label>
            <input className="w-34" type="range" min={-100} max={100} value={maxSecurity} onChange={e => setMaxSecurity(parseInt(e.target.value))} />
        </div>
    )
}

export default MaxSecurity
