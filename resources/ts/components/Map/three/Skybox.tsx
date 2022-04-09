import React, {useMemo, useRef} from 'react';
import {TextureLoader, CubeTextureLoader} from "three";
import {useThree} from "@react-three/fiber";

const Skybox: React.FC = ({...props}) => {
    const { scene } = useThree()
    const mesh = useRef()


    const loader = new CubeTextureLoader();

    const texture = loader.load([
        '/images/skybox/space_ft.png',
        '/images/skybox/space_bk.png',
        '/images/skybox/space_up.png',
        '/images/skybox/space_dn.png',
        '/images/skybox/space_rt.png',
        '/images/skybox/space_lf.png',

    ])

    scene.background = texture;
    return null


    /*return (
        <mesh
            {...props}
            ref={mesh}
            scale={1}
        >
            <boxGeometry args={[10000, 10000, 10000]}>
            </boxGeometry>
            <meshBasicMaterial args={}></meshBasicMaterial>
        </mesh>
    )*/
}

export default Skybox
