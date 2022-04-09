import React from "react";
import {RegisterListener, RemoveListener} from "../interfaces/Http/WebsocketSubscription";

interface WebsocketContextInterface {
    listen: RegisterListener,
    forget: RemoveListener
}

export const WebsocketContext = React.createContext<WebsocketContextInterface>({
    listen: () => null,
    forget: () => null,
});
