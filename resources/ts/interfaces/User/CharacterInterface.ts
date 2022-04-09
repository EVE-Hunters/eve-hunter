import {ChannelInterface} from "./ChannelInterface";
import {SolarSystemInterface} from "../Map/MapInterfaces";

interface UniverseName {
    category: string,
    entity_id: number,
    name: string,
}

export interface CharacterInterface {
    character_id: number,
    name: string,
    corporation?: UniverseName,
    alliance?: UniverseName
    active_channel: ChannelInterface
}

export interface CharacterLocationInterface {
    character: CharacterInterface,
    system_id: number,
}
