import {useContext} from "react";
import {CharactersContext} from "../contexts/CharactersContext";

export const useCharacters = () => {
    return useContext(CharactersContext)
}
