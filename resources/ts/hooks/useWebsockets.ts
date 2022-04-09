import {useContext} from "react";
import {WebsocketContext} from "../contexts/WebsocketContext";

export const useWebsockets = () => {
    return useContext(WebsocketContext)
}
