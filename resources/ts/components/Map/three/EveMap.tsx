
import React, {useEffect, useMemo, useState} from 'react';
import {Connection, SolarSystemInterface} from '../../../interfaces/Map/MapInterfaces';
import {Line} from '@react-three/drei';
import System from './System';
import {useMapControls} from '../../../hooks/Map/useMapControls';
import { useMapSettingsStore } from '../../../stores/Map/MapSettingsStore';
import { useMapStore } from '../../../stores/Map/MapStore';
import Paths from './Paths';



const EveMap: React.FC = () => {

	const { setCoordinates } = useMapControls();
	const jumpRange = useMapSettingsStore((state)=>state.jumpRange);
	const maxSecurity = useMapSettingsStore((state)=>state.maxSecurity);

	const {HuntingSystem, NearBySystems, Connections} = useMapStore((state) => ({
		HuntingSystem: state.HuntingSystem,
		NearBySystems: state.NearBySystems,
		Connections: state.Connections
	}));

	const _nearBySystems = useMemo(() => {
		return NearBySystems;
	}, [NearBySystems]);

	const _connection = useMemo(() => {
		return Connections;
	}, [Connections]);


	const SetCameraPosition = () => {

		HuntingSystem ? setCoordinates(
			{x: 2, y: 2, z: 2},
			{x: 0,y: 0,z: 0}) :
			setCoordinates({x:0, y:0, z:0}, {x:0, y:0, z:0});
	};

	useEffect(() => {
		SetCameraPosition();
	}, [HuntingSystem]);

	return (
		<>


			{HuntingSystem && _nearBySystems.filter(s => (s.jumps ?? 0) <= jumpRange).map((s, i) => {
				if(s.security > maxSecurity/100) return null;
				return (<System system={s} source={HuntingSystem} key={s.system_id} position={[s.x, s.y, s.z]}/>);
			})}

            <Paths />
			{/* {_connection.filter(s=> (s.jumps ?? 0) < jumpRange).map((c, i) => {
				if(c.system1.security > maxSecurity/100 || c.system2.security > maxSecurity/100) return null;
				return (<Line key={i}
					points={[[c.system1.x, c.system1.y, c.system1.z], [c.system2.x, c.system2.y, c.system2.z]]}
					color={c.jumps <= jumpRange ? 'green' : 'red'}
					lineWidth={1}>

				</Line>);
			})} */}


		</>
	);
};

export default EveMap;
