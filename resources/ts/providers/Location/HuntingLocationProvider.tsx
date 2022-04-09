import React, {useEffect, useRef, useState} from 'react';
import {CentroidInterface, Connection, locationHistory, SolarSystemInterface} from "../../interfaces/Map/MapInterfaces";
import LocationApi from "../../httpClient/LocationApi";
import HuntingLocationContext from "../../contexts/Location";
import {useChannels} from "../../hooks/useChannels";
import Websocket from "../../http/Websocket";
import {useAuth} from "../../hooks/useAuth";
import {useCharacters} from "../../hooks/useCharacters";
import {ChannelMember} from "../../interfaces/Http/WebsocketSubscription";
import {ChannelInterface} from "../../interfaces/User/ChannelInterface";
import {useCharacterLocations} from "../../stores/UserLocationsStores";
import {useChannelStore} from "../../stores/ChannelStore";


let trackingTimer: any = null;

const HuntingLocationProvider: React.FC = ({children}) => {

    const {ActiveChannel} = useChannels()
    const {user, isAuthenticated} = useAuth()
    const {huntingCharacters} = useCharacters()
    const ChannelStore = useChannelStore();
    const updateCharacterLocation = useCharacterLocations((state) => state.updateCharacterLocation)

    const [CurrentChannel, setCurrentChannel] = useState<string>('');
    const PrevChannel = useRef<string>('');

    //Staging From
    const [StagingSystem, setStagingSystem] = useState<SolarSystemInterface | null>(null);

    //Hunting From system
    const [SourceSystem, setSourceSystem] = useState<SolarSystemInterface | null>(null)
    const [adjustment, setAdjustment] = useState<CentroidInterface>({x: 0, y: 0, z: 0})

    //Are we tracking hunter locations?
    const [tracking, setTracking] = useState<boolean>(false);

    //Other hunters in channel
    const [members, setMembers] = useState<ChannelMember[]>([])

    //Nearby systems
    const [nearBySystems, setNearBySystems] = useState<SolarSystemInterface[]>([])
    //connections
    const [connections, setConnections] = useState<Connection[]>([])
    const [connectionRange, setConnectionRange] = useState<number>(10)
    const [huntRange, setHuntRange] = useState<number>(5)

    const spawnLocationJobs = () => {
        LocationApi.updateLocation({character_id: huntingCharacters});
    }

    const toggleTracking = () => {
        setTracking(val => !val)
    }

    useEffect(() => {
        if (user) {
            Websocket.private(`User.${user.id}`)
                .listen('.hunting.from', (data: any) => {
                    console.log("hunting from: ", data)
                    //setSourceSystem(data.system)
                    updateSourceSystem(data.system)
                })
        }

        Websocket.channel('testing').listen('.test.message', (e:any)=>{
            console.log('test message', e)
        })

        return () => {
            if (user)
                Websocket.leave(`User.${user.id}`)
        }
    }, [])

    useEffect(() => {

        if (tracking) {
            trackingTimer = setInterval(spawnLocationJobs, 5000);
        }

        return () => {
            clearInterval(trackingTimer);
        }
    }, [tracking]);

    useEffect(() => {

        if (PrevChannel.current != '')
            Websocket.leave(PrevChannel.current)

        if (CurrentChannel != '') {
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
            PrevChannel.current = CurrentChannel
        }

        return () => {
            if (CurrentChannel != '')
                Websocket.leave(CurrentChannel);
        }
    }, [CurrentChannel])

    useEffect(() => {
        setStagingSystem(null)
        if (ActiveChannel != null) {
            setStagingSystem(ActiveChannel?.staging_system ?? null)
            setCurrentChannel(`hunters.${ActiveChannel.id}`)
        } else {
            setCurrentChannel('')
        }
    }, [ActiveChannel])


    const CalculateConnections = () => {
        let _connections: Connection[] = [];
        nearBySystems.forEach(s => {
            s.connections.forEach(c => {
                let connection = _connections.find(co => (co.system1.system_id === c.fromSolarSystemID && co.system2.system_id === c.toSolarSystemID) || (co.system1.system_id === c.toSolarSystemID && co.system2.system_id === c.fromSolarSystemID))
                if (connection == null) {
                    let system2 = nearBySystems.find(ns => ns.system_id === c.toSolarSystemID);
                    if (system2) {
                        let s2Jumps = system2.jumps ?? 0
                        let jumps = (s?.jumps ?? 0 > s2Jumps) ? s.jumps : system2?.jumps
                        _connections.push({system1: s, system2: system2, jumps: jumps ?? 0})
                    }
                }
            })
            setConnections(_connections);
        })
    }

    const updateSourceSystem = (system: SolarSystemInterface | null) => {
        setAdjustment({x: system?.x ?? 0, y: system?.y ?? 0, z: system?.z ?? 0})
        setSourceSystem(system)
    }

    const updateConnectionRange = (value: number) => {
        setConnectionRange(value)
    }
    const updateHuntRange = (value: number) => {
        setHuntRange(value)
    }

    useEffect(() => {
        setConnections([]);
        setNearBySystems([])
        if (SourceSystem != null) {
            LocationApi.getNearbySystems({jumps: connectionRange}, SourceSystem.system_id).then((data: any) => {
                let _systems: SolarSystemInterface[] = [];
                Object.keys(data).forEach(key => {
                    let sys = data[key];
                    sys.x = sys.x - adjustment.x
                    sys.y = sys.y - adjustment.y
                    sys.z = sys.z - adjustment.z
                    console.log(sys);
                    _systems.push(sys)
                })
                setNearBySystems(_systems)
            })
        }
    }, [SourceSystem])

    useEffect(() => {
        CalculateConnections()
    }, [nearBySystems])

    let value = {
        SourceSystem,
        updateSourceSystem,
        nearBySystems,
        connections,
        connectionRange,
        updateConnectionRange,
        huntRange,
        updateHuntRange,
        tracking,
        toggleTracking,
        StagingSystem
    }

    return (
        <HuntingLocationContext.Provider value={value}>

            {children}

        </HuntingLocationContext.Provider>
    )
}

export default HuntingLocationProvider
