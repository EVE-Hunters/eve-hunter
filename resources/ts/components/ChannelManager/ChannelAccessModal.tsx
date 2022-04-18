import {Dialog, Transition } from '@headlessui/react';
import React, {Fragment, useState} from 'react';
import { HiLockClosed } from '../Icons/HeroIcons/HiLockClosed';
import { ChannelInterface } from '../../interfaces/User/ChannelInterface';
import {UniverseName} from "../../interfaces/User/UniverseNameInterface";
import ChannelAccessForm from "../forms/Channels/ChannelAccessForm";
import ChannelClient from "../../httpClient/ChannelClient";


interface ChannelAccessModalInterface {
    channel: ChannelInterface
}

const ChannelAccessModal: React.FC<ChannelAccessModalInterface> = ({channel}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [ AccessList, setAccessList ] = useState<UniverseName[]>(channel.access)

    const updateChannelAccess = () => {
        ChannelClient.updateAccess(channel, AccessList.map(e => e.entity_id)).then(response => {
            setIsOpen(false);
        })
    }


    return (
        <>
            <HiLockClosed className="w-5 h-5" onClick={() => setIsOpen(true)} />
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <Transition.Child as={Fragment}
                                          enter="ease-out duration-300"
                                          enterFrom="opacity-0"
                                          enterTo="opacity-100"
                                          leave="ease-in duration-200"
                                          leaveFrom="opacity-100"
                                          leaveTo="opacity-0">
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30"/>
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-red-600">
                                    {channel.name } Channel Access
                                </Dialog.Title>
                                <hr/>


                                <div className="my-2">
                                    <ChannelAccessForm access={AccessList} onChange={setAccessList} />
                                </div>

                                <div className="flex w-full mt-2">
                                    <button onClick={() => setIsOpen(false)}
                                            className="rounded border px-3 py-2 transition-all hover:bg-gray-200">Cancel
                                    </button>
                                    <div className="ml-auto"></div>
                                    <button onClick={() => updateChannelAccess()}
                                            className="rounded border px-3 py-2 transition-all bg-blue-500 text-blue-100 hover:bg-blue-600">
                                        Update Channel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>

                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ChannelAccessModal
