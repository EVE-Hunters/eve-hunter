import { Box, Card, Flex, Stack, Text, Tooltip } from '@mantine/core'
import { IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons'
import React from 'react'
import { EsiSearchResults } from '../../../scripts/types'
import EveAvatar from '../EveImage/EveAvatar'

interface EntityItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: EsiSearchResults
  reversed?: boolean
  altIcon?: boolean
}

interface EntityItemComponent {
  item: EsiSearchResults
  reversed?: boolean
}

const CharacterItem: React.FC<EntityItemComponent> = ({
  item,
  reversed = false,
}) => {
  return (
    <Box
      component={Flex}
      align="center"
      sx={{ marginTop: 5, marginBottom: 5 }}
      direction={reversed ? 'row-reverse' : 'row'}
    >
      <EveAvatar
        id={item.entity_id!}
        category="characters"
        size={64}
        imageSize={64}
        radius="xl"
        sx={(theme) => ({
          borderColor: theme.colors.gray[2],
        })}
      />
      <Flex
        direction="column"
        justify="start"
        align="start"
        sx={{ width: 32, marginLeft: 10 }}
      >
        <Tooltip label={item.corporation?.name}>
          <EveAvatar
            id={item.corporation_id}
            category="corporations"
            size={32}
            imageSize={32}
          />
        </Tooltip>
        {item.alliance && (
          <Tooltip label={item.alliance?.name}>
            <EveAvatar
              id={item.alliance_id}
              category="alliances"
              size={32}
              imageSize={32}
            />
          </Tooltip>
        )}
      </Flex>
      <Stack spacing={0} sx={{ widgth: '100%', marginLeft: 10 }}>
        <Text weight={500} size="lg" align={reversed ? 'right' : 'left'}>
          {item.name}
        </Text>
        <Text>
          {item.corporation?.name} / {item.alliance?.name}
        </Text>
      </Stack>
    </Box>
  )
}
const CorporationItem: React.FC<EntityItemComponent> = ({
  item,
  reversed = false,
}) => {
  return (
    <Box
      component={Flex}
      align="center"
      direction={reversed ? 'row-reverse' : 'row'}
    >
      <EveAvatar
        id={item.entity_id!}
        category="corporations"
        size={42}
        imageSize={64}
      />
      <Flex sx={{ widgth: '100%', marginLeft: 10 }} justify={'center'}>
        <Text weight={500} size="lg">
          {item.name}
        </Text>
      </Flex>
    </Box>
  )
}
const AllianceItem: React.FC<EntityItemComponent> = ({
  item,
  reversed = false,
}) => {
  return (
    <Box
      component={Flex}
      align="center"
      direction={reversed ? 'row-reverse' : 'row'}
    >
      <EveAvatar
        id={item.entity_id}
        category="alliances"
        size={42}
        imageSize={64}
      />
      <Text
        weight={500}
        size="lg"
        sx={{ marginLeft: reversed ? 0 : 10, marginRight: reversed ? 10 : 0 }}
      >
        {item.name}
      </Text>
    </Box>
  )
}

const EntityItem: React.FC<EntityItemProps> = ({
  item,
  reversed = false,
  altIcon = false,
  ...props
}) => {
  return (
    <Card
      {...props}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme == 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[3],
        userSelect: 'none',
        margin: 5,
        cursor: 'pointer',
        '& :hover': {
          backgroundColor:
            theme.colorScheme == 'dark'
              ? theme.colors.dark[9]
              : theme.colors.gray[5],
        },
      })}
      shadow="md"
    >
      <Card.Section
        sx={(theme) => ({
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
        })}
      >
        <Flex
          direction={reversed ? 'row-reverse' : 'row'}
          justify="space-between"
          align="center"
          sx={{ width: '100%' }}
        >
          <div>
            {item.type == 'alliance' && (
              <AllianceItem item={item} reversed={reversed} />
            )}
            {item.type == 'corporation' && (
              <CorporationItem item={item} reversed={reversed} />
            )}
            {item.type == 'character' && (
              <CharacterItem item={item} reversed={reversed} />
            )}
          </div>

          {altIcon ? (
            <Tooltip label="Remove access">
              <IconX color="red" />
            </Tooltip>
          ) : reversed ? (
            <Tooltip label="Add access">
              <IconChevronLeft size={32} />
            </Tooltip>
          ) : (
            <IconChevronRight size={32} />
          )}
        </Flex>
      </Card.Section>
    </Card>
  )
}
export default EntityItem
