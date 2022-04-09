import React, {MutableRefObject} from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export type Coordinates = {x: number, y: number, z: number};

interface ControlsContextInterface {
    controls: MutableRefObject<OrbitControls>
    setCoordinates: (camera: Coordinates, center: Coordinates) => void
    currentCenter: () => Coordinates
}

const ControlsContext = React.createContext<ControlsContextInterface|undefined>(undefined)

export default ControlsContext;
