import React from 'react';
import {Canvas} from "@react-three/fiber";
import EveMap from "./three/EveMap";
import JumpRange from "./three/JumpRange";
import ControlsProvider from "../../providers/Map/ControlsProvider";
import {useHuntingLocationContext} from "../../hooks/Location/useHuntingLocationContext";
import Skybox from "./three/Skybox";
import {useMapSettingsStore} from "../../store";
import HunterNotifications from "../HunterNotifications";
import {useCharacters} from "../../hooks/useCharacters";
import HuntingApi from "../../httpClient/HuntingApi";


const Map: React.FC = () => {

    const renderSettings = useMapSettingsStore(state => state.systemInfo);
    const toggleRangeSphere = useMapSettingsStore((state) => state.toggleRangeSphere)
    const showRangeSphere = useMapSettingsStore((state) => state.showRangeSphere)
    const toggleDelta = useMapSettingsStore((state) => state.toggleDelta)
    const toggleNpc1h = useMapSettingsStore((state) => state.toggleNpc1h)
    const toggleNpc24h = useMapSettingsStore((state) => state.toggleNpc24h)
    const toggleJumps = useMapSettingsStore((state) => state.toggleJumps)
    const toggleSecurity = useMapSettingsStore((state) => state.toggleSecurity)

    const {SourceSystem, nearBySystems, connections} = useHuntingLocationContext()
    const {huntingCharacters} = useCharacters()

    const SetDestinationHome = () => {
        if(SourceSystem)
            HuntingApi.setDestination(SourceSystem.system_id, huntingCharacters)
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
                                position: [SourceSystem?.x ?? 0, SourceSystem?.y ?? 0, SourceSystem?.z ?? 0]
                            }}
                            dpr={[1, 2]}>
                            <ambientLight/>

                            <pointLight position={[10, 10, 10]}/>
                            <ControlsProvider>
                                {SourceSystem && <EveMap SourceSystem={SourceSystem} connections={connections}
                                                         nearBySystems={nearBySystems}/>}
                                <JumpRange position={[0, 0, 0]}/>
                            </ControlsProvider>
                            <Skybox/>
                        </Canvas>
                    </div>
                    <div className="w-3/12 p-2">
                       <HunterNotifications />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Map
