import {CharacterInterface} from "../User/CharacterInterface";

export interface WebsocketCallback {
    (
        event:any
    ): void
}

export interface RegisterListener {
    (
        context: string,
        event: string,
        callback: WebsocketCallback,
        channel?: string
    ): void
}

export interface RemoveListener {
    (
        context: string,
        event: string,
        channel?: string
    ): void

}

export interface ComponentWebsocketConnection {
    [index: string]: WebsocketCallback,
}

export interface ContextWebsocketConnections {
    [index: string]: ComponentWebsocketConnection
}

export interface ChannelMember {
    id: number,
    name: string,
    characters: CharacterInterface[],
}
