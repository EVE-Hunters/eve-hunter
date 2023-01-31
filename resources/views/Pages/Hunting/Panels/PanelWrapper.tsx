import {
  SimpleGrid,
  Flex,
  Grid,
  Box,
  ScrollArea,
  Group,
  Text,
  NumberInput,
} from '@mantine/core'
import React, { HTMLAttributes } from 'react'
import {
  useHuntingStore,
  useMapStore,
  useSdeStore,
} from '../../../../scripts/Stores'
import PanelFilters from './PanelFilters'
import SystemPanel from './SystemPanel'

interface PanelWrapperProps extends React.PropsWithChildren {
  height: number
}

const PanelWrapper: React.FC<PanelWrapperProps> = ({ ...props }) => {
  const { SolarSystems } = useSdeStore()

  const systems = useMapStore((state) => state.systems)
  const returnSystemId = useHuntingStore((state) => state.returnSystemId)
  const returnSystem = SolarSystems.find((x) => x.system_id == returnSystemId)
  return (
    <>
      <PanelFilters />
      <ScrollArea
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme == 'dark'
              ? theme.colors.gray[6]
              : theme.colors.gray[3],
          height: props.height - 40,

          overflowY: 'hidden',
        })}
      >
        <Box sx={{ padding: 5 }}>
          <Grid sx={{}} align="flex-start" justify="flex-start">
            {returnSystem && <SystemPanel isReturn system={returnSystem!} />}
            {systems
              .filter((x) => x.system_id != returnSystemId)
              .map((system) => (
                <SystemPanel system={system} key={system.system_id} />
              ))}
          </Grid>
        </Box>
      </ScrollArea>
    </>
  )
}
export default PanelWrapper
