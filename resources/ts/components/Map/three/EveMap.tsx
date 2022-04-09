import React, {useEffect, useState} from 'react';
import {CentroidInterface, Connection, SolarSystemInterface} from "../../../interfaces/Map/MapInterfaces";
import LocationApi from "../../../httpClient/LocationApi";
import {Line} from "@react-three/drei";
import {useThree} from "@react-three/fiber";
import System from "./System";
import {Vector3} from "three";
import {useMapControls} from "../../../hooks/Map/useMapControls";
import {useHuntingLocationContext} from "../../../hooks/Location/useHuntingLocationContext";
import {useMapSettingsStore} from "../../../store";

interface EveMapComponentInterface {
    SourceSystem: SolarSystemInterface,
    nearBySystems: SolarSystemInterface[],
    connections: Connection[]
}

const EveMap: React.FC<EveMapComponentInterface> = ({SourceSystem, nearBySystems, connections}) => {

    const { setCoordinates } = useMapControls();
    const jumpRange = useMapSettingsStore((state)=>state.jumpRange)
    const maxSecurity = useMapSettingsStore((state)=>state.maxSecurity)


    const SetCameraPosition = () => {
        let v = new Vector3()
        SourceSystem ? setCoordinates(
            {x: 2, y: 2, z: 2},
            {x: 0,y: 0,z: 0}) :
            setCoordinates({x:0, y:0, z:0}, {x:0, y:0, z:0})
    }

    useEffect(() => {
        SetCameraPosition()
    }, [SourceSystem])

    return (
        <>
            {SourceSystem && nearBySystems.filter(s => (s.jumps ?? 0) <= jumpRange).map((s, i) => {
                if(s.security > maxSecurity/100) return null
                return (<System system={s} source={SourceSystem} key={s.system_id} position={[s.x, s.y, s.z]}/>)
            })}
            {connections.filter(s=> (s.jumps ?? 0) < jumpRange).map((c, i) => {
                if(c.system1.security > maxSecurity/100 || c.system2.security > maxSecurity/100) return null
                return (<Line key={i}
                              points={[[c.system1.x, c.system1.y, c.system1.z], [c.system2.x, c.system2.y, c.system2.z]]}
                              color={c.jumps <= jumpRange ? 'green' : 'red'}
                              lineWidth={1}>
                </Line>)
            })}

        </>
    )
}

export default EveMap
