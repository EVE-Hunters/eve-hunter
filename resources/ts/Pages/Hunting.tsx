import React from 'react';
import HuntingLocationProvider from "../providers/Location/HuntingLocationProvider";
import EveMap from "../components/Map/three/EveMap";
import Map from "../components/Map/Map";
import HuntingControls from "../components/HuntingControls";
import SystemsList from "../components/Map/panel/SystemsList";
import ApplicationLayout from "../layouts/ApplicationLayout";
import HunterSelection from "../components/Map/Controls/HunterSelection";
import SystemFilters from "../components/Map/Controls/SystemFilters";
import WebsocketProvider from "../providers/WebsocketProvider";

const Hunting: React.FC = () => {
    return (
        <ApplicationLayout>

                <HuntingLocationProvider>

                    <HuntingControls/>
                    <div className="p-2">
                        <SystemFilters/>
                    </div>
                    <div className="flex flex-col lg:flex-row w-full">
                        <div className="w-full xl:w-6/12">
                            <Map/>
                        </div>
                        <div className="w-full xl:w-6/12">
                            <SystemsList/>
                        </div>
                    </div>
                </HuntingLocationProvider>
        </ApplicationLayout>
    )
}

export default Hunting
