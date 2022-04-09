import React from 'react';
import {CentroidInterface, SolarSystemInterface} from "../../interfaces/Map/MapInterfaces";

interface SystemItemInterface {
    system: SolarSystemInterface
    centroid: CentroidInterface
}

const SystemItem: React.FC<SystemItemInterface> = ({system, centroid}) => {

    const styles = {
        top: `${(system.x*80)-100}px`,
        left: `${(system.y*80)-100}px`,
    }

    /*return (
        <div className="absolute w-4 h-4 rounded-full bg-white" style={styles}></div>
    )*/

    return (
        <div className="rounded-full flex flex-col border shadow absolute px-2 py-1 bg-white text-center break-normal hover:z-10" style={styles}>
            {system.name}
        </div>
    )
}

export default SystemItem
