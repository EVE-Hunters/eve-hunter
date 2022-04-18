import React, {useEffect, useState} from 'react';
import {UniverseName} from "../../../interfaces/User/UniverseNameInterface";
import { HiPlus } from '../../Icons/HeroIcons/HiPlus';
import UniverseNameSearch from "../../UniverseNameSearch/UniverseNameSearch";
import UniverseNameDisplay from "../../UniverseNameSearch/UniverseNameDisplay";

interface ChannelAccessForm {
    access: UniverseName[],
    onChange: (access: UniverseName[]) => void
}

const ChannelAccessForm: React.FC<ChannelAccessForm> = ({access = [], onChange}) => {

    const [AccessList, SetAccessList] = useState<UniverseName[]>(access)


    const removeFromList = (entity: UniverseName) => {
        SetAccessList(val => val.filter(x => x.entity_id != entity.entity_id))
    }

    const handleEntitySelect = (item: UniverseName) => {
        SetAccessList(val => [...val, item])
    }



    useEffect(() => {
        onChange(AccessList)
    }, [AccessList])

    return (
        <div>

            <UniverseNameSearch onSelect={handleEntitySelect} />

            <div className="rounded border mt-2 max-h-64 h-64 overflow-y-auto">
                {AccessList.map(entity => (
                    <div key={entity.entity_id} className="flex items-center px-3">
                        <UniverseNameDisplay entity={entity} />
                        <div className="ml-auto" />
                        <HiPlus className="w-6 h-6 transform rotate-45 cursor-pointer" onClick={() => removeFromList(entity)}/>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ChannelAccessForm
