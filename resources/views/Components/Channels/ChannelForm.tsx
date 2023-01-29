import { Box, Card, Input, SimpleGrid, Stack, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { EsiSearchResults } from '../../../scripts/types'
import { AddChannelRequest } from '../../../scripts/types/requests'
import EntityDisplay from '../SdeSearch/EntityDisplay'
import SdeSearch from '../SdeSearch/SdeSearch'
import SolarSystemSearch from '../SolarSystemSearch/SolarSystemSearch'
import SolarSystemSelect from '../SolarSystemSearch/SolarSystemSelect'

interface ChannelFormProps extends React.PropsWithChildren {}

const ChannelForm: React.FC<ChannelFormProps> = ({ ...props }) => {
  const form = useFormContext<AddChannelRequest>()

  const [search, setSearch] = useState<string>('')

  const access = form.watch('access')

  return (
    <Card shadow="md" withBorder>
      <Stack>
        <TextInput label="Channel Name" {...form.register('channel.name')} />

        <Controller
          control={form.control}
          name="channel.staging_system_id"
          render={(props) => (
            <SolarSystemSelect
              selected={props.field.value}
              onChange={(item) => props.field.onChange(item)}
            />
          )}
        />

        <Controller
          control={form.control}
          name="access"
          render={(props) => (
            <SimpleGrid sx={{ height: 400, overflow: 'hidden' }} cols={2}>
              <SdeSearch
                categories={['alliance', 'character', 'corporation']}
                onEntitySelect={(item) => {
                  props.field.onChange([...access, item])
                }}
                selectedEntities={access.map((x) => x.entity_id)}
              />

              <Box>
                <Input.Wrapper label="Filter Selected Entities">
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                  />
                </Input.Wrapper>

                <EntityDisplay
                  entities={props.field.value.filter((x) =>
                    x.name
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                  )}
                  altIcon
                  categories={['alliance', 'corporation', 'character']}
                  onItemClicked={(item) => {
                    props.field.onChange(
                      access.filter((x) => x.entity_id != item.entity_id)
                    )
                  }}
                />
              </Box>
            </SimpleGrid>
          )}
        />
      </Stack>
    </Card>
  )
}
export default ChannelForm
