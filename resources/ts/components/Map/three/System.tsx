import React, {useEffect, useRef, useState} from 'react';
import {MapRenderSettings, SolarSystemInterface} from "../../../interfaces/Map/MapInterfaces";
import {Html} from "@react-three/drei";
import {useThree} from "@react-three/fiber";
import {Vector3} from "three";
import {useMapControls} from "../../../hooks/Map/useMapControls";
import {useMapSettingsStore} from "../../../store";
import {useCharacterLocations} from "../../../stores/UserLocationsStores";
import {CharacterInterface} from "../../../interfaces/User/CharacterInterface";
import SystemMapInfo from "./SystemMapInfo";
import {HiPaperAirplane} from "react-icons/hi";
import {useCharacters} from "../../../hooks/useCharacters";
import HuntingApi from "../../../httpClient/HuntingApi";

type meshElement = JSX.IntrinsicElements['mesh']

interface SystemComponentInterface extends meshElement {
    source: SolarSystemInterface
    system: SolarSystemInterface
}

const System: React.FC<SystemComponentInterface> = ({source, system, ...props}) => {

    /*const inhabitants: CharacterInterface[] = useCharacterLocations(
        (state) => Array.isArray(state.SolarSystemInhabitants[system.system_id]) ?
            state.SolarSystemInhabitants[system.system_id] : [] )*/


    const renderSettings = useRef<MapRenderSettings>(useMapSettingsStore.getState().systemInfo)


    useEffect(() => {
        //useCharacterLocations.subscribe(state => (inhabitants.current = state.SolarSystemInhabitants[system.system_id] ?? []))
        useMapSettingsStore.subscribe(state => (renderSettings.current = state.systemInfo))
    }, [])


    /*const delta = useMapSettingsStore((state) => state.delta)
    const npc1h = useMapSettingsStore((state) => state.npc1h)
    const npc24h = useMapSettingsStore((state) => state.npc24h)
    const jumps = useMapSettingsStore((state) => state.jumps)
    const security = useMapSettingsStore((state) => state.security)*/

    const mesh = useRef<THREE.Mesh>(null!)
    const camera = useThree((state) => state.camera)
    const [hovered, setHovered] = useState<boolean>(false)
    const focusedSystem = useMapSettingsStore((state) => state.focusedSystem);
    const setFocusedSystem = useMapSettingsStore((state) => state.setFocusedSystem);
    const {huntingCharacters} = useCharacters()

    const {setCoordinates, currentCenter} = useMapControls()

    const inRangeLy: boolean = (system?.distance ?? 0) < 8
    const inRangeJ: boolean = !!(system.jumps ?? 0 <= 5)

    let sphereColor = (inRangeJ && inRangeLy) ? 'purple' : 'orange';
    if (source.system_id === system.system_id) {
        sphereColor = 'green'
    }

    let deltaColor: string = '';
    if (system.npc_delta > 0) deltaColor = 'text-yellow-400';
    if (system.npc_delta > 50) deltaColor = 'text-lime-400';
    if (system.npc_delta > 100) deltaColor = 'text-emerald-400';
    if (system.npc_delta > 200) deltaColor = 'text-emerald-600';
    if (system.npc_delta < 0) deltaColor = 'text-red-500';

    const npcKills = system.kill_stats_latest?.npc_kills ?? 0;
    let npcColor: string = '';
    if (npcKills > 0) npcColor = 'text-yellow-400';
    if (npcKills > 100) npcColor = 'text-lime-400';
    if (npcKills > 200) npcColor = 'text-lime-600';
    if (npcKills > 300) npcColor = 'text-emerald-400';
    if (npcKills > 400) npcColor = 'text-emerald-600';

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
            <sphereGeometry args={[0.05, 15, 8]}/>
            <meshStandardMaterial color={sphereColor}/>
            <Html distanceFactor={3}>
                <div onPointerOver={handleHoverOn} onPointerOut={handleHoverOff}>
                    <div
                        className={`ml-4 -mt-10 flex flex-col w-[max-content] text-sky-400  select-none transform scale-80`}>
                        <div className="pl-8 border-b-2 border-red-500 flex flex-col">
                            <div className="hover:text-blue-500 cursor-pointer text-right" onClick={CenterCamera}>
                                <span>{system.name}</span>
                                {renderSettings.current.security && <span
                                    className="ml-2">{Math.round((system.security + Number.EPSILON) * 100) / 100}</span>}

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
