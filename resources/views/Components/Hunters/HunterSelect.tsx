import { Badge, Button, Input, Menu } from '@mantine/core'
import { IconCheck } from '@tabler/icons'
import React, { HTMLAttributes, useState } from 'react'
import { RefreshToken } from '../../../scripts/types'

interface MultipleSelectProps {
  title: string
  multiple?: true
  tokens: RefreshToken[]
  selected?: number[]
  onChange?: (id: number[]) => void
}

interface SingleSelectProp {
  title: string
  multiple?: false
  tokens: RefreshToken[]
  selected?: number | null
  onChange?: (id: number) => void
}

type SelectOptions = MultipleSelectProps | SingleSelectProp

const HunterSelect: React.FC<SelectOptions> = (props) => {
  const [search, setSearch] = useState<string>('')

  const filteredTokens = props.tokens.filter((x) =>
    x.character.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  )

  const handleItemClick = (id: number) => {
    if (props.multiple == true) {
      if (props.selected?.includes(id)) {
        props.onChange &&
          props.onChange(props.selected?.filter((x) => x != id) ?? [])
      } else {
        props.onChange && props.onChange([...(props.selected ?? []), id])
      }
    } else {
      props.onChange && props.onChange(id)
    }
  }

  return (
    <Menu closeOnItemClick={false} position="bottom-start" withArrow>
      <Menu.Target>
        <Button>
          {props.title}{' '}
          {props.multiple == true && (
            <Badge color="cyan.7" variant="filled" sx={{ marginLeft: 10 }}>
              {props.selected?.length}
            </Badge>
          )}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Input
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />

        {filteredTokens.map((token) => {
          const isSelected = props.multiple
            ? props.selected?.includes(token.character_id)
            : props.selected == token.character_id

          return (
            <Menu.Item
              disabled={!props.multiple && isSelected}
              key={token.character_id}
              icon={isSelected && <IconCheck size={14} />}
              onClick={() => handleItemClick(token.character_id)}
            >
              {token.character.name}
            </Menu.Item>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  )
}
export default HunterSelect
