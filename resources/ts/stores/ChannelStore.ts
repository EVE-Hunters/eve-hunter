import create from 'zustand'
import {ChannelUserInterface} from "../interfaces/User/UserInterface";
import {NotificationMessage} from "../interfaces/websockets/Notifications";


type ChannelStore = {

    members: ChannelUserInterface[],
    messages: NotificationMessage[],

    setMembers: (users: ChannelUserInterface[]) => void,
    addMember: (user: ChannelUserInterface) => void,
    removeMember: (user: ChannelUserInterface) => void

    setMessages: (messages: NotificationMessage[]) => void,
    addMessage: (message: NotificationMessage) => void
    clearMessages: ()=>void
}

export const useChannelStore = create<ChannelStore>((set)=> ({

    members: [],
    messages: [],

    setMembers: (users) => set(() => ({members:users})),
    addMember: (user) => set((state) => ({members: [...state.members, user]})),
    removeMember: (user) => set((state) => ({members: state.members.filter(c => c.id != user.id)})),


    setMessages: (messages) => set(() => ({messages})),
    addMessage: (message) => set((state) => ({messages: [message, ...state.messages]})),
    clearMessages: () => set(()=>({messages:[]}))

}))
