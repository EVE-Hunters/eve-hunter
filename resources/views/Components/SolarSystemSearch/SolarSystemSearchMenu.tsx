import {
  Button,
  Input,
  Menu,
  Group,
  Text,
  Select,
  SelectItem,
  ActionIcon,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons'
import React, { HTMLAttributes, useMemo, useState } from 'react'
import { Triangle } from 'three'
import { useSdeStore } from '../../../scripts/Stores'
import { SolarSystem } from '../../../scripts/types'
import { useSde } from '../../Providers/SdeProvider.tsx'
import SolarSystemSearch from './SolarSystemSearch'

interface SolarSystemSearchMenuProps extends React.PropsWithChildren {
  onSystemSelected?: (item: SolarSystem) => void
}

const SolarSystemSearchMenu: React.FC<SolarSystemSearchMenuProps> = ({
  ...props
}) => {
  const SolarSystems = useSdeStore((state) => state.SolarSystems)
  const [search, setSearch] = useState<string>('')

  const filteredSystems =
    search.trim() != ''
      ? SolarSystems.filter((x) => {
          return x.name
            .toLocaleLowerCase()
            .includes(search.trim().toLocaleLowerCase())
        }).slice(0, 10)
      : []

  const handleSystemSelect = (item: SolarSystem) => {
    setSearch('')
    props.onSystemSelected && props.onSystemSelected(item)
  }

  return (
    <>
      <Menu
        width={400}
        position="bottom-start"
        arrowPosition="center"
        withArrow
      >
        <Menu.Target>
          <ActionIcon variant="subtle">
            <IconSearch size={14} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Input
            placeholder="Search System"
            value={search}
            autoComplete="off"
            onChange={(e) => setSearch(e.currentTarget.value)}
          ></Input>
          {filteredSystems.map((system) => (
            <Menu.Item
              key={system.system_id}
              onClick={() => handleSystemSelect(system)}
            >
              <Group>
                <Text weight={500}>{system.name}</Text> /{' '}
                <Text>{system.constellation.name}</Text>
                <Text sx={{ marginLeft: 'auto' }}>{system.region.name}</Text>
              </Group>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
export default SolarSystemSearchMenu
