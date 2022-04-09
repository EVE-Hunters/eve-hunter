import create from 'zustand';
import {CharacterInterface, CharacterLocationInterface} from "../interfaces/User/CharacterInterface";


interface SolarSystemInhabitantsInterface {
    [index: string]: CharacterInterface[]
}

type CharacterLocationsStore = {
    SolarSystemInhabitants: SolarSystemInhabitantsInterface,
    updateCharacterLocation: (loc: CharacterLocationInterface)=>void
}

export const useCharacterLocations = create<CharacterLocationsStore>((set)=>({

    SolarSystemInhabitants: {},
    updateCharacterLocation: (loc) => set((state) => {
        console.time('character-location-update')
        let inhabitants = state.SolarSystemInhabitants;
        let current_system_id = null;
        Object.keys(inhabitants).every(key => {
            if(inhabitants[key].findIndex(char => char.character_id == loc.character.character_id) >= 0){
                current_system_id = key;
                return false;
            }
            return true;
        })

        if(current_system_id != null){
            if(current_system_id == loc.system_id){
                return state
            }else{
                let index = inhabitants[current_system_id].findIndex(char => char.character_id == loc.character.character_id);
                 inhabitants[current_system_id].splice(index, 1);
                 if(inhabitants[current_system_id].length == 0)
                     delete inhabitants[current_system_id]
            }
        }

        if(!inhabitants[loc.system_id])
            inhabitants[loc.system_id] = []

        inhabitants[loc.system_id] = [...inhabitants[loc.system_id], loc.character]

        return {SolarSystemInhabitants: inhabitants}
    })

}))
