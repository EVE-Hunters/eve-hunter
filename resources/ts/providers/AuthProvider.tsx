import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import AuthApi from "../httpClient/AuthApi";
import {useNavigate} from "react-router-dom";
import {UserInterface} from "../interfaces/User";
import CharacterProvider from "./CharacterProvider";
import {ChannelInterface} from "../interfaces/User/ChannelInterface";
import AccountApi from "../httpClient/AccountApi";
import ChannelsProvider from "./ChannelsProvider";


const AuthProvider: React.FC = ({children}) => {
    let navigate = useNavigate()

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserInterface | null>(null)
    const [isInitializing, setIsInitializing] = useState<boolean>(true)

    const finishedInitializing = () => {
        setIsInitializing(false)
    }


    const SetCurrentChannel = (channel: ChannelInterface|null)=>{
        AccountApi.setChannel(channel)
    }

    const getCurrentIdentity = () => {
        //Query server for authenticated user
        AuthApi.identity().then(response => {
            // Set the authenticated user and the authentication stats
            setUser(response.user)
            setIsAuthenticated(true)
        }).catch(error => {
            navigate('/login')
            finishedInitializing()
        })
    }

    useEffect(() => {
        getCurrentIdentity()
    }, [])

    const value = {
        isAuthenticated,
        isInitializing,
        user,
        reloadIdentity: getCurrentIdentity,
        SetCurrentChannel
    }

    return (
        <AuthContext.Provider value={value}>
            <ChannelsProvider>
                <CharacterProvider finished={finishedInitializing}>
                    {children}
                </CharacterProvider>
            </ChannelsProvider>
        </AuthContext.Provider>
    )
}

export default AuthProvider
