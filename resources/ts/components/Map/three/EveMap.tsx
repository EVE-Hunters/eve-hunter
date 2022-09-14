
import React, {useEffect, useMemo, useState} from 'react';
import {Connection, SolarSystemInterface} from '../../../interfaces/Map/MapInterfaces';
import {Line} from '@react-three/drei';
import System from './System';
import {useMapControls} from '../../../hooks/Map/useMapControls';
import { useMapSettingsStore } from '../../../stores/Map/MapSettingsStore';
import { useMapStore } from '../../../stores/Map/MapStore';
import Paths from './Paths';
import { useCalculateRoute } from '../../../hooks/Map/useRouteCalculator';
import Systems from './Systems';


const EveMap: React.FC = () => {

	const { setCoordinates } = useMapControls();


	const {HuntingSystem} = useMapStore((state) => ({
		HuntingSystem: state.HuntingSystem,
		NearBySystems: state.NearBySystems,
		Connections: state.Connections
	}));



    useCalculateRoute();

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
			<Systems/>
            <Paths />
		</>
	);
};

export default EveMap;
