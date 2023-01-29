import { Page } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Box, Button, Container } from '@mantine/core'
import axios from 'axios'
import React, { HTMLAttributes, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { route } from '../../../scripts/helpers'
import { useApplicationState } from '../../../scripts/Stores/ApplicationState'
import { EditChannelPageProps } from '../../../scripts/types'
import {
  AddChannelRequest,
  EditChannelRequest,
} from '../../../scripts/types/requests'
import ChannelForm from '../../Components/Channels/ChannelForm'
import SdeProvider from '../../Providers/SdeProvider.tsx/SdeProvider'
import TokenProvider from '../../Providers/TokenProvider/TokenProvider'
import { Inertia } from '@inertiajs/inertia'
import { showNotification } from '@mantine/notifications'
import { useTokenManager } from '../../../scripts/Stores'

interface EditChannelProps extends React.PropsWithChildren {}

const EditChannel: React.FC<EditChannelProps> = ({ ...props }) => {
  const app = useApplicationState()
  const tokenInit = useTokenManager((state) => state.init)
  const { channel, access, auth } = usePage<Page<EditChannelPageProps>>().props

  const form = useForm<EditChannelRequest>({
    defaultValues: {
      channel,
      access,
    },
  })

  useEffect(() => {
    tokenInit(
      [auth.user?.main_refresh_token!],
      auth.user?.main_refresh_token.character_id!
    )
  }, [])

  const onSubmit = (data: EditChannelRequest) => {
    axios
      .post(route('channel.update', { channel: channel.id }), data)
      .then((response) => {
        showNotification({
          message: 'Channel has been updated',
          color: 'green',
        })
        Inertia.visit(route('inertia.channels'), { replace: true })
      })
  }

  return (
    <SdeProvider>
      <TokenProvider
        tokens={[app.mainToken!]}
        mainTokenId={app.mainToken?.character_id!}
      >
        <Container>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ChannelForm />
              <Box sx={{ marginTop: 10 }}>
                <Button type="submit">Save Changes</Button>
              </Box>
            </form>
          </FormProvider>
        </Container>
      </TokenProvider>
    </SdeProvider>
  )
}
export default EditChannel
