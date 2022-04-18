import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {CharacterInterface} from "../../interfaces/User/CharacterInterface";
import {useCharacters} from "../../hooks/useCharacters";

interface RemoveCharacterModal {
    character: CharacterInterface
    onCancel: () => void,
}


const ConfirmRemoveCharacterModal: React.FC<RemoveCharacterModal> = ({character, onCancel}) => {

    const {removeCharacter} = useCharacters()

    const [isOpen, setIsOpen] = useState<boolean>(true)

    const handleClose = () => {
        onCancel()
    }

    const handleRemoveCharacter = () => {
        removeCharacter(character)

        handleClose()
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" onClose={() => handleClose()} className="fixed z-10 inset-0 overflow-y-auto">
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
                                    Remove character
                                </Dialog.Title>

                                <div className="my-2">
                                    <Dialog.Description>
                                        Are you sure you want to remove <strong>{character.name}</strong> from your
                                        account?
                                    </Dialog.Description>
                                </div>

                                <div className="flex w-full mt-2">
                                    <button onClick={() => handleClose()}
                                            className="rounded border px-3 py-2 transition-all hover:bg-gray-200">Cancel
                                    </button>
                                    <div className="ml-auto"></div>
                                    <button onClick={() => handleRemoveCharacter()}
                                            className="rounded border px-3 py-2 transition-all bg-red-500 text-red-100 hover:bg-red-600">Remove
                                        Character
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

export default ConfirmRemoveCharacterModal
