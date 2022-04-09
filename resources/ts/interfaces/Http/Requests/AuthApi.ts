import UserInterface from "../../User/UserInterface";
import {AxiosResponse} from "axios";
import {CharacterInterface} from "../../User/CharacterInterface";

export interface UserRequestResponse {
    user: UserInterface
}

export interface CharacterRequestResponse {
    characters: CharacterInterface[],
    hunters: CharacterInterface[],
}

export type UserRequest = AxiosResponse<UserRequestResponse>
