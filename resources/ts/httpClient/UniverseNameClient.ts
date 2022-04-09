import HttpClient from "./HttpClient";
import {ChannelFormInterface, ChannelInterface} from "../interfaces/User/ChannelInterface";


class UniverseNameClient extends HttpClient {
    public constructor() {
        super('/api/universe');
    }

    public search = (query: string) => this.get('/search', {term: query})

}

export default new UniverseNameClient()
