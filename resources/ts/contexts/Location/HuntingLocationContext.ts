import React from 'react';
import {CentroidInterface, Connection, SolarSystemInterface} from "../../interfaces/Map/MapInterfaces";

interface HuntingLocationContextInterface {
    StagingSystem: SolarSystemInterface | null,
    SourceSystem: SolarSystemInterface | null,
    nearBySystems: SolarSystemInterface[],
    connections: Connection[],
    updateSourceSystem: (system: SolarSystemInterface | null) => void,
    connectionRange: number,
    huntRange: number
    updateConnectionRange: (range: number) => void,
    updateHuntRange: (range: number) => void,
    tracking: boolean,
    toggleTracking: () => void
}


const HuntingLocationContext = React.createContext<HuntingLocationContextInterface|undefined>(undefined);
export default HuntingLocationContext
