import React, {useEffect, useRef, useState} from 'react';
import {MapRenderSettings, SolarSystemInterface} from "../../../interfaces/Map/MapInterfaces";
import {Center, Html} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import {useMapControls} from "../../../hooks/Map/useMapControls";
import SystemMapInfo from "./SystemMapInfo";
import {HiPaperAirplane} from "../../Icons/HeroIcons/HiPaperAirplane";
import {useCharacters} from "../../../hooks/useCharacters";
import HuntingApi from "../../../httpClient/HuntingApi";
import { useMapSettingsStore } from '../../../stores/Map/MapSettingsStore';
import { get } from 'underscore';
import Broadcaster from '../../../events/Broadcaster';
import useSystemSecurityColor from "../../../hooks/Map/useSystemSecurityColor";

type meshElement = JSX.IntrinsicElements['mesh']

interface SystemComponentInterface extends meshElement {
    source: SolarSystemInterface
    system: SolarSystemInterface
}

const System: React.FC<SystemComponentInterface> = ({source, system, ...props}) => {

    const renderSettings = useRef<MapRenderSettings>(useMapSettingsStore.getState().systemInfo)

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isGrowing, setIsGrowing] = useState<boolean>(true);

    useEffect(() => {
        //useCharacterLocations.subscribe(state => (inhabitants.current = state.SolarSystemInhabitants[system.system_id] ?? []))
        useMapSettingsStore.subscribe(state => (renderSettings.current = state.systemInfo))
    }, [])

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
    }


    const mesh = useRef<THREE.Mesh>(null!)
    const radius = useRef<number>(0.05)
    const camera = useThree((state) => state.camera)
    const [hovered, setHovered] = useState<boolean>(false)
    const focusedSystem = useMapSettingsStore((state) => state.focusedSystem);
    const setFocusedSystem = useMapSettingsStore((state) => state.setFocusedSystem);
    const {huntingCharacters} = useCharacters()
    const securityTextColor = useSystemSecurityColor(system);

    const {setCoordinates, currentCenter} = useMapControls()

    const inRangeLy: boolean = (system?.distance ?? 0) < 8

    let sphereColor = '#FF2400';
    if(inRangeLy){
        let range = get(system, 'jumps', '0')
        sphereColor = get(colorMap, range, '#FF2400')
    }

    useFrame(({clock}) => {
        //const a = clock.getElapsedTime();
        if(isFocused){
            if(isGrowing){
                radius.current = radius.current+0.001;
            }else{
                radius.current = radius.current-0.001;
            }

            if(radius.current >= 0.1){
                setIsGrowing(false);
            }
            if(radius.current <= 0.05){
                setIsGrowing(true)
            }
        }

    })

    const CenterCamera = () => {

        let centerPoint = currentCenter();

        let camPos = {
            x: camera.position.x + system.x - centerPoint.x,
            y: camera.position.y + system.y - centerPoint.y,
            z: camera.position.z + system.z - centerPoint.z
        }

        let sysPos = {
            x: system.x + 0.005,
            y: system.y + 0.005,
            z: system.z + 0.005
        }

        setCoordinates(camPos, sysPos)
    }

    useEffect(() => {
        let isFocused = focusedSystem?.system_id == system.system_id

        setIsFocused(isFocused)

        if(!isFocused){
            radius.current = 0.05
        }


    }, [focusedSystem])

    useEffect(() => {
        Broadcaster.listen(`system.${system.system_id}.focus`, CenterCamera);

        return () => {
            Broadcaster.forget(`system.${system.system_id}.focus`, CenterCamera);
        }
    }, [])

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered])

    const handleHoverOn = () => {
        setHovered(true)
        setFocusedSystem(system);
    }

    const handleHoverOff = () => {
        setHovered(false)
        setFocusedSystem(null)
    }

    const SetDestination = () => {
        HuntingApi.setDestination(system.system_id, huntingCharacters);
    }


    return (
        <mesh
            {...props}
            ref={mesh}
            scale={1}
            onClick={CenterCamera}
            onPointerOver={handleHoverOn}
            onPointerOut={handleHoverOff}
        >
            <sphereGeometry args={[radius.current, 15, 8]}/>
            <meshStandardMaterial color={sphereColor}/>
            <Html distanceFactor={3}>
                <div onPointerOver={handleHoverOn} onPointerOut={handleHoverOff}>
                    <div
                        className={`ml-4 -mt-14 flex flex-col w-[max-content] text-sky-400  select-none transform scale-80`}>
                        <div className="pl-8 border-b-2 border-red-500 flex flex-col">
                            <div className={`hover:text-blue-500 cursor-pointer text-right`} onClick={CenterCamera}>
                                <div className="relative inline-flex">
                                    <span className={`px-2 py-0.5 ${system.ice ? ' rounded-lg ring-1 ring-offset-1 ring-blue-500' : ''}`}>{system.name}</span>
                                    {renderSettings.current.security && <span
                                        className={`ml-2`}>{Math.round((system.security + Number.EPSILON) * 100) / 100}</span>}
                                    { isFocused == false ? null : (
                                        <span className="animate-ping absolute top-o left-0 inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    ) }
                                </div>
                            </div>
                            <div className="text-xs w-full text-right">{system.jumps ?? 0} Jumps</div>
                            <div className="text-xs w-full text-right flex space-x-2 cursor-pointer items-center" onClick={() => SetDestination()}>
                                <span>Set Destination</span>
                                <HiPaperAirplane className="w-3 h-3 transform rotate-90"  /></div>
                        </div>

                        <SystemMapInfo system={system} />

                    </div>
                </div>

            </Html>
        </mesh>
    )
}

export default System
