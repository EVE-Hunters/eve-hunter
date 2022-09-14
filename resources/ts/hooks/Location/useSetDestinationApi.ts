import HuntingApi from "../../httpClient/HuntingApi";
import { SolarSystemInterface } from "../../interfaces/Map/MapInterfaces";
import { useMapSettingsStore } from "../../stores/Map/MapSettingsStore";
import { useAuth } from "../useAuth";


export const useSetDestinationApi = (type='') => {

    const storeDestination = useMapSettingsStore(state => state.setDestination);
    const {huntingCharacters} = useAuth();


    const SetDestination = (system: SolarSystemInterface) => {

        HuntingApi.setDestination(system.system_id, huntingCharacters).then(() => {
            storeDestination(system)
        })

    }

    return SetDestination
}
