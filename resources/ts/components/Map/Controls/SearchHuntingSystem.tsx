import React, {Fragment, useState, useEffect} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {HiSearch} from "react-icons/hi";
import SystemSearch from "./SystemSearch";
import {useHuntingLocationContext} from "../../../hooks/Location/useHuntingLocationContext";
import {SolarSystemInterface} from "../../../interfaces/Map/MapInterfaces";


const SearchHuntingSystem: React.FC = () => {

    const {updateSourceSystem} = useHuntingLocationContext()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedSystem, setSelectedSystem] = useState<SolarSystemInterface | null>(null)

    const handleSystemSelect = (system: SolarSystemInterface | null) => {
        updateSourceSystem(system)
        setIsOpen(false);
    }

    useEffect(() => {
        if (selectedSystem != null) {
            handleSystemSelect(selectedSystem)
            setSelectedSystem(null)
        }
    }, [selectedSystem])


    return (
        <>
            <button className=""
                    onClick={() => setIsOpen(true)}>
                <HiSearch className="w-4 h-4"/>
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
                                    Search System
                                </Dialog.Title>
                                <hr/>

                                <div className="my-2">
                                    <SystemSearch onSystemSelect={setSelectedSystem}/>
                                </div>

                                <div className="flex w-full mt-2">
                                    <button onClick={() => setIsOpen(false)}
                                            className="rounded border px-3 py-2 transition-all hover:bg-gray-200">Cancel
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

export default SearchHuntingSystem
