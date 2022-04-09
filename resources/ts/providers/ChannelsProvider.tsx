import React, {useEffect, useState} from 'react';
import {ChannelsContext} from "../contexts/ChannelsContext";
import {ChannelInterface} from "../interfaces/User/ChannelInterface";
import {useAuth} from "../hooks/useAuth";
import ChannelClient from "../httpClient/ChannelClient";
import WebsocketProvider from "./WebsocketProvider";

const ChannelsProvider: React.FC = ({children}) => {
    const {isAuthenticated, user, SetCurrentChannel} = useAuth();
    const [Channels, setChannels] = useState<ChannelInterface[]>([])
    const [ActiveChannel, setActiveChannel] = useState<ChannelInterface | null>(null)

    useEffect(() => {

        if (!isAuthenticated) {
            setChannels([]);
            setActiveChannel(null);
        } else {
            UpdateChannelList();
            setActiveChannel(user?.current_channel ?? null)
        }

    }, [user])

    const UpdateActiveChannel = (channel: ChannelInterface | null) => {
        setActiveChannel(channel)
        SetCurrentChannel(channel);
    }

    const UpdateChannelList = () => {
        ChannelClient.fetch().then(data => {
            setChannels(data.channels)
        })
    }

    let value = {
        Channels,
        ActiveChannel,
        UpdateActiveChannel,
        UpdateChannelList
    }

    return (
        <ChannelsContext.Provider value={value}>
                {children}
        </ChannelsContext.Provider>
    )
}

export default ChannelsProvider
