import { useEffect, useState, useRef } from "react";
import notify from "../../helpers/notify";
import Websocket from "../../http/Websocket";
import { HuntingFromInterface } from "../../interfaces/Broadcasts/hunting";
import { ChannelMember } from "../../interfaces/Http/WebsocketSubscription";
import { useChannelStore } from "../../stores/ChannelStore";
import { useMapStore } from "../../stores/Map/MapStore";
import { useCharacterLocations } from "../../stores/UserLocationsStores";
import { useAuth } from "../useAuth";
import { useChannels } from "../useChannels";


const useHunterLocations = () => {

    const {user} = useAuth();
    const MapStore = useMapStore();
    const {ActiveChannel} = useChannels();

    const ChannelStore = useChannelStore();
    const [CurrentChannel, setCurrentChannel] = useState<string>('')
    const PrevChannel = useRef<string>('');

    const updateCharacterLocation = useCharacterLocations((state) => state.updateCharacterLocation);


    useEffect(() => {
        if(user){
            Websocket.private(`User.${user.id}`)
                .listen('.hunting.from', (data: HuntingFromInterface) => {
                    MapStore.setHuntingSystem(data.system)
                })
                .listen('.waypoint.set', (data: any) => {
                    notify("Waypoint set", `Your hunter's destinations have been set to ${data.system}`)
                })

        }

        return () => {
            if(user){
                Websocket.leave(`User.${user.id}`)

            }
        }
    }, [])

    /**
     * If the channel changes, set the new Staging system
     */
    useEffect(() => {
        MapStore.setStagingSystem(null)
        if(ActiveChannel != null){
            MapStore.setStagingSystem(ActiveChannel.staging_system)
            setCurrentChannel(`hunters.${ActiveChannel.id}`)
        }else{
            setCurrentChannel('')
        }
    }, [ActiveChannel])

    /**
     * Update websocket connection on channel change
     */
    useEffect(() => {
        if(PrevChannel.current != '')
            Websocket.leave(PrevChannel.current)

        if(CurrentChannel != ''){
            Websocket.join(CurrentChannel)
                .here((users: any) => {
                    ChannelStore.setMembers(users)
                }).joining((user: ChannelMember) => {
                    ChannelStore.addMember(user)
                }).leaving((user: ChannelMember) => {
                    ChannelStore.removeMember(user);
                }).listen('.destination.set', (e: any) => {
                    ChannelStore.addMessage(e)
                }).listen('.location.updated', (e:any) => {
                    updateCharacterLocation(e)
            })
        }
        PrevChannel.current = CurrentChannel

        return () => {
            if(CurrentChannel != '')
                Websocket.leave(CurrentChannel)
        }

    }, [CurrentChannel])

    return [];
}

export default useHunterLocations;
