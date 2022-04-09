import React, {useState} from 'react';
import { HiPencil, HiPlus } from 'react-icons/hi';
import {useAuth} from '../../hooks/useAuth';
import CreateChannelModal from "./CreateChannelModal";
import {useChannels} from "../../hooks/useChannels";
import ConfirmDeleteChanelModal from "./ConfirmDeleteChanelModal";
import ChannelAccessModal from './ChannelAccessModal';


const ChannelManager: React.FC = () => {
    const {user} = useAuth()
    const {Channels} = useChannels()
    const [search, setSearch] = useState<string>('');


    const filterChannels = () => {
        return Channels.filter(c => c.user_id == user?.id)
            .filter(c => c.name.includes(search) || c.staging_system.name.includes(search));
    }

    return (
        <div>
            <div className="w-full text-2xl font-semibold">
                    My Channels
                </div>

            <CreateChannelModal />

            <div className="rounded bg-white">
                <input type="text" className="w-full px-2 py-1 rounded-lg focus:outline-none" placeholder="search"
                       onChange={e => setSearch(e.target.value)}/>

                <div className="py-2">
                    {filterChannels().map(channel => (
                        <div key={channel.id} className="flex w-full px-2 cursor-pointer items-center">
                            <div className="flex flex-col">
                                <div>
                                    {channel.name}
                                </div>
                                <div>
                                    {channel.staging_system.name}
                                </div>
                            </div>
                            <div className="ml-auto" />
                            <ChannelAccessModal channel={channel} />
                            <ConfirmDeleteChanelModal channel={channel} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChannelManager
