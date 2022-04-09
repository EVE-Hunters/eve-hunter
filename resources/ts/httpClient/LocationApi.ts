import HttpClient from "./HttpClient";

class LocationApi extends HttpClient {

    public constructor() {
        super('/api/location');

    }

    public updateLocation = (data:any) => this.post('location', data)

    public searchSystem = (data:any) => this.post('search', data)

    public getNearbySystems = (data:any, system_id: number) => this.post(`nearby/${system_id}`, data)
}

export default new LocationApi()
