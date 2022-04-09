import React from 'react';
import {UniverseName} from "../../interfaces/User/UniverseNameInterface";
import EveImage from "../EveImage";

interface UniverseNameDisplayInterface {
    entity: UniverseName
}

const UniverseNameDisplay: React.FC<UniverseNameDisplayInterface> = ({entity}) => {
    return (
        <div className="flex space-x-2 py-0.5 items-center">
            <EveImage entity_id={entity.entity_id} entity={entity.category}
                      className="rounded-full shadow w-10 h-10"/>
            <div className="flex flex-col">
                <span className="font-medium">{entity.name}</span>
                <span className="font-thin italic">{entity.category}</span>
            </div>
        </div>
    )
}

export default UniverseNameDisplay
