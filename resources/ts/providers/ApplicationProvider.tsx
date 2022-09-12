import React from 'react'
import { useHuntingCharacters, useMainCharacter } from '../stores/account/CharacterStore';

interface ApplicationProviderProps extends React.PropsWithChildren<HTMLDivElement> {

}

const ApplicationProvider: React.FC<ApplicationProviderProps> = ({...props}) => {


    return (
        <></>
    )
}
export default ApplicationProvider
