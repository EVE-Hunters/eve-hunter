import React, {useEffect, useRef, useState} from 'react';
import ApplicationLayout from "../layouts/ApplicationLayout";
import {useCharacters} from "../hooks/useCharacters";
import Websocket from "../http/Websocket";
import AuthApi from "../httpClient/AuthApi";
import SubView from "./SubView";
import LocationApi from "../httpClient/LocationApi";
import LocationHistory from '../components/LocationHistory'
import SystemItem from "../components/Map/SystemItem";
import Map from "../components/Map/Map";
import Hunting from "./Hunting";


const Home: React.FC = () => {
    const {characters, mainCharacter} = useCharacters();
    const [renderSub, setRenderSub] = useState<boolean>(true);

    const FetchLocation = () => {
        let char_id = characters.map(x => x.character_id)
        console.log(char_id, characters);
        LocationApi.updateLocation({
            character_id: char_id
        })
    }

    return (
        <ApplicationLayout>
            <div className="w-full border-b">
                <h1 className="text-xl">Hunter Tool</h1>

                <div className="my-2">
                    Register additional Hunters in the account page
                </div>

                <div className="my-2">
                    Hunt from the hunting page.
                </div>
            </div>

        </ApplicationLayout>
    )
}

export default Home
