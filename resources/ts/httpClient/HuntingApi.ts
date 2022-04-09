import HttpClient from "./HttpClient";
import {CharacterRequestResponse, UserRequestResponse} from "../interfaces/Http/Requests/AuthApi";
import {CharacterInterface} from "../interfaces/User/CharacterInterface";

class HuntingApi extends HttpClient {

    public constructor() {
        super('/api/hunting');

    }

    public setDestination = (system_id: number, characters: number[]) => this.post(`/location/${system_id}`, {
        character_id: characters
    })

}

export default new HuntingApi()
