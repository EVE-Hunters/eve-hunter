import React, {Fragment} from 'react';
import {useCharacters} from "../../hooks/useCharacters";
import CharacterAvatar from "../CharacterAvatar";
import { HiChevronDown } from '../Icons/HeroIcons/HiChevronDown';
import {Popover, Transition} from '@headlessui/react';


const HunterSelector: React.FC = () => {

    const {characters, huntingCharacters, updateHuntingCharacters} = useCharacters();

    const toggleCharacterSelected = (character_id: number) => {

        if (huntingCharacters.includes(character_id)) {
            updateHuntingCharacters(huntingCharacters.filter(id => id != character_id));
        } else {
            updateHuntingCharacters([...huntingCharacters, character_id])
        }
    }

    return (

        <div className="w-full">
            <Popover as="div" className="relative w-full text-left">
                <div>
                    <Popover.Button
                        className="inline-flex justify-between  px-4 py-2 text-sm font-medium rounded-md bg-white w-full">
                        <span>Hunters ({huntingCharacters.length})</span>
                        <HiChevronDown
                            className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Popover.Panel
                            className="absolute w-full right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                                {characters.map(char => (

                                    <div
                                        key={char.character_id}
                                        onClick={() => toggleCharacterSelected(char.character_id)}
                                        className={`p-2 cursor-pointer hover:bg-blue-400 hover:text-blue-100 flex items-center select-none space-x-1 ${huntingCharacters.includes(char.character_id) ? 'bg-blue-300' : ''}`}>
                                        <div>
                                            <input type="checkbox" className="text-blue-400"
                                                    readOnly
                                                   checked={huntingCharacters.includes(char.character_id)}/>
                                        </div>
                                        <div className="w-8 h-8">
                                            <CharacterAvatar character={char}/>
                                        </div>
                                        <div>{char.name}</div>
                                    </div>

                                ))}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </div>
            </Popover>
        </div>

    )
}

export default HunterSelector
