import React, {useRef, useState, useEffect} from 'react';
import {useMapSettingsStore} from "../../../store";

type meshElement = JSX.IntrinsicElements['mesh']

interface JumpRangeInterface extends meshElement {
    show: boolean
}

const JumpRange: React.FC<JSX.IntrinsicElements['mesh']> = (props) => {

    const showRange = useMapSettingsStore((state) => state.showRangeSphere)

    const mesh = useRef<THREE.Mesh>(null!)

    if(!showRange)
        return null

    return (
        <mesh {...props}
              ref={mesh}
              scale={1}>

            <sphereGeometry args={[8, 30, 8]}/>
            <meshStandardMaterial color="blue" wireframe={true}/>
        </mesh>
    )
}

export default JumpRange
