import {
  Autocomplete,
  Group,
  SelectItemProps,
  Text,
  AutocompleteItem,
  Card,
  Flex,
  ActionIcon,
  Stack,
} from '@mantine/core'
import { IconX } from '@tabler/icons'
import React, { HTMLAttributes, useState } from 'react'
import { SolarSystem } from '../../../scripts/types'
import { useSde } from '../../Providers/SdeProvider.tsx'

interface SolarSystemSearchProps extends React.PropsWithChildren {
  onSystemSelected?: (value: number) => void
  selectedSolarsystem?: number
}

interface AutocompleteItemProps
  extends SelectItemProps,
    Pick<SolarSystem, 'name' | 'system_id' | 'constellation' | 'region'> {}

const AutoCompleteItem = React.forwardRef<
  HTMLDivElement,
  AutocompleteItemProps
>(function (inProps, ref) {
  const { name, system_id, constellation, region, ...props } = inProps
  return (
    <div ref={ref} {...props}>
      <Group noWrap>
        <div>
          <Text>{name}</Text>
          <Text>
            {constellation.name} / {region.name}
          </Text>
        </div>
      </Group>
    </div>
  )
})

const SolarSystemSearch: React.FC<SolarSystemSearchProps> = ({ ...props }) => {
  const { SolarSystems } = useSde()

  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredSystems =
    searchTerm.length < 2
      ? []
      : SolarSystems.filter((system) => {
          return system.name
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase())
        })
          .slice(0, 10)
          .map((item) => ({ ...item, value: String(item.system_id) }))

  const handleItemSubmit = (item: AutocompleteItem) => {
    setSearchTerm('')
    props.onSystemSelected && props.onSystemSelected(Number(item.value))
  }

  return (
    <Autocomplete
      label="Staging system"
      value={searchTerm}
      onChange={(val) => setSearchTerm(val)}
      data={filteredSystems}
      itemComponent={AutoCompleteItem}
      filter={(value, item) => true}
      onItemSubmit={handleItemSubmit}
    />
  )
}
export default SolarSystemSearch
