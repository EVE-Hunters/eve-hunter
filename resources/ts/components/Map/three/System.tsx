import React, {useEffect, useRef, useState} from 'react';
import {MapRenderSettings, SolarSystemInterface} from '../../../interfaces/Map/MapInterfaces';
import { Html} from '@react-three/drei';
import {useFrame, useThree} from '@react-three/fiber';
import {useMapControls} from '../../../hooks/Map/useMapControls';
import {HiPaperAirplane} from '../../Icons/HeroIcons/HiPaperAirplane';
import {useCharacters} from '../../../hooks/useCharacters';
import HuntingApi from '../../../httpClient/HuntingApi';
import { useMapSettingsStore } from '../../../stores/Map/MapSettingsStore';
import { get } from 'underscore';
import Broadcaster from '../../../events/Broadcaster';
import useSystemSecurityColor from '../../../hooks/Map/useSystemSecurityColor';
import { useStatisticColors } from '../../../hooks/Map/useStatisticColors';
import { useCharacterLocations } from '../../../stores/UserLocationsStores';
import { useMapStore } from '../../../stores/Map/MapStore';


type meshElement = JSX.IntrinsicElements['mesh']

interface SystemComponentInterface extends meshElement {
    source: SolarSystemInterface
    system: SolarSystemInterface
}

