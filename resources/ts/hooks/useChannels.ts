import {ChannelsContext} from "../contexts/ChannelsContext";
import {useContext} from "react";

export function useChannels(){
    return useContext(ChannelsContext);
}
