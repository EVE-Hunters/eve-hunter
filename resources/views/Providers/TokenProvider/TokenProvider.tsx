import React, { HTMLAttributes, useContext, useEffect, useState } from 'react'
import { RefreshToken } from '../../../scripts/types'
import * as dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import axios from 'axios'
import { route } from '../../../scripts/helpers'
import { useTokenManager } from '../../../scripts/Stores/TokenManager'

dayjs.extend(utc)

interface TokenProviderProps extends React.PropsWithChildren {
  tokens?: RefreshToken[]
  mainTokenId: number
}

export const TokenProviderContext = React.createContext<{
  getToken: (characterId: number) => Promise<string | undefined>
}>(null!)

const TokenProvider: React.FC<TokenProviderProps> = ({ ...props }) => {
  const tokens = useTokenManager((state) => state.tokens)
  const init = useTokenManager((state) => state.init)
  const replaceToken = useTokenManager((state) => state.replaceToken)

  const isExpired = (token: RefreshToken) => {
    return dayjs(token.expires_on)
      .subtract(5, 'minutes')
      .isBefore(dayjs().utc())
  }

  const fetchToken = async (characterId: number) => {
    let token = tokens.find((x) => x.character_id == characterId)

    if (isExpired(token!)) {
      const response = await axios.post<RefreshToken>(
        route('token.refresh', { token: token?.character_id! })
      )
      token = response.data
      replaceToken(token)
    }

    return token?.token!
  }

  useEffect(() => {
    init(props.tokens ?? [], props.mainTokenId)
  }, [])

  return (
    <TokenProviderContext.Provider
      value={{
        getToken: fetchToken,
      }}
    >
      {props.children}
    </TokenProviderContext.Provider>
  )
}

export const useTokenProvider = () => {
  const context = useContext(TokenProviderContext)
  if (context == null) {
    throw new Error('Cannot use this hook outside of a the token provider')
  }

  return context
}
export default TokenProvider
