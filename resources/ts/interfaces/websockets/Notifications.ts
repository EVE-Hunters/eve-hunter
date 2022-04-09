import {CharacterInterface} from "../User/CharacterInterface";
import {SolarSystemInterface} from "../Map/MapInterfaces";

export interface NotificationMessage {
    character: CharacterInterface,
    system: SolarSystemInterface,
    datetime: string,
}
