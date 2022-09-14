import React, {Suspense, useContext, useEffect, useMemo, useState} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import AuthApi from '../httpClient/AuthApi';
import {useNavigate} from 'react-router-dom';
import {UserInterface} from '../interfaces/User';
import CharacterProvider from './CharacterProvider';
import {ChannelInterface} from '../interfaces/User/ChannelInterface';
import AccountApi from '../httpClient/AccountApi';
import ChannelsProvider from './ChannelsProvider';
import useSdeStore from '../stores/sde/SdeStore';
import SdeClientApi from '../httpClient/SdeApi';
import { CharacterInterface } from '../interfaces/User/CharacterInterface';




const AuthProvider: React.FC = ({children}) => {
	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [user, setUser] = useState<UserInterface | null>(null);
	const [isInitializing, setIsInitializing] = useState<boolean>(true);
    const [ characters, setCharacters ] = useState<CharacterInterface[]>([])
    const [ mainCharacterId, setMainCharacterId ] = useState<number|null>(null)
    const [ huntingCharacters, setHuntingCharacters ] = useState<number[]>([]);


    const {setGates, setSystems} = useSdeStore((state) => ({
        setSystems: state.setSystems,
        setGates: state.setGates
    }))

    const getCharacters = async () => {
        //Request Characters from server if authenticated
        let response = await AuthApi.characters();

        setCharacters(response.characters);
        let main = response.characters.find(character => character.character_id === user?.main_character_id) ?? null
        let hunters = response.hunters.map(character => character.character_id);
        console.log('main character:', main)
        //setMainCharacterId(main?.character_id ?? null)
        setHuntingCharacters(hunters)
    }


	const finishedInitializing = () => {
		setIsInitializing(false);
	};


	const SetCurrentChannel = (channel: ChannelInterface|null)=>{
		AccountApi.setChannel(channel);
	};

    const updateHuntingCharacters = (chars: number[]) => {
        AccountApi.synHunters(chars).then(() => {
            setHuntingCharacters(chars);
        })

    }

    const updateMainCharacter = (char: CharacterInterface) => {
        AccountApi.makeMainCharacter(char.character_id).then(()=>{
            setMainCharacterId(char.character_id);
        });
    }

    const removeCharacter = (character: CharacterInterface) => {
        AccountApi.removeCharacter(character.character_id).then((data:any) => {
            if(data.character_deleted){
                setCharacters(val => [...val.filter(c => c.character_id !== character.character_id)])
            }
        })
    }


	const getCurrentIdentity = () => {
		//Query server for authenticated user
		AuthApi.identity().then(async (response) => {
			// Set the authenticated user and the authentication stats
			setUser(response.user);
            setMainCharacterId(response.user.main_character_id);

            //Load Characters
            getCharacters();

            //load Sde
            //let sdeResponse = await SdeClientApi.fetchSde();
            //setSystems(sdeResponse.systems)
            //setGates(sdeResponse.gates)



			setIsAuthenticated(true);
            finishedInitializing();
		}).catch(error => {
			navigate('/login');
			finishedInitializing();
		});
	};

	useEffect(() => {
		getCurrentIdentity();
	}, []);

	const value = {
		isAuthenticated,
		isInitializing,
		user,
		reloadIdentity: getCurrentIdentity,
		SetCurrentChannel,
        characters,
        mainCharacter: characters.find(x => x.character_id == mainCharacterId),
        huntingCharacters,
        updateHuntingCharacters,
        updateMainCharacter,
        removeCharacter
	};

    if(isInitializing){
        return (
            <div className="w-full h-full flex">
                <div className="flex w-full flex-col">
                    {/* Application Header */}
                    <div className="h-8 bg-sky-700 text-sky-100 flex px-4 py-1">
                        <span>Blops Hunter</span>
                    </div>
                    <div className="flex h-full justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"/>
                    </div>
                </div>

            </div>
        )
    }

	return (
		<AuthContext.Provider value={value}>
                <ChannelsProvider>
                    {children}
                </ChannelsProvider>
		</AuthContext.Provider>
	);
};

export default AuthProvider;
