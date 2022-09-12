import {useContext} from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useCharacters = () => {
    return useContext(AuthContext)
}
