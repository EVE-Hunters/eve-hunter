import axios from 'axios'
import create from 'zustand'
import { route } from '../helpers'
import { Channel, ChannelMember, Message } from '../types'

interface ChatSettings {
  presence: boolean
  user: boolean
  destination: boolean
  cyno: boolean
}

interface ChannelStore {
  channels: Channel[]
  activeChannel: number
  stagingSystemId: number

  setChannel: (id: number) => void
  init: (channels: Channel[], activeChannel: number) => void

  members: ChannelMember[]
  addMember: (members: ChannelMember) => void
  setMembers: (members: ChannelMember[]) => void

  activeMembers: number[]
  setActiveMembers: (id: number[]) => void
  addActiveMember: (id: number) => void
  removeActiveMember: (id: number) => void

  messages: Message[]

  addMessage: (message: Message) => void

  clearMessages: () => void

  settings: ChatSettings
  updateChatSetting: (key: keyof ChatSettings, value: boolean) => void

  following: number[]
  setFollowing: (id: number[]) => void
}

export const useChannelStore = create<ChannelStore>((set, get) => ({
  channels: [],

  activeChannel: 0,
  stagingSystemId: 0,

  setChannel: async (activeChannel) => {
    const response = await axios.post(
      route('account.channel.set', { channel: activeChannel })
    )
    const newChannel = get().channels.find((x) => x.id === activeChannel)
    if (response.status == 200) {
      set(() => ({
        activeChannel,
        stagingSystemId: newChannel?.staging_system_id!,
        messages: [],
      }))
    }
  },

  init: (channels, activeChannel) => {
    const initChannel = channels.find((x) => x.id == activeChannel)
    set(() => ({
      channels,
      activeChannel,
      stagingSystemId: initChannel?.staging_system_id!,
    }))
  },

  members: [],
  addMember: (member) => {
    if (
      !get()
        .members.map((x) => x.id)
        .includes(member.id)
    ) {
      set((state) => ({
        members: [...state.members, member],
      }))
    }
  },
  setMembers: (members) => set(() => ({ members })),

  activeMembers: [],
  setActiveMembers: (id) => set(() => ({ activeMembers: id })),
  addActiveMember: (id) =>
    set((state) => ({ activeMembers: [...state.activeMembers, id] })),
  removeActiveMember: (id) =>
    set((state) => ({
      activeMembers: state.activeMembers.filter((x) => x != id),
      following: state.following.filter((x) => x != id),
    })),

  messages: [],

  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  clearMessages: () => set((state) => ({ messages: [] })),

  following: [],
  setFollowing: (id: number[]) => set(() => ({ following: id })),

  settings: {
    presence: true,
    user: true,
    destination: true,
    cyno: true,
  },

  updateChatSetting: (key, value) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [key]: value,
      },
    })),
}))
