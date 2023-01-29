import React from 'react'
import axios from 'axios'
import dayjs from '../../scripts/dayjs'
import { route } from '../../scripts/helpers'
import { useTokenManager } from '../../scripts/Stores'
import { RefreshToken } from '../../scripts/types'

const useTokens = () => {
  const tokens = useTokenManager((state) => state.tokens)
  const replaceToken = useTokenManager((state) => state.replaceToken)
  const expireToken = useTokenManager((state) => state.expireToken)

  const isExpired = (token: RefreshToken) => {
    return dayjs(token.expires_on)
      .subtract(5, 'minutes')
      .isBefore(dayjs().utc())
  }

  const fetchToken = async (characterId: number) => {
    let token = tokens.find((x) => x.character_id == characterId)!

    if (isExpired(token)) {
      const response = await axios.post<RefreshToken>(
        route('token.refresh', { token: token.character_id })
      )
      token = response.data
      replaceToken(token)
    }

    return token.token
  }

  return { fetchToken, expireToken }
}

export default useTokens
