import React, {useEffect, useState} from 'react';
import Websocket from "../http/Websocket";
import {CharactersContext} from "../contexts/CharactersContext";
import LocationApi from "../httpClient/LocationApi";
import {useCharacters} from "../hooks/useCharacters";


const LocationHistory: React.FC = () => {

    const { characters } = useCharacters();

    const [messages, setMessages] = useState<Object[]>([])

    const pingLocation = () => {
        let char_id = characters.map(x => x.character_id);
        LocationApi.updateLocation({character_id: char_id})
    }

    const locationUpdates = (data: any) => {
        setMessages(arr => [...arr, data])
    }

    useEffect(() => {
        Websocket.channel('location')
            .listen('.location.updated', locationUpdates)

        const interval = setInterval(pingLocation, 5000)
        return function cleanup() {
            clearInterval(interval)
            Websocket.leaveChannel('location')
        }
    }, [characters])

    return (
        <ul>
            {messages.map((m,i) => {


            })}
        </ul>
    )
}

export default LocationHistory

/*interface LocationState {
    locations: Object[],
    interval: any,
    characters: []
}

class LocationHistory extends React.Component<any,LocationState> {

    constructor(props: any, context: any) {
        super(props, context);

        this.state  = {
            locations: [],
            interval: null,
            characters: props.characters ?? [],
        }
    }


    pingLocation(){
        let char_id = this.state.characters.map((x:any) => x.character_id);
        LocationApi.updateLocation({
            character_id: char_id
        })
    }

    addLocation(location: any){
        this.setState({
            locations: [...this.state.locations, location]
        })
    }

    componentDidMount(){

        //const characters = this.characters;
        //console.log(characters);
        Websocket.channel('location')
            .listen('.location.updated', this.addLocation)

        const interval = setInterval(this.pingLocation, 5000)
        this.setState({
            interval: interval
        })
    }

    componentWillUnmount() {
        Websocket.leave('location')
        clearInterval(this.state.interval)
        this.setState({
            interval: null
        })
    }


    render(){
        return (
            <ul>
                {this.state.locations.map((location: any, index:number) => {
                    return (
                        <li key={index}>{location.system.name}</li>
                    )
                })}
            </ul>
        )
    }
}

export default LocationHistory*/
