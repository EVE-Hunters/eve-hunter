import { Html } from '@react-three/drei'
import React, { useRef } from 'react'
import { useStatisticColors } from '../../../hooks/Map/useStatisticColors';
import { MapRenderSettings } from '../../../interfaces/Map/MapInterfaces';
import { useMapSettingsStore } from '../../../stores/Map/MapSettingsStore';


interface HighLightedRouteCountProps extends React.HTMLAttributes<HTMLDivElement> {

}

const HighLightedRouteCount: React.FC<HighLightedRouteCountProps> = ({...props}) => {
    const HighlightedRoute = useMapSettingsStore((state) => state.highlightedRoute);

    return (
        <div className="absolute top-0 right-0">

            <div className='text-white text-xs font-thin bg-black/75 p-0.5 mb-2'>
                Highlighted Route: { HighlightedRoute ? HighlightedRoute?.length - 1 ?? 0 : 0} Jumps
            </div>

        </div>
    )
}
export default HighLightedRouteCount
