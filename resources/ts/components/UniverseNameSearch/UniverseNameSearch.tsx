import {Combobox, Transition} from '@headlessui/react';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {HiCheck, HiSearch} from 'react-icons/hi';
import {UniverseName} from "../../interfaces/User/UniverseNameInterface";
import UniverseNameClient from "../../httpClient/UniverseNameClient";
import EveImage from "../EveImage";
import UniverseNameDisplay from "./UniverseNameDisplay";

interface UniverseNameSearch {
    onSelect: (select: UniverseName) => void
}

const UniverseNameSearch: React.FC<UniverseNameSearch> = ({onSelect}) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const [names, setNames] = useState<UniverseName[]>([])

    const [selectedName, setSelectedName] = useState<UniverseName | null>(null)

    const searchTimeout = useRef<NodeJS.Timeout>(setTimeout(() => {
    }));


    useEffect(() => {
        if (selectedName != null)
            onSelect && onSelect(selectedName)

        setSearchValue('')

    }, [selectedName])

    useEffect(() => {
        clearTimeout(searchTimeout.current);
        if (searchValue.trim() != '') {
            searchTimeout.current = setTimeout(() => {
                UniverseNameClient.search(searchValue).then((data: any) => {
                    setNames(data);
                })
            }, 500)
        }
    }, [searchValue])

    return (
        <>
            <Combobox value={selectedName} onChange={onSelect}>
                <div className="relative mt-1">
                    <div
                        className="relative w-full border text-left bg-white rounded overflow-hidden cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
                        <Combobox.Input
                            className="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
                            onChange={e => setSearchValue(e.target.value)}/>
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <HiSearch className="w-5 h-5 text-gray-400" aria-hidden="true"/>
                        </Combobox.Button>
                    </div>
                    <Transition as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setSearchValue('')}>
                        <Combobox.Options
                            className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {names.length === 0 && searchValue !== '' ? (
                                <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                                    No Entities Found
                                </div>
                            ) : (
                                names.map(entity => (
                                    <Combobox.Option key={entity.entity_id} className={({active}) =>
                                        `cursor-default select-none relative py-2 px-3 flex items-center space-x-2 ${
                                            active ? 'text-white bg-teal-600' : 'text-gray-900'
                                        }`
                                    } value={entity}>
                                       <UniverseNameDisplay entity={entity} />
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>

        </>
    )
}

export default UniverseNameSearch
