import {Dialog, Transition} from '@headlessui/react';
import React, {Fragment, useState} from 'react';
import {useChannels} from "../../hooks/useChannels";
import {ChannelInterface} from "../../interfaces/User/ChannelInterface";
import { HiPlus } from '../Icons/HeroIcons/HiPlus';
import ChannelClient from "../../httpClient/ChannelClient";

interface DeleteChannelModalInterface {
    channel: ChannelInterface
}

const ConfirmDeleteChanelModal: React.FC<DeleteChannelModalInterface> = ({channel}) => {
    const {UpdateChannelList} = useChannels();
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const deleteChannel = () => {
        ChannelClient.delete(channel).then(() => {
            UpdateChannelList();
        }).finally(() => {
            setIsOpen(false)
        })
    }

    return (
        <>
            <HiPlus className="w-5 h-5 transform rotate-45 cursor-pointer" onClick={() => setIsOpen(true)}/>
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
                                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-red-600">
                                    Delete Channel
                                </Dialog.Title>

                                <div className="my-2">
                                    <Dialog.Description>
                                        Are you sure you want to delete the channel: <strong>{channel.name}</strong>
                                    </Dialog.Description>
                                </div>

                                <div className="flex w-full mt-2">
                                    <button onClick={() => setIsOpen(false)}
                                            className="rounded border px-3 py-2 transition-all hover:bg-gray-200">Cancel
                                    </button>
                                    <div className="ml-auto"></div>
                                    <button onClick={() => deleteChannel()}
                                            className="rounded border px-3 py-2 transition-all bg-red-500 text-red-100 hover:bg-red-600">Delete
                                        Channel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>

                    </div>
                </Dialog>
            </Transition>
        </>)
}

export default ConfirmDeleteChanelModal
