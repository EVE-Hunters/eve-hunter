import React, {useEffect, useState} from 'react';
import Websocket from "../http/Websocket";
import set = Reflect.set;
import {useWebsockets} from "../hooks/useWebsockets";

interface entryInterface {
    message: string,
    timestamp: string,
}

const TestingChannel = Websocket.channel('testingchannel');

const SubView: React.FC = () => {
    const {listen, forget} = useWebsockets();
    const [logs, setLogs] = useState<entryInterface[]>([]);

    const handleMessage = (e: any) => {
        console.log("Sub: ",logs, e, [...logs, e])
        setLogs(_logs => [...logs, e])
    }

    useEffect(() => {
        listen('SubView', 'testingchannel::.text-event', handleMessage)

        return function cleanup(){
            forget('SubView', 'testingchannel::.text-event')
        }

    }, [])

    return (
        <ul>
            {logs.map((x, index) => {
                return (<li key={index}>{x.message}: {x.timestamp}</li>)
            })}
        </ul>
    )
}

export default SubView
