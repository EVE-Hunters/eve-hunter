import React from 'react';
import CharacterAvatar from "../CharacterAvatar";
import {useAuth} from "../../hooks/useAuth";
import {useCharacters} from "../../hooks/useCharacters";

interface UserDisplayInterface {
    avatarOnly?: boolean
}

const UserDisplay: React.FC<UserDisplayInterface> = ({avatarOnly= false}) => {
    const { mainCharacter } = useCharacters()



    return (

        <div className="w-full flex px-4 space-x-2 text-gray-200 items-center">
            <div className="w-10 h-10 rounded-full overflow-none">
                <CharacterAvatar character={mainCharacter}/>
            </div>
            {!avatarOnly &&
            <>
                <div className=" font-thin flex flex-col">
                    <span className="text-xl">{mainCharacter?.name}</span>
                    <span className="text-xs">{mainCharacter?.corporation?.name ?? 'loading...'}</span>
                </div>
              </>
            }
        </div>
    )
}

export default UserDisplay
