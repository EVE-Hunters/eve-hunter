import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import ChannelForm from "../forms/Channels/ChannelForm";
import {ChannelFormInterface} from "../../interfaces/User/ChannelInterface";
import ChannelClient from "../../httpClient/ChannelClient";
import {useChannels} from "../../hooks/useChannels";

const CreateChannelModal: React.FC = () => {

    const {UpdateChannelList} = useChannels()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [channel, setChannel] = useState<ChannelFormInterface>({
        name: '',
        staging_system_id: 0,
    })

    const [errors, setErrors] = useState<string[]>([]);


    const createNewChannel = () => {
        ChannelClient.create(channel).then(data => {
            UpdateChannelList()
            setChannel({
                name: '',
                staging_system_id: 0
            })
            setIsOpen(false);
        }).catch((error) => {
            let messages = Object.keys(error.response.data.errors).map(key => error.response.data.errors[key]);
            setErrors(messages)
        })
    }

    return (
        <>
            <button className="w-full rounded shadow px-3 py-2 my-2 bg-gray-200 hover:bg-gray-300"
                    onClick={() => setIsOpen(true)}>
                New Channel
            </button>
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
                                    New Channel
                                </Dialog.Title>
                                <hr/>

                                {errors.length > 0 && <div className="bg-red-500 text-red-100 p-2 rounded shadow mt-2">
                                    {errors.map((error, index) => (
                                        <div key={index}>{error}</div>
                                    ))}
                                </div>}

                                <div className="my-2">
                                    <ChannelForm value={channel} onChange={ch => setChannel(ch)}/>
                                </div>

                                <div className="flex w-full mt-2">
                                    <button onClick={() => setIsOpen(false)}
                                            className="rounded border px-3 py-2 transition-all hover:bg-gray-200">Cancel
                                    </button>
                                    <div className="ml-auto"></div>
                                    <button onClick={() => createNewChannel()}
                                            className="rounded border px-3 py-2 transition-all bg-blue-500 text-blue-100 hover:bg-blue-600">
                                        Create Channel
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

export default CreateChannelModal
