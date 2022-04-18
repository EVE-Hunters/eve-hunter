import React, {Fragment} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import {useChannels} from "../../hooks/useChannels";
import { HiChevronDown } from '../Icons/HeroIcons/HiChevronDown';

const ChannelSelector: React.FC = () => {
    const {Channels, ActiveChannel, UpdateActiveChannel} = useChannels()

    const renderActivator = () => {
        return (<div className="w-full flex rounded-md shadow bg-white p-2">
            <div className="w-full">{ActiveChannel?.name ?? 'Select Channel'}</div>
            <div className="flex items-center">
                <HiChevronDown className="w-4 h-4"/>
            </div>
        </div>)
    }

    return (
        <>
            <Listbox value={ActiveChannel} onChange={UpdateActiveChannel}>
                <div className="relative mt-1">
                    <Listbox.Button
                        className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">{ActiveChannel?.name ?? 'Select Channel'}</Listbox.Button>
                    <Transition as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                        <Listbox.Options
                            className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                            <Listbox.Option value={null}>Select Channel</Listbox.Option>
                            {Channels.map(channel => (
                                <Listbox.Option value={channel}
                                                key={channel.id}
                                                className={({active}) =>
                                                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                                        active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                                                    }`
                                                }>
                                    {channel.name}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </>
    )
}

export default ChannelSelector
