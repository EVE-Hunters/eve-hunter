import axios from 'axios'
import React, { HTMLAttributes, useEffect, useRef } from 'react'
import {
  useChannelStore,
  useHuntingStore,
  useMapStore,
  useSdeStore,
  useTokenManager,
} from '../../../scripts/Stores'
import { useTokenProvider } from '../TokenProvider/TokenProvider'

import { CharacterLocationResponse } from '../../../scripts/types'

import { route } from '../../../scripts/helpers'

interface UiSdeProviderProps extends React.PropsWithChildren {}

type UiSdeContext = {
  setDestination: (characterId: number | number[], system_id: number) => void
}

export const UiSdeProviderContext = React.createContext<UiSdeContext>(null!)

const UiSdeProvider: React.FC<UiSdeProviderProps> = ({ ...props }) => {
  const SolarSystems = useSdeStore((state) => state.SolarSystems)
  const stagingSystemId = useChannelStore((state) => state.stagingSystemId)
  const tokens = useTokenManager((state) => state.tokens)
  const tracking = useHuntingStore((state) => state.tracking)
  const hunters = useHuntingStore((state) => state.hunters)
  const primaryHunter = useHuntingStore((state) => state.primaryHunter)
  const locations = useMapStore((state) => state.hunterLocations)
  const huntingSystemId = useHuntingStore((state) => state.huntingSystemId)
  const currentLocations = useHuntingStore((state) => state.currentLocations)
  const setCurrentLocation = useHuntingStore((state) => state.setLocation)
  const setHuntingSystemId = useHuntingStore(
    (state) => state.setHuntingSystemId
  )

  //const { communicateLocation } = useChannels()
  const { getToken } = useTokenProvider()

  const fetchLocationRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (tracking == true) {
      fetchLocationRef.current = setInterval(() => {
        hunters.forEach((id) => {
          getLocation(id)
        })
      }, 5000)
    } else {
      clearInterval(fetchLocationRef.current)
    }
    return () => {
      clearInterval(fetchLocationRef.current)
    }
  }, [tracking])

  const getLocation = async (characterId: number) => {
    const token = await getToken(characterId)
    axios
      .get<CharacterLocationResponse>(
        `https://esi.evetech.net/v2/characters/${characterId}/location/?token=${token}`
      )
      .then((response) => {
        const currentLocationId = currentLocations[characterId]
        setCurrentLocation(characterId, response.data.solar_system_id)
        if (currentLocationId.system_id != response.data.solar_system_id) {
          axios.get(
            route('api.broadcast.location', {
              character: characterId,
              system: response.data.solar_system_id,
            })
          )
        }
        if (characterId == primaryHunter) {
          if (
            response.data.solar_system_id === stagingSystemId &&
            currentLocationId.system_id == huntingSystemId
          ) {
            setHuntingSystemId(null)
            return
          }

          const newSystem = SolarSystems.find(
            (x) => x.system_id == response.data.solar_system_id
          )

          if (
            stagingSystemId == currentLocationId.system_id &&
            newSystem?.isWormhole == false &&
            huntingSystemId == null
          ) {
            setHuntingSystemId(response.data.solar_system_id)
          }
        }
      })
  }

  const setDestination = (
    characterId: number | number[],
    system_id: number
  ) => {
    if (!Array.isArray(characterId)) {
      characterId = [characterId]
    }
    characterId.forEach(async (id) => {
      const token = await getToken(id)
      axios.post(
        `https://esi.evetech.net/v2/ui/autopilot/waypoint/?destination_id=${system_id}&clear_other_waypoints=true&add_to_beginning=false&token=${token}`
      )
    })
    axios.get(route('api.broadcast.destination', { system: system_id }))
  }

  const counter = useRef<number>(0)
  counter.current++

  return (
    <UiSdeProviderContext.Provider
      value={{
        setDestination,
      }}
    >
      <>
        UI Sde Provier: {counter.current}
        {props.children}
      </>
    </UiSdeProviderContext.Provider>
  )
}

export const useUiSde = () => {
  const context = React.useContext(UiSdeProviderContext)
  if (context == null) {
    throw new Error('Cannot use this hook outside the UiSdeProvider')
  }

  return context
}
export default UiSdeProvider
