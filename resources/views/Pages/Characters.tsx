import React, { HTMLAttributes } from 'react'

interface CharactersProps extends React.PropsWithChildren {}

const Characters: React.FC<CharactersProps> = ({ ...props }) => {
  return <>Characters</>
}
export default Characters
