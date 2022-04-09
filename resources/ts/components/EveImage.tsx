import React from 'react';
import {EveCategories} from "../interfaces/eve/TypeInterfaces";

interface EveImageInterface {
    entity_id: number,
    entity: EveCategories
    size?: 32|64|128|256|512|1024
    className?: string
}

const EveImage: React.FC<EveImageInterface> = ({className= '', entity_id, entity, size=32}) => {

    let type = entity == 'characters' ? 'portrait' : entity == 'types' ? 'icon' : 'logo';

    let imgUrl = `https://images.evetech.net/${entity}/${entity_id}/${type}?size=${size}`

    return (
        <img className={className} src={imgUrl} alt='Eve Entity image' />
    )
}

export default EveImage
