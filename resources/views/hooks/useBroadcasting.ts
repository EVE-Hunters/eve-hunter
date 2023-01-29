import React from 'react'
import axios from 'axios'
import { route } from '../../scripts/helpers'
import { CharacterLocationUpdate } from '../../scripts/types'

export const useBroadcasting = () => {
  const broadcastLocation = React.useCallback(
    (character_id: number, system_id: number) => {
      return axios.get(
        route('api.broadcast.location', {
          character: character_id,
          system: system_id,
        })
      )
    },
    []
  )

  const broadcastLocationBatch = React.useCallback(
    (locations: CharacterLocationUpdate[]) => {
      return axios.post(route('api.broadcast.locations.multiple'), locations)
    },
    []
  )

  const broadcastDestinationSet = React.useCallback((system_id: number) => {
    return axios.get(route('api.broadcast.destination', { system: system_id }))
  }, [])

  const broadcastMessage = React.useCallback((message: string) => {
    return axios.post(route('api.broadcast.message'), { message })
  }, [])

  const broadcastCynoRequest = React.useCallback((system_id: number) => {
    return axios.post(route('api.broadcast.cyno', { system: system_id }))
  }, [])

  return {
    broadcastLocation,
    broadcastLocationBatch,
    broadcastDestinationSet,
    broadcastMessage,
    broadcastCynoRequest,
  }
}
