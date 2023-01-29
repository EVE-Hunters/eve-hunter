import { Box, Button } from '@mantine/core'
import { Container } from '@mantine/core'
import axios from 'axios'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { route } from '../../../scripts/helpers'
import { useApplicationState } from '../../../scripts/Stores/ApplicationState'
import { IntertiaPage } from '../../../scripts/types'
import { AddChannelRequest } from '../../../scripts/types/requests'
import ChannelForm from '../../Components/Channels/ChannelForm'
import SdeProvider from '../../Providers/SdeProvider.tsx/SdeProvider'
import TokenProvider from '../../Providers/TokenProvider/TokenProvider'
import { Inertia } from '@inertiajs/inertia'
import { showNotification } from '@mantine/notifications'

interface AddChannelProps extends React.PropsWithChildren {}

const AddChannel: IntertiaPage<AddChannelProps> = ({ ...props }) => {
  const app = useApplicationState()

  const form = useForm<AddChannelRequest>({
    defaultValues: {
      access: [],
    },
  })

  const onSubmit = (data: AddChannelRequest) => {
    axios.post(route('channel.create'), data).then((response) => {
      showNotification({
        message: 'Channel has been created',
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormProvider {...form}>
              <ChannelForm />
            </FormProvider>
            <Box sx={{ marginTop: 10 }}>
              <Button type="submit">Create Channel</Button>
            </Box>
          </form>
        </Container>
      </TokenProvider>
    </SdeProvider>
  )
}
export default AddChannel
