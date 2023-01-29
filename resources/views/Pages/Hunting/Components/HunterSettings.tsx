import { Box, Button, Flex, Group, Text } from '@mantine/core'
import React, { HTMLAttributes, useMemo } from 'react'
import { useChannels } from '../../../Providers/BroadcastProvider.tsx/BroadcastProvder'
import { useSde } from '../../../Providers/SdeProvider.tsx'
import ChannelSelect from '../../../Components/Channels/ChannelSelect'
import { useTokenProvider } from '../../../Providers/TokenProvider/TokenProvider'
import HunterSelect from '../../../Components/Hunters/HunterSelect'
import { useHunterProvider } from '../../../Providers/HunterProvider/HuntingProvider'
import SolarSystemSearchMenu from '../../../Components/SolarSystemSearch/SolarSystemSearchMenu'
import HuntingManager from './HuntingManager'
import RangeManager from './RangeManager'
import { useTokenManager } from '../../../../scripts/Stores/TokenManager'
import { useHuntingStore } from '../../../../scripts/Stores/HuntingStore'
import { useChannelStore } from '../../../../scripts/Stores/ChannelStore'
import { useSdeStore } from '../../../../scripts/Stores'
import TrackingToggle from './TrackingToggle'
import { useCharacterTracking } from '../hooks/useCharacterTracking'

interface HunterSettingsProps extends React.PropsWithChildren {}

const HunterSettings: React.FC<HunterSettingsProps> = ({ ...props }) => {
  const SolarSystems = useSdeStore((state) => state.SolarSystems)
  const channels = useChannelStore((state) => state.channels)
  const currentChannelId = useChannelStore((state) => state.activeChannel)
  const setChannel = useChannelStore((state) => state.setChannel)
  const tokens = useTokenManager((state) => state.tokens)
  const currentHunters = useHuntingStore((state) => state.hunters)
  const setHunters = useHuntingStore((state) => state.setHunters)
  const primaryHunter = useHuntingStore((state) => state.primaryHunter)
  const setPrimaryHunter = useHuntingStore((state) => state.setPrimaryHunter)
  const setHuntingSystemId = useHuntingStore(
    (state) => state.setHuntingSystemId
  )
  const setLocationBatch = useHuntingStore((state) => state.setLocationBatch)
  //   const getLocations = useCharacterTracking()
  //const { currentHunters, setHunters } = useHunterProvider()

  const currentStaging = SolarSystems.find(
    (x) =>
      x.system_id ==
      channels.find((y) => y.id == currentChannelId)?.staging_system_id
  )

  const validTokens = tokens.filter((x) => x.deleted_at == null)

  return (
    <Box
      component={Flex}
      sx={(theme) => ({
        height: 50,
        background:
          theme.colorScheme == 'dark'
            ? theme.colors.gray[8]
            : theme.colors.gray[2],
        paddingLeft: 10,
        paddingRight: 10,
        borderBottom: '1px solid',
        borderColor:
          theme.colorScheme == 'dark'
            ? theme.colors.gray[7]
            : theme.colors.gray[3],
      })}
      align="center"
    >
      <Group spacing={5}>
        <HunterSelect
          title="Hunt Group"
          tokens={validTokens}
          selected={currentHunters}
          onChange={setHunters}
          multiple={true}
        />
        <HunterSelect
          title="Primary Hunter"
          tokens={validTokens}
          selected={primaryHunter}
          onChange={setPrimaryHunter}
        />
        <ChannelSelect
          items={channels}
          selected={currentChannelId}
          onChange={setChannel}
        />

        <Text weight={500}>Staging: </Text>
        <Text>{currentStaging?.name}</Text>
      </Group>
      <HuntingManager />
      <RangeManager />

      {/* <Button
        onClick={() => {
          setHuntingSystemId(null)
          setLocationBatch([
            {
              character_id: primaryHunter!,
              system_id: 31000748,
            },
          ])
        }}
      >
        Reset to Staging
      </Button> */}

      {/* <Button
        onClick={() => {
          getLocations()
        }}
      >
        GetLocation
      </Button> */}

      <Box component={TrackingToggle} sx={{ marginLeft: 'auto' }}></Box>
    </Box>
  )
}
export default HunterSettings
