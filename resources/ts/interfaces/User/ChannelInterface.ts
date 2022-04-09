import {SolarSystemInterface} from "../Map/MapInterfaces";
import UniverseNameSearch from "../../components/UniverseNameSearch";
import {UniverseName} from "./UniverseNameInterface";
import UserInterface from "./UserInterface";

export interface ChannelInterface {
    id: number,
    name: string,
    user_id: number,
    staging_system_id: number,
    staging_system: SolarSystemInterface,
    user: UserInterface,
    access: UniverseName[],
}

export interface ChannelFormInterface {
    id?: number,
    name: string,
    staging_system_id: number,
}
