import {ChannelInterface} from "./ChannelInterface";
import {CharacterInterface} from "./CharacterInterface";

interface UserInterface {
    id: number,
    main_character_id: number,
    name: string
    current_channel: ChannelInterface|null
}

export interface ChannelUserInterface {
    id: number
    name: string,
    characters: CharacterInterface[]
}

export default UserInterface
