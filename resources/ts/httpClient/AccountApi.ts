import HttpClient from "./HttpClient";
import {CharacterRequestResponse, UserRequestResponse} from "../interfaces/Http/Requests/AuthApi";
import {ChannelInterface} from "../interfaces/User/ChannelInterface";

interface AvailableChannels {
    channels: ChannelInterface[]
}

class AccountApi extends HttpClient {

    public constructor() {
        super('/api/account');

    }

    public synHunters = (data: number[]) => this.post('/hunting/characters', {
        character_id: data
    })

    public makeMainCharacter = (data: number) => this.post('/setMainCharacter', {
        character_id: data
    })

    public removeCharacter = (data: number) => this.post(`/removeCharacter/${data}`)

    public setChannel = (channel: ChannelInterface|null) => this.post(`/set_channel/${channel?.id ?? null}`)

}

export default new AccountApi()
