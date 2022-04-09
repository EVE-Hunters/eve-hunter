import HttpClient from "./HttpClient";
import {CharacterRequestResponse, UserRequestResponse} from "../interfaces/Http/Requests/AuthApi";

class AuthApi extends HttpClient {

    public constructor() {
        super('/api/auth');

    }

    public identity = () => this.get<UserRequestResponse>('/identity')

    public characters = () => this.get<CharacterRequestResponse>('/characters')



    public testEvent = () => this.post('/testEvent')
}

export default new AuthApi()
