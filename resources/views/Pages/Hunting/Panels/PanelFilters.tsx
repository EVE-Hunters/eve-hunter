import {
  Flex,
  Group,
  NumberInput,
  Text,
  Box,
  Menu,
  Tooltip,
  Button,
  Select,
  Indicator,
  Badge,
} from '@mantine/core'
import { IconFilter } from '@tabler/icons'
import React, { HTMLAttributes } from 'react'
import { useHuntingStore } from '../../../../scripts/Stores'
import { MapStatisticTypes } from '../../../../scripts/types'

interface PanelFiltersProps extends React.PropsWithChildren {}

type FilterOption = {
  value: MapStatisticTypes
  label: string
}

const PanelFilters: React.FC<PanelFiltersProps> = ({ ...props }) => {
  const updateFilter = useHuntingStore((state) => state.updatePanelFilter)
  const filter = useHuntingStore((state) => state.panelFilter)

  var filterOptions: FilterOption[] = [
    {
      label: 'Delta',
      value: 'delta',
    },
    {
      label: 'NPC 1 Hour',
      value: 'npc1h',
    },
    {
      label: 'NPC 24 Hour',
      value: 'npc24h',
    },
    {
      label: 'Jump',
      value: 'jumps',
    },
    {
      label: 'Ship Kills',
      value: 'shipKills',
    },
  ]

  const filterSet = filter.type != null && filter.value > 0

  return (
    <Box
      component={Flex}
      align="center"
      sx={(theme) => ({
        height: 40,
        backgroundColor:
          theme.colorScheme == 'dark'
            ? theme.colors.gray[7]
            : theme.colors.dark[4],
        paddingLeft: 10,
        paddingRight: 10,
        radius: 10,
      })}
    >
      <Menu withinPortal withArrow position="right-start">
        <Menu.Target>
          <Tooltip label="Filter Panels">
            <Button
              leftIcon={
                <Box
                  component={IconFilter}
                  color={!filterSet ? 'grey' : 'white'}
                />
              }
              size="sm"
              sx={(theme) => ({
                color: theme.white,
                '&:hover': {
                  //backgroundColor: 'transparent',
                  color: theme.colors.gray[2],
                },
              })}
            >
              Panel Filters
            </Button>
          </Tooltip>
        </Menu.Target>
        <Menu.Dropdown sx={{ paddin: 10 }}>
          <Button fullWidth size="xs" onClick={() => updateFilter(null, 0)}>
            Clear
          </Button>
          <Select
            sx={{ marginTop: 10, marginBottom: 10 }}
            data={filterOptions}
            label="Filler Type"
            value={filter.type}
            onChange={(val) =>
              updateFilter(val as MapStatisticTypes, filter.value)
            }
          ></Select>
          <NumberInput
            label="Filter Value"
            size="sm"
            value={filter.value}
            sx={{ marginTop: 10, marginBottom: 10 }}
            onChange={(e) => updateFilter(filter.type, e ?? 0)}
          />
        </Menu.Dropdown>
      </Menu>
    </Box>
  )
}
export default PanelFilters
