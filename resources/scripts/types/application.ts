import { Page, PageProps } from '@inertiajs/inertia'
import { MantineColor } from '@mantine/core'
import { TablerIcon } from '@tabler/icons'
import React from 'react'
import { Channel, RefreshToken, SdeVersion, User } from './models'
import { EditChannelRequest } from './requests'

export type InertiaLayoutFunction = (page) => React.ReactNode

export interface IntertiaPage<T = any> extends React.FC<T> {
  layout?: React.ReactNode | InertiaLayoutFunction
}

export type FlashTypes = 'error' | 'success' | 'info' | 'warning'

export type FlashMessage = {
  type: FlashTypes
  title: string
  message: string
  dismissable: boolean
}

export type AppMessage = {
  type: 'success' | 'error'
  message: string
}

export interface NavbarItemProps {
  icon: TablerIcon
  label: string
  initiallyOpened?: boolean
  href?: string
  links?: { label: string; link: string }[]
}

export type MessageColors = {
  [key in FlashTypes]: MantineColor
}

export interface appSettings {}

export type LinkItem = {
  [key: string]: string
}

export interface ApplicationProps extends PageProps {
  //appName: string
  appSettings: {
    name: string
  }
  pageSettings?: {
    startNavClose?: boolean
  }
  flash?: FlashMessage
  links?: LinkItem
  messages?: AppMessage[]
  notifications: {
    invalidTokens: number
    invalidScopes: number
  }
  sdeVersion: SdeVersion
  auth: {
    user?: User
    isAuthed: boolean
  }
}

export interface AccountProps extends PageProps {
  tokens: RefreshToken[]
  appScopes: string[]
}

export interface EditChannelPageProps
  extends ApplicationProps,
    EditChannelRequest {}

export interface ChannelPageProps extends PageProps {
  channels: Channel[]
}

export interface HuntPageProps extends ApplicationProps {
  tokens: RefreshToken[]
  channels: Channel[]
  activeChannel: number | null
  huntingCharacters: number[]
}

export interface InertiaProps<T> extends Page<T> {}

export interface SystemStatSettings {
  delta: boolean
  npc1h: boolean
  npc24h: boolean
  jumps: boolean
  security: boolean
}

export interface ThreeMapSettings extends SystemStatSettings {
  range: boolean
}
