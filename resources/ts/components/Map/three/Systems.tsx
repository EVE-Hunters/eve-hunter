import React from 'react'
import { useMapSettingsStore } from '../../../stores/Map/MapSettingsStore';
import { useMapStore } from '../../../stores/Map/MapStore'
import SystemSphere from './SystemSphere';

interface SystemsProps extends React.HTMLAttributes<HTMLDivElement> {

}

const Systems: React.FC<SystemsProps> = ({...props}) => {
    const {HuntingSystem, NearBySystems} = useMapStore();
    const jumpRange = useMapSettingsStore((state)=>state.jumpRange);
	const maxSecurity = useMapSettingsStore((state)=>state.maxSecurity);
    return (
        <>
            {HuntingSystem && NearBySystems.filter(s => (s.jumps ?? 0) <= jumpRange).map((s, i) => {
                if(s.security > maxSecurity/100) return null;
                return (<SystemSphere system={s} source={HuntingSystem} key={s.system_id} position={[s.x, s.y, s.z]}/>);
            })}
        </>
    )
}
export default Systems
