import { ActionIcon, Box, Flex, Group, Stack, Text } from '@mantine/core'
import React, { HTMLAttributes } from 'react'
import { EveSdeImageTranslation, UniverseName } from '../../../scripts/types'
import EveAvatar from '../EveImage/EveAvatar'

interface UniverseNameDisplayProps extends React.PropsWithChildren {
  item: UniverseName
  rightSection?: React.ReactElement
  onActionClick?: (item: UniverseName) => void
}

const CategoryToImageCat: EveSdeImageTranslation = {
  character: 'characters',
  alliance: 'alliances',
  corporation: 'corporations',
}

const UniverseNameDisplay: React.FC<UniverseNameDisplayProps> = ({
  item,
  rightSection,
  onActionClick,
  ...props
}) => {
  return (
    <Flex justify="space-between" align="center">
      <Group>
        <Box
          component={EveAvatar}
          category={CategoryToImageCat[item.category] ?? 'characters'}
          id={item.id}
          size={46}
          imageSize={64}
          sx={{ marginRight: 10 }}
        />

        <Stack spacing={1}>
          <Text weight={500}>{item.name}</Text>
          <Text>{item.category}</Text>
        </Stack>
      </Group>
      {rightSection && (
        <Box
          onClick={() => onActionClick && onActionClick(item)}
          sx={{ paddingLeft: 'auto' }}
        >
          {rightSection}
        </Box>
      )}
    </Flex>
  )
}
export default UniverseNameDisplay
