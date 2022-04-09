import React from 'react';
import {useChannels} from "../../hooks/useChannels";

const AvailableChannels: React.FC = () => {

    const {Channels} = useChannels()

    return (
        <>
            <div className="w-full text-2xl font-semibold">
                Available Channels
            </div>


            <div className="rounded bg-white mt-2 overflow-hidden">

                {Channels.map(channel => (
                    <div key={channel.id} className="flex w-full px-2 py-2 items-center border-b">
                        <div className="flex flex-col">
                            <div>
                                Channel: {channel.name}
                            </div>
                            <div>
                                Staging: {channel.staging_system.name}
                            </div>
                            <div>
                                Created by: {channel.user.name}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default AvailableChannels
