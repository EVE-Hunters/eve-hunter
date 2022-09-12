import { ISolarSystem, ISolarSystemGate, SolarSystemInterface } from "../interfaces/Map/MapInterfaces";
import HttpClient from "./HttpClient";

interface SdeResponse {
    systems: ISolarSystem[],
    gates: ISolarSystemGate[],
}

class SdeApi extends HttpClient {

    public constructor() {
        super('/api/sde');

    }

    public fetchSde = () => this.get<SdeResponse>('fetch')
}
const SdeClientApi = new SdeApi();
export default SdeClientApi
