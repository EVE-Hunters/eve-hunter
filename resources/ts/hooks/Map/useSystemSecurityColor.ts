import {SolarSystemInterface} from "../../interfaces/Map/MapInterfaces";

const between = (val: number, greaterThan: number, lessThan: number) => {
    return val >= greaterThan && val < lessThan;
}

const useSystemSecurityColor = (system: SolarSystemInterface) => {
    let textColor = 'text-green-500';
    if(system.security <= -0.9){
        textColor = 'text-red-900'
    }else if(between(system.security, -0.9, -0.8)){
        textColor = 'text-red-800'
    }else if(between(system.security, -0.8, -0.7)){
        textColor = 'text-red-700'
    }else if(between(system.security, -0.7, -0.6)){
        textColor = 'text-red-600'
    }else if(between(system.security, -0.6, -0.5)){
        textColor = 'text-red-500'
    }else if(between(system.security, -0.5, -0.3)){
        textColor = 'text-red-300'
    }else if(between(system.security, -0.3, 0)){
        textColor = 'text-red-200'
    }else if(between(system.security, 0, 0.5)){
        textColor = 'text-orange-600'
    }else if(between(system.security, 0.5, 0.6)){
        textColor = 'text-amber-600'
    }else if(between(system.security, 0.6, 0.8)){
        textColor = 'text-emerald-600'
    }else if(system.security > 0.8){
        textColor = 'text-emerald-800'
    }

    return textColor
}

export default useSystemSecurityColor;
