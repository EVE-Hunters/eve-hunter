import {HunterLocationInterface, SolarSystemInterface} from "../interfaces/Map/MapInterfaces";
import React from "react";

interface FleetContextInterface {
    StagingSystem: SolarSystemInterface|null,
    HuntingSystem: SolarSystemInterface|null,
    HunterLocations: HunterLocationInterface[],
}


export const FleetContext = React.createContext<FleetContextInterface>({
    StagingSystem: null,
    HuntingSystem: null,
    HunterLocations: [],
});
