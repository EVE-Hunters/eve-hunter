import { Combobox } from '@headlessui/react';
import React, {useEffect, useState} from 'react';
import {SolarSystemInterface} from "../../interfaces/Map/MapInterfaces";

let searchTimeout: any = null;

const SolarSystemFinder: React.FC = () => {
    const [ search, setSearch ] = useState<string>('')
    const [ selectedSystem, setSelectedSystem ] = useState<SolarSystemInterface|null>(null)
    const [ searchResults, setSearchResults ] = useState<SolarSystemInterface[]>([])

    useEffect(() => {
        clearTimeout(searchTimeout)
        if(search != ''){
            searchTimeout = setTimeout(() => {

            }, 500)
        }

    }, [search])


    return (
       <Combobox value={selectedSystem} onChange={setSelectedSystem}>
           <Combobox.Input onChange={e => setSearch(e.target.value)} />

       </Combobox>
    )
}

export default SolarSystemFinder
