import React, {Fragment, useState} from 'react';
import {useCharacters} from "../../hooks/useCharacters";
import {useAuth} from "../../hooks/useAuth";
import CharacterAvatar from '../CharacterAvatar';
import {HiTrash, HiUpload} from "react-icons/hi";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import {HiDotsVertical} from 'react-icons/hi';
import ConfirmRemoveCharacterModal from "./ConfirmRemoveCharacterModal";
import {CharacterInterface} from '../../interfaces/User/CharacterInterface';
import {Menu, Transition} from '@headlessui/react';

const CharacterManager: React.FC = () => {
    const {
        characters,
        mainCharacter,
        updateMainCharacter
    } = useCharacters()

    const [removingCharacter, setRemovingCharacter] = useState<CharacterInterface | null>(null)

    return (
        <>
            {removingCharacter && <ConfirmRemoveCharacterModal character={removingCharacter}
                                                               onCancel={() => setRemovingCharacter(null)}/>}

            <div>
                <div className="w-full text-2xl font-semibold">
                    Characters
                </div>
                <a href="/auth/sso/redirect" className="inline-block my-2 rounded w-full px-3 py-2 text-center bg-gray-200 shadow-md hover:bg-gray-300">
                    Add Character
                </a>

                <div className="bg-white px-2 py-1 rounded max-h-96">

                    <div className="flex items-center px-2 py-1 my-2 border-b my-1">
                        <div className="w-10 h-10">
                            <CharacterAvatar character={mainCharacter}/>
                        </div>
                        <span className="px-2">{mainCharacter?.name}</span>
                        <div className="ml-auto"></div>
                    </div>

                    {characters.filter(ch => ch.character_id != mainCharacter?.character_id).map(ch => {
                        return (
                            <div key={ch.character_id} className="flex items-center px-2 py-1 my-2 border-b">
                                <div className="w-10 h-10">
                                    <CharacterAvatar character={ch}/>
                                </div>
                                <span className="px-2">{ch.name}</span>
                                <div className="ml-auto"></div>
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="h-4 w-4 cursor-pointer">
                                           <HiDotsVertical className="w-4 h-4 cursor-pointer"/>
                                        </Menu.Button>
                                    </div>
                                    <Transition as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items
                                            className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="px-1 py-1">
                                                <Menu.Item>
                                                    <div
                                                        className="w-full cursor-pointer flex px-2 py-1 space-x-1 items-center hover:bg-gray-600 hover:text-white"
                                                        onClick={() => updateMainCharacter(ch)}>
                                                        <HiUpload></HiUpload>
                                                        Make Main
                                                    </div>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <div
                                                        onClick={() => setRemovingCharacter(ch)}
                                                        className="w-full cursor-pointer flex px-2 py-1 space-x-1 items-center hover:bg-gray-600 hover:text-white">
                                                        <HiTrash/>
                                                        Remove Character
                                                    </div>
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CharacterManager
