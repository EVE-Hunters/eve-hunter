import React from 'react';
import {Canvas} from "@react-three/fiber";
import EveMap from "./three/EveMap";
import JumpRange from "./three/JumpRange";
import ControlsProvider from "../../providers/Map/ControlsProvider";
import Skybox from "./three/Skybox";

import HunterNotifications from "../HunterNotifications";
import {useCharacters} from "../../hooks/useCharacters";
import HuntingApi from "../../httpClient/HuntingApi";
import { useMapStore } from '../../stores/Map/MapStore';
import { useMapSettingsStore } from '../../stores/Map/MapSettingsStore';


const Map: React.FC = () => {

    const renderSettings = useMapSettingsStore(state => state.systemInfo);
    const toggleRangeSphere = useMapSettingsStore((state) => state.toggleRangeSphere)
    const showRangeSphere = useMapSettingsStore((state) => state.showRangeSphere)
    const toggleDelta = useMapSettingsStore((state) => state.toggleDelta)
    const toggleNpc1h = useMapSettingsStore((state) => state.toggleNpc1h)
    const toggleNpc24h = useMapSettingsStore((state) => state.toggleNpc24h)
    const toggleJumps = useMapSettingsStore((state) => state.toggleJumps)
    const toggleSecurity = useMapSettingsStore((state) => state.toggleSecurity)

    const {HuntingSystem, NearBySystems, Connections} = useMapStore((state) => ({
        HuntingSystem: state.HuntingSystem,
        NearBySystems: state.NearBySystems,
        Connections: state.Connections
    }));


    //const {SourceSystem, nearBySystems, connections} = useHuntingLocationContext()
    const {huntingCharacters} = useCharacters()

    const SetDestinationHome = () => {
        if(HuntingSystem)
            HuntingApi.setDestination(HuntingSystem.system_id, huntingCharacters)
    }


    return (
        <>
            <div className="bg-black mt-2 h-8 px-2 text-white flex items-center">
                <div
                    className={`px-2 py-0.5 hover:bg-white/20 rounded text-xs cursor-pointer select-none ${showRangeSphere ? 'text-green-500' : ''}`}
                    onClick={e => toggleRangeSphere()}>
                    Range Sphere
                </div>
                <div
                    className={`px-2 py-0.5 hover:bg-white/20 rounded text-xs cursor-pointer select-none ${renderSettings.delta ? 'text-green-500' : ''}`}
                    onClick={e => toggleDelta()}>
                    Delta
                </div>
                <div
                    className={`px-2 py-0.5 hover:bg-white/20 rounded text-xs cursor-pointer select-none ${renderSettings.npc1h ? 'text-green-500' : ''}`}
                    onClick={e => toggleNpc1h()}>
                    NPC (1H)
                </div>
                <div
                    className={`px-2 py-0.5 hover:bg-white/20 rounded text-xs cursor-pointer select-none ${renderSettings.npc24h ? 'text-green-500' : ''}`}
                    onClick={e => toggleNpc24h()}>
                    NPC (24H)
                </div>
                <div
                    className={`px-2 py-0.5 hover:bg-white/20 rounded text-xs cursor-pointer select-none ${renderSettings.jumps ? 'text-green-500' : ''}`}
                    onClick={e => toggleJumps()}>
                    Jumps
                </div>
                <div
                    className={`px-2 py-0.5 hover:bg-white/20 rounded text-xs cursor-pointer select-none ${renderSettings.security ? 'text-green-500' : ''}`}
                    onClick={e => toggleSecurity()}>
                    Security
                </div>
                <div className="ml-auto"></div>
                <div className="px-2 py-0.5 hover:bg-white/20 rounded text-xs cursor-pointer" onClick={() => SetDestinationHome()}>
                    Return Home
                </div>
            </div>
            <div className="bg-black h-[600px]">
                <div className="flex h-full">
                    <div className="w-9/12 h-full">
                        <Canvas
                            camera={{
                                fov: 50,
                                position: [HuntingSystem?.x ?? 0 + 1, HuntingSystem?.y ?? 0 + 1, HuntingSystem?.z ?? 0 + 1]
                            }}
                            dpr={[1, 2]}>
                            <ambientLight/>

                            <pointLight position={[10, 10, 10]}/>
                            <ControlsProvider>
                                {HuntingSystem && <EveMap SourceSystem={HuntingSystem} connections={Connections}
                                                         nearBySystems={NearBySystems}/>}
                                <JumpRange position={[0, 0, 0]}/>
                            </ControlsProvider>
                            <Skybox/>
                        </Canvas>
                    </div>
                    <div className="w-3/12">
                       <HunterNotifications />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Map
