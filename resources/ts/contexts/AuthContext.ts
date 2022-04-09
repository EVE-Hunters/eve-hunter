import React from "react";
import UserInterface from "../interfaces/User/UserInterface";
import {ChannelInterface} from "../interfaces/User/ChannelInterface";

type AuthContext = {
    isAuthenticated: boolean
    isInitializing: boolean,
    user: UserInterface|null,
    reloadIdentity: () => void,
    SetCurrentChannel: (channel: ChannelInterface|null) => void,
}

export const AuthContext = React.createContext<AuthContext>({
    isAuthenticated: false,
    isInitializing: true,
    user: null,
    reloadIdentity: () => {},
    SetCurrentChannel: (channel) => {},
});


