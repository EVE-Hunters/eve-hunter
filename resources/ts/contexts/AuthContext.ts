import React from "react";
import UserInterface from "../interfaces/User/UserInterface";
import {ChannelInterface} from "../interfaces/User/ChannelInterface";
import { CharacterInterface } from "../interfaces/User/CharacterInterface";

type CharacterFunctions = (character: CharacterInterface) => void

type AuthContext = {
    isAuthenticated: boolean
    isInitializing: boolean,
    user: UserInterface|null,
    reloadIdentity: () => void,
    SetCurrentChannel: (channel: ChannelInterface|null) => void,
    characters: CharacterInterface[]
    mainCharacter: CharacterInterface|null
    huntingCharacters: number[],
    updateHuntingCharacters: (characters: number[]) => void
    updateMainCharacter: CharacterFunctions
    removeCharacter: CharacterFunctions
}

export const AuthContext = React.createContext<AuthContext>({
    isAuthenticated: false,
    isInitializing: true,
    user: null,
    reloadIdentity: () => {},
    SetCurrentChannel: (channel) => {},
    characters: [],
    mainCharacter: null,
    huntingCharacters: [],
    updateHuntingCharacters: (val) => {},
    updateMainCharacter: (val) => {},
    removeCharacter: (val) => {},
});


