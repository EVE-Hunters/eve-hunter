import React, { HTMLAttributes } from 'react'
import { Avatar, AvatarProps } from '@mantine/core'
import {
  EveImageCategory,
  EveImageSize,
  EveImageVariant,
} from '../../../scripts/types'

interface EveImageProps extends Omit<AvatarProps, 'src'> {
  category: EveImageCategory
  id: number | undefined
  imageSize?: EveImageSize
}

const EveAvatar = React.forwardRef<HTMLDivElement, EveImageProps>(function (
  inProps,
  ref
) {
  let { category, id, imageSize = 64, ...props } = inProps

  if (!id) {
    return null
  }

  if (category == 'factions') {
    category = 'alliances'
  }

  let variant: EveImageVariant

  switch (category) {
    case 'characters':
      variant = 'portrait'
      break
    case 'corporations':
    case 'alliances':
      variant = 'logo'
      break
    default:
      variant = imageSize > 64 ? 'render' : 'icon'
  }

  const src = `https://images.evetech.net/${category}/${id}/${variant}?size=${imageSize}`

  return <Avatar src={src} {...props} ref={ref} />
})
export default EveAvatar
