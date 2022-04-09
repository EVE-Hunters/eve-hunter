import React, {useEffect, useRef, useState} from 'react';

import {WebsocketContext} from '../contexts/WebsocketContext';
import {
    ChannelMember,
    ComponentWebsocketConnection,
    ContextWebsocketConnections,
    RegisterListener,
    RemoveListener
} from "../interfaces/Http/WebsocketSubscription";
import {useChannels} from "../hooks/useChannels";
import Websocket from "../http/Websocket";
import {ChannelInterface} from "../interfaces/User/ChannelInterface";
import {useCharacterLocations} from "../stores/UserLocationsStores";



const WebsocketProvider: React.FC = ({children}) => {

    const {ActiveChannel} = useChannels();
    const updateCharacterLocation = useCharacterLocations((state) => state.updateCharacterLocation)

    const [Channel, setChannel] = useState<ChannelInterface | null>(null);

    const [wsChannel, setWsChannel ] = useState(null);

    const [connections, setConnections] = useState<ContextWebsocketConnections>({})

    const [members, setMembers] = useState<ChannelMember[]>([])
    const [activeListeners, setActiveListeners] = useState<string[]>([])


    useEffect(() => {
        if (Channel != null) {
            let _channel = Websocket.join(`hunters.${Channel.id}`)
                .here((users: any) => {
                setMembers(users);
            }).joining((user: ChannelMember) => {
                setMembers(val => [...val, user])
                console.log('user joined: ' + user.name)
            }).leaving((user: ChannelMember) => {
                setMembers(val => val.filter(u => u.id != user.id))
                console.log('user left: ' + user.name)
            })
            _channel.listen('.location.updated', (data:any) => {
                updateCharacterLocation(data);
            })
        }
    }, [Channel])

    useEffect(() => {
        if (Channel != null) {
            Websocket.leave(`hunters.${Channel.id}`);
        }
        setChannel(ActiveChannel)
    }, [ActiveChannel])

    const addConnection: RegisterListener = (context, event, callback) => {
        let connection: ComponentWebsocketConnection = {};
        connection[event] = callback

        let s: ContextWebsocketConnections = {}
        s[context] = {...connection, ...connections[context]}
        setConnections(s);
    }

    const removeConnection: RemoveListener = (context, event, channel) => {
        let _connections = connections;
        delete _connections[context][event]

        setConnections(_connections)
    }

    let value = {
        listen: addConnection,
        forget: removeConnection,
    }

    return (
        <WebsocketContext.Provider value={value}>
            {children}
        </WebsocketContext.Provider>
    )
}

export default WebsocketProvider
