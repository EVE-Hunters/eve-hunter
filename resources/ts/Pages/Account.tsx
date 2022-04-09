import React, {useContext} from 'react';
import {useCharacters} from "../hooks/useCharacters";
import CharacterAvatar from "../components/CharacterAvatar";
import ApplicationLayout from "../layouts/ApplicationLayout";
import CharacterManager from "../components/CharacterManager";
import ChannelManager from "../components/ChannelManager/ChannelManager";
import AvailableChannels from "../components/AvailableChannels";

const Account: React.FC = () => {

    return (
        <ApplicationLayout>
            <div className="flex space-x-2">
                <div className="w-64 ">
                    <CharacterManager/>
                </div>
                <div className="w-64">
                    <ChannelManager/>
                </div>
                <div className="w-64">
                    <AvailableChannels />
                </div>
            </div>
        </ApplicationLayout>
    )
}

export default Account
