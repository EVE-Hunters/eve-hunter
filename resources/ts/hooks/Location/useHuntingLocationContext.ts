import {useContext} from "react";
import HuntingLocationContext from "../../contexts/Location";


export const useHuntingLocationContext = () => {

    const context = useContext(HuntingLocationContext);

    if(context === undefined){
        throw new Error('HuntingLocationContext must be used within HuntingLocationProvider')
    }

    return context
}
