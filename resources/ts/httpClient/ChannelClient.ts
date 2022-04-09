import HttpClient from "./HttpClient";
import {ChannelFormInterface, ChannelInterface} from "../interfaces/User/ChannelInterface";


interface AvailableChannels {
    channels: ChannelInterface[]
}

class ChannelClient extends HttpClient {
    public constructor() {
        super('/api/channels');
    }

    public fetch = () => this.get<AvailableChannels>('/list')

    public create = (channel: ChannelFormInterface) => this.post<ChannelInterface>('/create', {channel: channel})

    public updateAccess = (channel: ChannelInterface, entities: number[]) => this.post(`/access/${channel.id}`, {entities})

    public delete = (channel: ChannelInterface) => this.post(`/delete/${channel.id}`)
}

export default new ChannelClient()
