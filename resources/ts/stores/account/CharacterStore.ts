import State from 'pusher-js/types/src/core/http/state';
import create from 'zustand';
import { CharacterInterface } from '../../interfaces/User/CharacterInterface';
import Hunting from '../../Pages/Hunting';

interface ICharacterStore {
    characters: CharacterInterface[],

    mainCharacterId: number | null,
    huntingCharactersId: number[],

    setCharacters: (characters: CharacterInterface[]) => void,

    setHuntingCharacters: (character_id: number[]) => void,
    setMainCharacter: (character_id: number|null) => void

}

const useCharacterStore = create<ICharacterStore>((set, get) => ({
    characters: [],

    mainCharacterId: null,
    huntingCharactersId: [],

    setHuntingCharacters: (character_id) => set((state) => ({huntingCharactersId: character_id})),

    setMainCharacter: (character_id) => set((state) => ({mainCharacterId: character_id})),

    setCharacters: (characters) => set((state) => ({characters: characters})),

}))

export default useCharacterStore;

export const useMainCharacter = () => {
    const MainCharacter = useCharacterStore((state) => state.characters.find(x => x.character_id === state.mainCharacterId))
    const setMainCharacter = useCharacterStore((state) => state.setMainCharacter)
    return {MainCharacter, setMainCharacter};
}

export const useHuntingCharacters = () => {
    const HuntingCharacters = useCharacterStore((state) => state.characters.filter(x => state.huntingCharactersId.includes(x.character_id)));
    const setHuntingCharacters = useCharacterStore((state) => state.setHuntingCharacters);

    return {HuntingCharacters, setHuntingCharacters}
}
