import dayjs from '../dayjs'
import create from 'zustand'
import { RefreshToken } from '../types'

interface TokenManagerInterface {
  mainTokenId: number
  tokens: RefreshToken[]

  init: (tokens: RefreshToken[], mainTokenId: number) => void
  replaceToken: (tokens: RefreshToken) => void
  expireToken: (id: number) => void
  setMainTokenId: (id: number) => void
}

export const useTokenManager = create<TokenManagerInterface>((set, get) => ({
  tokens: [],
  mainTokenId: 0,

  init: (tokens, mainTokenId) =>
    set(() => ({
      tokens,
      mainTokenId,
    })),

  replaceToken: (token) => {
    let tokens = get().tokens
    const tokenIndex = tokens.findIndex(
      (x) => x.character_id == token.character_id
    )
    if (tokenIndex >= 0) {
      tokens[tokenIndex] = token
    } else {
      tokens.push(token)
    }
    set(() => ({
      tokens,
    }))
  },

  expireToken: (id) => {
    let token = get().tokens.find((x) => x.character_id == id)!
    token.expires_on = dayjs().utc().toISOString()
    let tokens = get().tokens
    const tokenIndex = tokens.findIndex(
      (x) => x.character_id == token.character_id
    )
    if (tokenIndex >= 0) {
      tokens[tokenIndex] = token
    } else {
      tokens.push(token)
    }
    set(() => ({
      tokens,
    }))
  },

  setMainTokenId: (mainTokenId) =>
    set(() => ({
      mainTokenId,
    })),
}))
