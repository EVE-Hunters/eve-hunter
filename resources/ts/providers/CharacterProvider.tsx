import React, {useEffect, useState} from 'react';

import {CharactersContext} from '../contexts/CharactersContext'
import {useAuth} from "../hooks/useAuth";
import AuthApi from "../httpClient/AuthApi";
import AccountApi from '../httpClient/AccountApi';
import {CharacterInterface} from "../interfaces/User/CharacterInterface";
import { useHuntingCharacters, useMainCharacter } from '../stores/account/CharacterStore';

interface CharacterProviderInterface {
    finished?: Function,
}

let hunterSyncTimeout: any = null;
let mainCharTimeout: any = null;


const CharacterProvider: React.FC<CharacterProviderInterface> = ({children, finished}) => {
    const { isAuthenticated, user, reloadIdentity } = useAuth()
    //const [mainCharacter, setMainCharacter] = useMainCharacter();
    //const [huntingCharacters, setHuntingCharacters] = useHuntingCharacters();
    const [ characters, setCharacters ] = useState<CharacterInterface[]>([])
    const [ mainCharacter, setMainCharacter ] = useState<CharacterInterface|null>(null)
    const [ huntingCharacters, setHuntingCharacters ] = useState<number[]>([]);

    const updateHuntingCharacters = (chars: number[]) => {
        setHuntingCharacters(chars);
    }

    const updateMainCharacter = (char: CharacterInterface) => {
        setMainCharacter(char);
    }

    const removeCharacter = (character: CharacterInterface) => {
        AccountApi.removeCharacter(character.character_id).then((data:any) => {
            if(data.character_deleted){
                setCharacters(val => [...val.filter(c => c.character_id !== character.character_id)])
            }
        })
    }

    useEffect(() => {
        clearTimeout(mainCharTimeout)
        mainCharTimeout = setTimeout(() => {
            if(mainCharacter?.character_id)
                AccountApi.makeMainCharacter(mainCharacter.character_id).then(()=>{
                    reloadIdentity()
                });
        },500)
    }, [mainCharacter])

    useEffect(() => {
        clearTimeout(hunterSyncTimeout);
        hunterSyncTimeout = setTimeout(() => {
            AccountApi.synHunters(huntingCharacters);
        }, 1000)
    }, [huntingCharacters])


    const getCharacters = () => {
        //Request Characters from server if authenticated
        AuthApi.characters().then(response => {
            setCharacters(response.characters)
            let main = response.characters.find(character => character.character_id === user?.main_character_id) ?? null
            let hunters = response.hunters.map(character => character.character_id);
            console.log('main character:', main)
            setMainCharacter(main)
            setHuntingCharacters(hunters)
        }).finally( () => {
            finished && finished()
        })

    }

    useEffect(() => {
        isAuthenticated && getCharacters()
    }, [isAuthenticated])

    const value = {
        characters,
        mainCharacter,
        huntingCharacters,
        updateHuntingCharacters,
        updateMainCharacter,
        removeCharacter
    }

    return (
        <CharactersContext.Provider value={value}>
            {children}
        </CharactersContext.Provider>
    )
}

export default CharacterProvider
