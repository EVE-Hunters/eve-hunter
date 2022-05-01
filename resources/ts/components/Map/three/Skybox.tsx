import React, {useRef} from 'react';
import {useThree} from "@react-three/fiber";
import {CubeTextureLoader} from 'three/src/loaders/CubeTextureLoader'

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
}

export default Skybox
