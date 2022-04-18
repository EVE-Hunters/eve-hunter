import React, {useState} from 'react';
import {SolarSystemInterface} from "../../interfaces/Map/MapInterfaces";
import {useChannelStore} from "../../stores/ChannelStore";
import {useCharacters} from "../../hooks/useCharacters";
import HuntingApi from "../../httpClient/HuntingApi";



const HunterNotifications: React.FC = () => {

    const messages = useChannelStore((state) => state.messages);
    const clearNotifications = useChannelStore((state) => state.clearMessages);
    const {huntingCharacters} = useCharacters()
    const [textFilter, setTextFilter] = useState<string>('')

    const SetDestination = (system: SolarSystemInterface) => {
        HuntingApi.setDestination(system.system_id, huntingCharacters);
    }


    return (
        <div className="h-full overflow-hidden">
            <div className="px-2">
            <input type="text" className="w-full" placeholder="Filter Characters" value={textFilter} onChange={e => setTextFilter(e.target.value)} />
            <div className="w-full text-center py-1 text-white hover:text-gray-400 text-xs cursor-pointer border-b"
                 onClick={clearNotifications}>
                clear notifications
            </div>
            </div>
            <div className="w-full flex flex-col text-yellow-600 h-full overflow-y-auto">
                {messages.filter(m => m.character.name.toLocaleLowerCase().includes(textFilter.toLocaleLowerCase())).map((message, index) => {
                    return (
                        <div key={index} className="p-2 border-b">

                            <div className="font-bold text-xs">{message.datetime}</div>
                            <div className="font-bold text-xs">{message.character.name}:</div>
                            <div className="text-xs text-white">I am going to <span className="cursor-pointer underline hover:text-blue-400"
                            onClick={() => SetDestination(message.system)}>{message.system.name}</span></div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default HunterNotifications
