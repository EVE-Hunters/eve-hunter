import React, { HTMLAttributes } from 'react'

interface CharacterTokensProps extends React.PropsWithChildren {}

const CharacterTokenContext = React.createContext<{} | null>(null)

const CharacterTokens: React.FC<CharacterTokensProps> = ({ ...props }) => {
  return <></>
}
export default CharacterTokens
