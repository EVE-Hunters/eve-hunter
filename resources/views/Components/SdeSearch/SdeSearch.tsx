import { Badge, Box, Card, Input, Loader } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import useEveEsi from '../../../scripts/client/eveonline/useEveEsi'
import { useTokenManager } from '../../../scripts/Stores'
import { useApplicationState } from '../../../scripts/Stores/ApplicationState'
import { SdeItemCategories, EsiSearchResults } from '../../../scripts/types'
import { useEsiRequests } from '../../hooks'
import { useTokenProvider } from '../../Providers/TokenProvider'
import EntityDisplay from './EntityDisplay'

interface SdeSearchProps extends React.PropsWithChildren {
  categories: SdeItemCategories[]
  onEntitySelect: (item: EsiSearchResults) => void
  selectedEntities: number[]
}

const SdeSearch: React.FC<SdeSearchProps> = ({ ...props }) => {
  const mainTokenId = useTokenManager((state) => state.mainTokenId)
  const { esiCharacterSearch } = useEsiRequests()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [results, setResults] = useState<EsiSearchResults[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>()
  const signalRef = useRef<AbortController>(new AbortController())

  const handleSearchUpdate = (value: string) => {
    setResults([])
    setSearchTerm(value)
    clearTimeout(timeoutRef.current)
    if (value.length < 3) {
      return
    }
    timeoutRef.current = setTimeout(async () => {
      if (value.length < 3) return

      setIsSearching(true)
      esiCharacterSearch(mainTokenId, value, signalRef.current.signal)
        .then((results) => {
          setResults(results!)
        })
        .finally(() => {
          setIsSearching(false)
        })
    }, 500)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])
  const availableResults = results
    .filter((x) => !props.selectedEntities.includes(x.entity_id))
    .filter((x) =>
      x.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    )

  return (
    <Box>
      <Input.Wrapper label="Search EVE Corporations, Alliances, Characters">
        <Input
          value={searchTerm}
          onChange={(item) => handleSearchUpdate(item.currentTarget.value)}
          onBlur={() => setIsSearching(false)}
          rightSection={isSearching ? <Loader /> : null}
        />
      </Input.Wrapper>

      <EntityDisplay
        categories={['alliance', 'corporation', 'character']}
        entities={availableResults}
        onItemClicked={(item) => props.onEntitySelect(item)}
      />
    </Box>
  )
}
export default SdeSearch
