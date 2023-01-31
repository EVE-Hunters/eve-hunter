import { Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import {
  Portal,
  SimpleGrid,
  Text,
  Box,
  Grid,
  Card,
  Flex,
  Paper,
} from '@mantine/core'
import React, { useEffect, useRef } from 'react'
import { HuntPageProps, IntertiaPage } from '../../../scripts/types'
import HunterSettings from './Components/HunterSettings'
import Map from './3dMap/Map'
import PanelWrapper from './Panels/PanelWrapper'
import AppWrapper from '../../Layouts/AppWrapper'
import HunterLayout from '../../Layouts/hunter/HunterLayout'
import {
  useSdeStore,
  useTokenManager,
  useChannelStore,
  useHuntingStore,
} from '../../../scripts/Stores/'
import Chat from './ChatPannel/Chat'

interface HuntProps extends React.PropsWithChildren {}

const Hunt: IntertiaPage<HuntProps> = ({ ...props }) => {
  const sdeStoreInit = useSdeStore((state) => state.loadSde)
  const tokenStoreInit = useTokenManager((state) => state.init)
  const channelStoreInit = useChannelStore((state) => state.init)
  const huntingStoreInit = useHuntingStore((state) => state.init)
  //   const getLocation = useCharacterTracking()

  const wrapperRef = useRef<HTMLDivElement>(null)

  const renderCount = useRef<number>(0)
  renderCount.current++
  const {
    tokens,
    channels,
    activeChannel,
    huntingCharacters,
    sdeVersion,
    auth,
  } = usePage<Page<HuntPageProps>>().props

  useEffect(() => {
    sdeStoreInit(sdeVersion)
    tokenStoreInit(tokens, auth.user?.main_refresh_token.character_id!)
    channelStoreInit(channels, activeChannel!)
    huntingStoreInit(huntingCharacters, auth.user?.primary_hunter!)
  }, [])

  return (
    <Box sx={{ height: '100%' }} ref={wrapperRef}>
      <Portal target="#page-controls">
        <HunterSettings />
      </Portal>
      <Grid sx={{ height: '100%', margin: 0 }}>
        <Grid.Col span={5}>
          <Map
            height={
              wrapperRef.current?.clientHeight
                ? wrapperRef.current?.clientHeight - 50
                : 700
            }
          />
        </Grid.Col>
        <Grid.Col span={7}>
          <Grid sx={{ height: '100%', margin: 0 }}>
            <Grid.Col span={8} sx={{ padding: 0 }}>
              <Card shadow="md" sx={{ overflow: 'visible' }}>
                <Card.Section>
                  <PanelWrapper
                    height={
                      wrapperRef.current?.clientHeight
                        ? wrapperRef.current?.clientHeight - 50
                        : 700
                    }
                  />
                </Card.Section>
              </Card>
            </Grid.Col>
            <Grid.Col span={4} sx={{ paddingTop: 0 }}>
              <Card shadow="md">
                <Card.Section>
                  <Chat
                    height={
                      wrapperRef.current?.clientHeight
                        ? wrapperRef.current?.clientHeight - 50
                        : 700
                    }
                  />
                </Card.Section>
              </Card>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Box>
  )
}

Hunt.layout = (page) => <AppWrapper Layout={HunterLayout}>{page}</AppWrapper>

export default Hunt
