import HttpClient from "./HttpClient";
import {FleetInterface} from "../interfaces/FleetInterfaces";


class FleetApi extends HttpClient {

    public constructor() {
        super('/api/fleets');
    }


    public createFleet = (data: FleetInterface) => this.post('/create');

    public updateFleet = (data: FleetInterface) => this.post(`/update/${data.id}`, data)

    public getCurrentFleet = () => this.get('/fetchCurrent')
}
