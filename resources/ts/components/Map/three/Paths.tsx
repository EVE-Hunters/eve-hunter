import { Line } from '@react-three/drei';
import React, { useMemo } from 'react';
import { useCalculateRoute } from '../../../hooks/Map/useRouteCalculator';
import { SolarSystemInterface } from '../../../interfaces/Map/MapInterfaces';
import { useMapSettingsStore } from '../../../stores/Map/MapSettingsStore';
import { useMapStore } from '../../../stores/Map/MapStore';
import SystemConnection from './SystemConnection';

type PathsProps = React.PropsWithChildren<HTMLDivElement>



const Paths: React.FC<PathsProps> = ({...props}) => {

	const FocusedSystem = useMapSettingsStore((state) => state.focusedSystem);
	const jumpRange = useMapSettingsStore((state)=>state.jumpRange);
	const maxSecurity = useMapSettingsStore((state)=>state.maxSecurity);
	const {HuntingSystem, NearBySystems, Connections} = useMapStore((state) => ({
		HuntingSystem: state.HuntingSystem,
		NearBySystems: state.NearBySystems,
		Connections: state.Connections
	}));

    const HighlightedRoute = useCalculateRoute();

    const isInPath = (system1: SolarSystemInterface, system2: SolarSystemInterface): boolean => {
        let systems: number[] = [system1.system_id, system2.system_id];
        return HighlightedRoute?.filter(x =>systems.includes(x.data.system_id)).length == 2
    }

	const routes = useMemo<number[]>(() => {
		//console.log('Connections:', Connections);
		//console.log('Nearby Systems', NearBySystems);
		return [];
	}, [FocusedSystem]);



	return (
		<>
			{Connections.filter(s=> (s.jumps ?? 0) < jumpRange).map((c, i) => {
				if(c.system1.security > maxSecurity/100 || c.system2.security > maxSecurity/100) return null;
                const inPath = isInPath(c.system1, c.system2);
				return (<Line key={i}
					points={[[c.system1.x, c.system1.y, c.system1.z], [c.system2.x, c.system2.y, c.system2.z]]}
					color={inPath ? 'cyan' : c.jumps <= jumpRange ? 'green' : 'red'}
					lineWidth={inPath ? 2 : 1}>

				</Line>);
			})}
		</>
	);
};
export default Paths;
