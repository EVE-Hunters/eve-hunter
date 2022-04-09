import {useContext} from "react";
import ControlsContext from "../../contexts/Map/ControlsContext";


export const useMapControls = () => {

    const context = useContext(ControlsContext);

    if(context === undefined){
        throw new Error('useMapControls must be used within ControlsProvider')
    }

    return context
}
