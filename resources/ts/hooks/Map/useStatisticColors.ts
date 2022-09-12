import { EqualStencilFunc } from "three";
import { SolarSystemInterface } from "../../interfaces/Map/MapInterfaces";
import { useMapStore } from "../../stores/Map/MapStore";


const getColor = (value: number) => {

    if(value < -50){
        return 'text-red-800';
    }
    if(value >= -50 &&  value < -20){
        return 'text-red-600';
    }else if(value >= -20 && value < 0){
        return 'text-red-500';
    }else if(value >= 0 && value < 20){
        return 'text-amber-700';
    }else if(value >= 20 && value < 40){
        return 'text-yellow-500';
    }else if(value >= 40 && value < 60){
        return 'text-lime-600';
    }else if(value >= 60 && value <80){
        return 'text-green-500';
    }else if(value >= 80){
        return 'text-green-800';
    }

    return 'text-gray-500';
}


const calculateColor = (stat: number, average: number = 0) => {
    let color = 'text-gray-500'
    //if(stat == 0) return color;

    let increased_percent = ((stat - average) / average) * 100;

    color = getColor(increased_percent);

    if(increased_percent > 100){
        color += ' font-bold';
    }


    return color;
}



export const useStatisticColors = (system: SolarSystemInterface) => {
    const average_1h = useMapStore((state) => state.average_1h);
    const average_24h = useMapStore((state) => state.average_24h);
    const average_delta = useMapStore((state) => state.average_delta);

    const npc_1h_color = calculateColor(system.system_kill_hour?.npc_kills ?? 0, average_1h)
    const npc_24h_color = calculateColor(system.system_kill_day.npc_kills, average_24h);
    const npc_delta_color = calculateColor(system.npc_delta, average_delta);

    return [
        npc_1h_color,
        npc_24h_color,
        npc_delta_color
    ]
}


