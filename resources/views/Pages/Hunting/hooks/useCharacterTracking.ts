import {
  useChannelStore,
  useHuntingStore,
  useSdeStore,
} from '../../../../scripts/Stores'
import { useBroadcasting, useEsiRequests } from '../../../hooks'
import { useInterval } from '../../../hooks/useInterval'

export const useCharacterTracking = () => {
  const { SolarSystems } = useSdeStore()
  const { esiGetLocation } = useEsiRequests()
  const { broadcastLocationBatch } = useBroadcasting()
  const hunters = useHuntingStore((state) => state.hunters)
  const stagingSystemId = useChannelStore((state) => state.stagingSystemId)
  const huntingSystemId = useHuntingStore((state) => state.huntingSystemId)
  const currentLocations = useHuntingStore((state) => state.currentLocations)
  const setLocationBatch = useHuntingStore((state) => state.setLocationBatch)
  const setReturnSystemId = useHuntingStore((state) => state.setReturnSystemId)
  const tracking = useHuntingStore((state) => state.tracking)
  const setHuntingSystemId = useHuntingStore(
    (state) => state.setHuntingSystemId
  )
  const primaryHunter = useHuntingStore((state) => state.primaryHunter)

  useInterval(
    () => {
      let trackingCharacters = hunters
      if (!trackingCharacters.includes(primaryHunter!)) {
        trackingCharacters.push(primaryHunter!)
      }

      esiGetLocation(trackingCharacters).then((response) => {
        broadcastLocationBatch(response)
        setLocationBatch(response)
        const newLocationId = response.find(
          (x) => x.character_id == primaryHunter
        )!.system_id

        const previousLocationId = currentLocations.find(
          (x) => x.character_id == primaryHunter
        )?.system_id

        if (
          huntingSystemId != null ||
          newLocationId == previousLocationId ||
          newLocationId == stagingSystemId
        ) {
          console.log('Nothing really new')
          return
        }

        const newSystem = SolarSystems.find((x) => x.system_id == newLocationId)
        if (
          newSystem?.isWormhole == false &&
          previousLocationId == stagingSystemId
        ) {
          console.log('Setting Hunting System')
          setReturnSystemId(newSystem.system_id)
          setHuntingSystemId(newSystem.system_id)
        }
      })
    },
    tracking ? 5000 : null
  )
}
