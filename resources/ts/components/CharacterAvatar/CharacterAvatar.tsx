import React from 'react';
import {CharacterInterface} from "../../interfaces/User/CharacterInterface";

interface CharacterAvatarInterface {
    character: CharacterInterface|null,
    size?: 32|64|128|256|512|1024
}

const CharacterAvatar: React.FC<CharacterAvatarInterface> = ({character, size= 128}) => {

    if(!character) return null

    let imgUrl = `https://images.evetech.net/characters/${character?.character_id}/portrait?size=${size}`

    return (
        <img className="rounded-full shadow-md" src={imgUrl} alt={`portrait of ${character.name}`} />
    )

}

export default CharacterAvatar
