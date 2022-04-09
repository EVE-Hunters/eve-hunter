import React, {useRef} from 'react';
import ControlsContext, {Coordinates} from "../../contexts/Map/ControlsContext";
import Controls from "../../components/Map/three/Controls";
import {OrbitControls} from "@react-three/drei";
import {useThree} from "@react-three/fiber";

const ControlsProvider: React.FC = ({children}) => {

    const controls = useRef<any>()
    const camera = useThree((state) => state.camera)

    const setCoordinates  = (position: Coordinates, center: Coordinates) => {

        camera.position.x = position.x
        camera.position.y = position.y
        camera.position.z = position.z

        controls.current.target.x = center.x
        controls.current.target.y = center.y
        controls.current.target.z = center.z
        controls.current.update()
        camera.updateProjectionMatrix()
    }

    const currentCenter = () => {
        return {
            x: controls.current.target.x,
            y: controls.current.target.y,
            z: controls.current.target.z
        }
    }

    let value = {
        controls,
        setCoordinates,
        currentCenter
    }

    return (
        <ControlsContext.Provider value={value}>
            <OrbitControls ref={controls} makeDefault enablePan={true} enableZoom={true} enableRotate={true} />
            {children}
        </ControlsContext.Provider>
    )
}

export default ControlsProvider
