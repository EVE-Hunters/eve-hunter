import React from "react";
import {ChannelInterface} from "../interfaces/User/ChannelInterface";

interface ChannelsContext {
    Channels: ChannelInterface[],
    ActiveChannel: ChannelInterface|null,
    UpdateActiveChannel: (Channel: ChannelInterface|null) => void,
    UpdateChannelList: () => void,

}

export const ChannelsContext = React.createContext<ChannelsContext>({
    Channels: [],
    ActiveChannel: null,
    UpdateActiveChannel: (channel) => {},
    UpdateChannelList: () => {}
})
