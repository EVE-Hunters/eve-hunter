import React, {useRef, useState, useEffect} from 'react';
import ControlsContext, {Coordinates} from "../../contexts/Map/ControlsContext";
import Controls from "../../components/Map/three/Controls";
import {OrbitControls, useFBO} from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import {useThree} from "@react-three/fiber";
import { useMapSettingsStore } from '../../stores/Map/MapSettingsStore';
import { Vector3Tuple } from 'three';
import { identity } from 'underscore';


const ControlsProvider: React.FC = ({children}) => {

    const focusedSystem = useMapSettingsStore((state) => state.focusedSystem);
    const [backupPosition, setBackupPosition] = useState<Vector3Tuple>([0, 0, 0])

    const controls = useRef<OrbitControlsImpl|null>()
    const camera = useThree((state) => state.camera)

    const setCoordinates  = (position: Coordinates, center: Coordinates) => {

        camera.position.x = position.x
        camera.position.y = position.y
        camera.position.z = position.z

        setBackupPosition([center.x, center.y, center.z]);

        //controls.current.target.set
        setCameraTarget([center.x, center.y, center.z]);

        camera.updateProjectionMatrix()
    }

    const setCameraTarget = (target: Vector3Tuple) => {
        if(controls.current == null)
            return

        controls.current.target.set(...target)
        controls.current.update()
    }



    const currentCenter = () => {
        return {
            x: controls.current?.target.x ?? 0,
            y: controls.current?.target.y ?? 0,
            z: controls.current?.target.z ?? 0
        }
    }

    let value = {
        controls,
        setCoordinates,
        currentCenter
    }

    return (
        <ControlsContext.Provider value={value}>
            <OrbitControls ref={controls} makeDefault enablePan={true} enableZoom={true} zoomSpeed={3} enableRotate={true} />
            {children}
        </ControlsContext.Provider>
    )
}

export default ControlsProvider
