import { Badge, Box, Card, ScrollArea, Tabs } from '@mantine/core'
import { Scroll } from '@react-three/drei'
import React, { HTMLAttributes } from 'react'
import { fcUpper } from '../../../scripts/string'
import { EsiSearchResults } from '../../../scripts/types'
import EntityItem from './EntityItem'
type Categories = 'character' | 'corporation' | 'alliance'
interface EntityDisplayProps extends React.PropsWithChildren {
  entities: EsiSearchResults[]
  categories: Categories[]
  onItemClicked: (item: EsiSearchResults) => void
  reversed?: boolean
  altIcon?: boolean
}

const EntityDisplay: React.FC<EntityDisplayProps> = ({
  categories,
  entities,
  reversed = false,
  altIcon = false,
  ...props
}) => {
  if (categories.length == 0) {
    return null
  }

  return (
    <Tabs defaultValue={categories[0]} sx={{ height: '100%' }}>
      <Tabs.List grow>
        {categories.map((cat) => {
          const entries = entities.filter((x) => x.type == cat)
          return (
            <Tabs.Tab value={cat} key={cat}>
              {fcUpper(cat)}s{' '}
              {entries.length > 0 && <Badge size="xs">{entries.length}</Badge>}
            </Tabs.Tab>
          )
        })}
      </Tabs.List>
      <Card
        sx={{
          borderRadius: '0 0 10px 10px',
        }}
        shadow="md"
        withBorder
      >
        <Card.Section sx={{ padding: 5 }}>
          <ScrollArea sx={{ height: 280, overflowX: 'auto', paddingRight: 10 }}>
            {categories.map((cat) => {
              const entries = entities.filter((x) => x.type == cat)
              return (
                <Tabs.Panel value={cat} key={cat}>
                  {entries.map((entity) => (
                    <EntityItem
                      key={entity.entity_id}
                      reversed={reversed}
                      item={entity}
                      altIcon={altIcon}
                      onClick={() => props.onItemClicked(entity)}
                    />
                  ))}
                </Tabs.Panel>
              )
            })}
          </ScrollArea>
        </Card.Section>
      </Card>
    </Tabs>
  )
}
export default EntityDisplay
