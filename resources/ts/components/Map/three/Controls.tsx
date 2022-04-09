import React from 'react';
import { OrbitControls } from '@react-three/drei/core/OrbitControls';

const Controls: React.FC = () => {

    return (
        <>
            <OrbitControls makeDefault enablePan={true} enableZoom={true} enableRotate={true}/>
        </>
    )
}

export default Controls
