import { useEffect, useRef } from "react";
import LocationApi from "../../httpClient/LocationApi";
import { useMapSettingsStore } from "../../stores/Map/MapSettingsStore"
import { useCharacters } from "../useCharacters";



const useUserTracking = () => {
    const { huntingCharacters } = useCharacters();
    const trackingUser = useMapSettingsStore((state) => state.tracking);
    const trackingInterval = useRef<number|undefined>(0);

    const spawnLocationJobs = () => {
        LocationApi.updateLocation({character_id: huntingCharacters})
    }

    useEffect(() => {
        if(trackingUser)
            trackingInterval.current = window.setInterval(spawnLocationJobs, 5000);
        else
            clearInterval(trackingInterval.current)

        return () => {
            clearInterval(trackingInterval.current)
        }


    }, [trackingUser])


}

export default useUserTracking
