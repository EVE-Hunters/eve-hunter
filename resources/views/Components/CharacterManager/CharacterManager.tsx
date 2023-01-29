import { Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Stack } from '@mantine/core'
import React, { useState } from 'react'
import { useApplicationState } from '../../../scripts/Stores/ApplicationState'
import { AccountProps, RefreshToken } from '../../../scripts/types'
import CharacterItem from './CharacterItem'

interface CharacterManaerProps extends React.PropsWithChildren {}

const CharacterManager: React.FC<CharacterManaerProps> = ({ ...props }) => {
  const { tokens, appScopes } = usePage<Page<AccountProps>>().props
  const mainToken = useApplicationState((state) => state.mainToken)
  const [tokenList, setTokenList] = useState<RefreshToken[]>(tokens)

  return (
    <>
      <Stack spacing={5}>
        {tokenList
          .sort((a, b) => (a.character_id == mainToken?.character_id ? -1 : 1))
          .map((token) => (
            <CharacterItem
              token={token}
              requiredScopes={appScopes}
              key={token.character_id}
              onDeleted={() =>
                setTokenList((tok) =>
                  tok.filter((t) => t.character_id != token.character_id)
                )
              }
              noActions={mainToken?.character_id == token.character_id}
            />
          ))}
      </Stack>
    </>
  )
}
export default CharacterManager
