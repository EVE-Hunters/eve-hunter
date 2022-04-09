import React from "react";
import {CharacterInterface} from "../interfaces/User/CharacterInterface";

type CharacterFunctions = (character: CharacterInterface) => void

interface CharactersContext {
    characters: CharacterInterface[]
    mainCharacter: CharacterInterface|null
    huntingCharacters: number[],
    updateHuntingCharacters: (characters: number[]) => void
    updateMainCharacter: CharacterFunctions
    removeCharacter: CharacterFunctions

}

export const CharactersContext = React.createContext<CharactersContext>({
    characters: [],
    mainCharacter: null,
    huntingCharacters: [],
    updateHuntingCharacters: (val) => {},
    updateMainCharacter: (val) => {},
    removeCharacter: (val) => {},
});
