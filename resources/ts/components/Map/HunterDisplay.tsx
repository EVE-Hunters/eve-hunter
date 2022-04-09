import {Popover, Transition} from '@headlessui/react';
import React, {Fragment, useState} from 'react';
import {useCharacterLocations} from "../../stores/UserLocationsStores";
import {HiChevronDown, HiSave} from "react-icons/hi";

interface HunterDisplayInterface {
    system_id: number,
}


const HunterDisplay: React.FC<HunterDisplayInterface> = ({system_id}) => {

    const inhabitants = useCharacterLocations(state => state.SolarSystemInhabitants[system_id] ?? [])
    const [showList, setShowList] = useState<boolean>(false)


    if (inhabitants.length > 0)
        return (
            <Popover>
                {({open}) => (
                    <>

                        <Popover.Button
                            className="w-full px-2 text-sm cursor-pointer">
                            <div className="flex">
                                <div className="ml-auto"></div>
                                <span>Hunters ({inhabitants.length})</span>
                                <HiChevronDown className="w-4 h-4"/>
                            </div>

                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel onMouseEnter={() => setShowList(true)}
                                           onMouseLeave={() => setShowList(false)}>
                                <div className="absolute flex flex-col max-h-64 text-left bg-white p-2 rounded z-10"
                                >
                                    {inhabitants.map(char => (
                                        <div>{char.name}</div>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        )
    else return null
}

export default HunterDisplay
