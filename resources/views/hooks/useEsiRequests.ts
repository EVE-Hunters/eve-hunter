import React from 'react'
import axios from 'axios'
import {
  CharacterLocationResponse,
  CharacterLocationUpdate,
  EsiSearchResults,
} from '../../scripts/types'
import useTokens from './useToken'

export const useEsiRequests = () => {
  const { fetchToken, expireToken } = useTokens()

  const esiCharacterSearch = async (
    characterId: number,
    search: string,
    signal?: AbortSignal
  ) => {
    const token = await fetchToken(characterId)

    const idResponse = await axios.get<{
      character: number[]
      alliance: number[]
      corporation: number[]
    }>(
      `https://esi.evetech.net/v3/characters/${characterId}/search?categories=${[
        'character',
        'alliance',
        'corporation',
      ].join(',')}&search=${search}&token=${token}`,
      { signal }
    )
    let affiliation_data: {
      alliance_id?: number
      character_id: number
      corporation_id: number
      faction_id?: number
    }[] = []
    if (idResponse.data.character?.length > 0) {
      const affiliation = await axios.post(
        `https://esi.evetech.net/v2/characters/affiliation/`,
        idResponse.data.character,
        { signal }
      )
      affiliation_data = affiliation.data
    }
    const charCorpId: number[] = []
    const charAllianceId: number[] = []
    affiliation_data.forEach((item) => {
      if (item.alliance_id != null) {
        charAllianceId.push(item.alliance_id)
      }
      charCorpId.push(item.corporation_id)
    })
    let ids = [
      ...(idResponse.data.character ?? []),
      ...(idResponse.data.alliance ?? []),
      ...(idResponse.data.corporation ?? []),
      ...charCorpId,
      ...charAllianceId,
    ]
    ids = ids.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    if (ids.length == 0) {
      return
    }
    const namesResponse = await axios.post(
      `https://esi.evetech.net/v3/universe/names`,
      ids,
      { responseType: 'json', signal }
    )
    const results: EsiSearchResults[] = []
    idResponse.data.character?.forEach((charId) => {
      const affil = affiliation_data.find((x) => x.character_id == charId)
      const name = namesResponse.data.find((x) => x.id === charId)
      results.push({
        entity_id: charId,
        name: name.name,
        type: 'character',
        alliance_id: affil?.alliance_id ?? undefined,
        corporation_id: affil?.corporation_id ?? undefined,
        corporation: namesResponse.data.find(
          (x) => x.id == affil?.corporation_id
        ),
        alliance: namesResponse.data.find((x) => x.id == affil?.alliance_id),
      })
    })
    namesResponse.data
      .filter((x) => x.category != 'character')
      .forEach((item) => {
        results.push({
          entity_id: item.id,
          type: item.category,
          name: item.name,
        })
      })
    return results
  }

  const esiSetDestination = (
    characterId: number | number[],
    system_id: number
  ) => {
    return new Promise<{
      characters: number[]
      system_id: number
    }>((resolve) => {
      if (!Array.isArray(characterId)) {
        characterId = [characterId]
      }
      characterId.forEach(async (id) => {
        const token = await fetchToken(id)
        axios
          .post(
            `https://esi.evetech.net/v2/ui/autopilot/waypoint/?destination_id=${system_id}&clear_other_waypoints=true&add_to_beginning=false&token=${token}`
          )
          .catch((error) => {
            console.log(error)
            if (error.response && error.response.status == 403) {
              expireToken(id)
            }
          })
      })

      resolve({
        characters: characterId,
        system_id: system_id,
      })
    })
  }

  const esiGetLocation = async (characterId: number[]) => {
    return new Promise<CharacterLocationUpdate[]>(async (resolve) => {
      let locations = (
        await Promise.all(
          await characterId.map(async (id) => {
            const token = await fetchToken(id)
            try {
              const response = await axios.get<CharacterLocationResponse>(
                `https://esi.evetech.net/v2/characters/${id}/location/?token=${token}`
              )
              return {
                system_id: response?.data.solar_system_id,
                character_id: id,
              }
            } catch (error) {
              console.log(error)
              expireToken(id)
              return null
            }
          })
        )
      ).filter((x) => x != null)
      resolve(locations as CharacterLocationUpdate[])
    })
  }

  return {
    esiSetDestination,
    esiGetLocation,
    esiCharacterSearch,
  }
}
