import { Flex, Group, NumberInput, Text, Box } from '@mantine/core'
import React, { HTMLAttributes } from 'react'

interface PanelFiltersProps extends React.PropsWithChildren {}

const PanelFilters: React.FC<PanelFiltersProps> = ({ ...props }) => {
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
      })}
    >
      <Group
        spacing={3}
        sx={{ borderRight: '1px solid', paddingRight: 5, marginRight: 5 }}
      >
        <Text>Minium Delta</Text>
        <NumberInput sx={{ maxWidth: 70 }} />
      </Group>
      <Group
        spacing={3}
        sx={{ borderRight: '1px solid', paddingRight: 5, marginRight: 5 }}
      >
        <Text>Minium NPC 1H</Text>
        <NumberInput sx={{ maxWidth: 70 }} />
      </Group>
      <Group
        spacing={3}
        sx={{ borderRight: '1px solid', paddingRight: 5, marginRight: 5 }}
      >
        <Text>Minium NPC 1H</Text>
        <NumberInput sx={{ maxWidth: 70 }} />
      </Group>
    </Box>
  )
}
export default PanelFilters