const System: React.FC<SystemComponentInterface> = ({source, system, ...props}) => {

	const renderSettings = useRef<MapRenderSettings>(useMapSettingsStore.getState().systemInfo);
	const HuntingSystem = useMapStore((state) => state.HuntingSystem);

	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [isGrowing, setIsGrowing] = useState<boolean>(true);

	useEffect(() => {
		//useCharacterLocations.subscribe(state => (inhabitants.current = state.SolarSystemInhabitants[system.system_id] ?? []))
		useMapSettingsStore.subscribe(state => (renderSettings.current = state.systemInfo));
	}, []);

	const colorMap = {
		0: '#107a00',
		1: '#387800',
		2: '#517600',
		3: '#517600',
		4: '#687200',
		5: '#7d6c00',
		6: '#926500',
		7: '#a75b00',
		8: '#ba4e00',
		9: '#cc3c00',
		10: '#dd1f00'
	};


	const mesh = useRef<THREE.Mesh>(null!);
	//const radius = useRef<number>(0.025)
	const [radius, setRadius] = useState<number>(0.025);
	const camera = useThree((state) => state.camera);
	const [hovered, setHovered] = useState<boolean>(false);
	const focusedSystem = useMapSettingsStore((state) => state.focusedSystem);
	const setFocusedSystem = useMapSettingsStore((state) => state.setFocusedSystem);
	const {huntingCharacters} = useCharacters();
	const securityTextColor = useSystemSecurityColor(system);
	const {setCoordinates, currentCenter} = useMapControls();
	const [npc_1h_color, npc_24h_color, npc_delta_color] = useStatisticColors(system);
	const inhabitants = useCharacterLocations(state => state.SolarSystemInhabitants[system.system_id] ?? []);
	const inRangeLy: boolean = (system?.distance ?? 0) < 8;
	const defaultRadius = HuntingSystem?.system_id === system.system_id ? 0.05 : 0.025;
	//new method


	let sphereColor = '#FF2400';
	if(inRangeLy){
		const range = get(system, 'jumps', '0');
		sphereColor = get(colorMap, range, '#FF2400');
	}
	if(HuntingSystem?.system_id === system.system_id){
		sphereColor = '#C603FC';
	}

	const resetRadius = () => {
		setRadius(defaultRadius);
	};

	useFrame(() => {
		if(!isFocused){
			resetRadius();
			return;
		}

		const _r = isGrowing ? radius+0.001 : radius-0.001;
		if(_r >= 0.09){
			setIsGrowing(false);

		}
		if(_r <= 0.025){
			setIsGrowing(true);
		}
		setRadius(_r);
	});


	const CenterCamera = () => {

		const centerPoint = currentCenter();

		const camPos = {
			x: camera.position.x + system.x - centerPoint.x,
			y: camera.position.y + system.y - centerPoint.y,
			z: camera.position.z + system.z - centerPoint.z
		};

		const sysPos = {
			x: system.x + 0.005,
			y: system.y + 0.005,
			z: system.z + 0.005
		};

		setCoordinates(camPos, sysPos);
	};

	useEffect(() => {
		const isFocused = focusedSystem?.system_id == system.system_id;

		setIsFocused(isFocused);

		if(!isFocused){

			//radius.current = 0.025
		}


	}, [focusedSystem]);

	useEffect(() => {
		Broadcaster.listen(`system.${system.system_id}.focus`, CenterCamera);

		return () => {
			Broadcaster.forget(`system.${system.system_id}.focus`, CenterCamera);
		};
	}, []);

	useEffect(() => {
		document.body.style.cursor = hovered ? 'pointer' : 'auto';
	}, [hovered]);

	const handleHoverOn = () => {
		setHovered(true);
		setFocusedSystem(system);
	};

	const handleHoverOff = () => {
		setHovered(false);
		setFocusedSystem(null);
	};

	const SetDestination = () => {
		HuntingApi.setDestination(system.system_id, huntingCharacters);
	};


	return (
		<mesh
			{...props}
			ref={mesh}
			scale={1}
			onClick={CenterCamera}
			onPointerOver={handleHoverOn}
			onPointerOut={handleHoverOff}
		>
			<sphereGeometry args={[radius, 32, 32]} />
			<meshStandardMaterial color={sphereColor} fog={false} transparent={true} opacity={0.5}></meshStandardMaterial>

			{isFocused ? <Html distanceFactor={4} pointerEvents="none" className="relative" style={{position:'relative'}}>
				<div className="-mt-3 ml-5 flex rounded text-xs font-thin bg-black/75 p-0.5 ">
					<div className="text-white relative select-none break-normal flex-nowrap" onPointerOver={handleHoverOn} onPointerOut={handleHoverOff}>
						<div className="m-0 px-1  hover:text-blue-500 hover:font-semibold flex" onClick={CenterCamera}>
							<span className="pr-2">{system.name}</span>
							<div className="ml-auto"></div>
							<span className={`font-semibold px-1 ${securityTextColor}`}>{(Math.round(system.security *  10)/10).toFixed(1)}</span>
							{ inhabitants.length>0 &&  <span className={'text-green-500 font-semibold'}>( {inhabitants.length} )</span> }
							{isFocused && <span className="animate-ping absolute top-o left-0 inline-flex  h-full w-full rounded-full bg-sky-400 opacity-75"></span>}
						</div>
						{renderSettings.current.delta && (
							<div className="m-0 px-1 rounded flex w-full">
								<span>Delta</span>
								<div className="ml-auto"></div>
								<span className={`${npc_delta_color}`}>{system.npc_delta}</span>
							</div>
						)}
						{renderSettings.current.npc1h && (
							<div className="m-0 px-1 rounded flex w-full">
								<span className="pr-2">NPC 1H</span>
								<div className="ml-auto"></div>
								<span className={`${npc_1h_color}`}>{system.system_kill_hour.npc_kills}</span>
							</div>
						)}
						{renderSettings.current.npc24h && (
							<div className="m-0 px-1 rounded flex w-full">
								<span className="pr-2">NPC 24H</span>
								<div className="ml-auto"></div>
								<span className={`${npc_24h_color}`}>{system.system_kill_day.npc_kills}</span>
							</div>
						)}
						{renderSettings.current.jumps && (
							<div className="m-0 px-1 rounded flex w-full">
								<span className="pr-2">Jumps</span>
								<div className="ml-auto"></div>
								<span >{system.system_jumps.ship_jumps}</span>
							</div>
						)}

					</div>
					<div className="py-1 px-0.5">
						<div className="w-4 text-green-500 cursor-pointer" onClick={() => SetDestination()}>
							<HiPaperAirplane className="w-3 h-3 transform rotate-90"  />
						</div>
					</div>
				</div>


			</Html> : <Html distanceFactor={2} pointerEvents="none" className="relative" style={{position:'relative'}}>
				<div className="-mt-3 ml-5 flex rounded text-xs font-thin bg-black/75 p-0.5 ">
					<div className="text-white relative select-none break-normal flex-nowrap" onPointerOver={handleHoverOn} onPointerOut={handleHoverOff}>
						<div className="m-0 px-1  hover:text-blue-500 hover:font-semibold flex" onClick={CenterCamera}>
							<span className="pr-2">{system.name}</span>
							<div className="ml-auto"></div>
							<span className={`font-semibold px-1 ${securityTextColor}`}>{(Math.round(system.security *  10)/10).toFixed(1)}</span>
							{ inhabitants.length>0 &&  <span className={'text-green-500 font-semibold'}>( {inhabitants.length} )</span> }
							{isFocused && <span className="animate-ping absolute top-o left-0 inline-flex  h-full w-full rounded-full bg-sky-400 opacity-75"></span>}
						</div>
						{renderSettings.current.delta && (
							<div className="m-0 px-1 rounded flex w-full">
								<span>Delta</span>
								<div className="ml-auto"></div>
								<span className={`${npc_delta_color}`}>{system.npc_delta}</span>
							</div>
						)}
						{renderSettings.current.npc1h && (
							<div className="m-0 px-1 rounded flex w-full">
								<span className="pr-2">NPC 1H</span>
								<div className="ml-auto"></div>
								<span className={`${npc_1h_color}`}>{system.system_kill_hour.npc_kills}</span>
							</div>
						)}
						{renderSettings.current.npc24h && (
							<div className="m-0 px-1 rounded flex w-full">
								<span className="pr-2">NPC 24H</span>
								<div className="ml-auto"></div>
								<span className={`${npc_24h_color}`}>{system.system_kill_day.npc_kills}</span>
							</div>
						)}
						{renderSettings.current.jumps && (
							<div className="m-0 px-1 rounded flex w-full">
								<span className="pr-2">Jumps</span>
								<div className="ml-auto"></div>
								<span >{system.system_jumps.ship_jumps}</span>
							</div>
						)}

					</div>
					<div className="py-1 px-0.5">
						<div className="w-4 text-green-500 cursor-pointer" onClick={() => SetDestination()}>
							<HiPaperAirplane className="w-3 h-3 transform rotate-90"  />
						</div>
					</div>
				</div>
			</Html>}
		</mesh>
	);
};

export default System;
