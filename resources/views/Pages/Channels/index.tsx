import { Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import {
  Button,
  Card,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import React, { HTMLAttributes } from 'react'
import { useApplicationState } from '../../../scripts/Stores/ApplicationState'
import {
  ChannelPageProps,
  IntertiaPage,
} from '../../../scripts/types/application'
import ChannelListItem from '../../Components/Channels/ChannelListItem'
import { Link } from '@inertiajs/inertia-react'
import { Ziggy } from '../../../js/ziggy'
import { route } from '../../../scripts/helpers'

interface ChannelsProps extends React.PropsWithChildren {}

const Channels: IntertiaPage<ChannelsProps> = ({ ...props }) => {
  const { channels, links } = usePage<Page<ChannelPageProps>>().props
  const mainToken = useApplicationState((state) => state.mainToken)

  const userChanels = channels.filter((c) => c.user_id == mainToken?.user_id)
  const accessableChannels = channels.filter(
    (c) => c.user_id != mainToken?.user_id
  )

  return (
    <SimpleGrid cols={4}>
      <Stack>
        <Flex justify="space-between">
          <Title>My Channels</Title>
          <Button component={Link} href={route('inertia.channel.create')}>
            Create Channel
          </Button>
        </Flex>
        <Stack>
          {userChanels.map((channel) => (
            <ChannelListItem key={channel.id} channel={channel} editable />
          ))}
        </Stack>
      </Stack>

      <Stack>
        <Title>Accessable Channels</Title>

        {channels.map((channel) => (
          <ChannelListItem key={channel.id} channel={channel} />
        ))}
      </Stack>
    </SimpleGrid>
  )
}
export default Channels
