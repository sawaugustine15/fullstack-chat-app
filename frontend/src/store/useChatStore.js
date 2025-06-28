import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstanace } from "../lib/axios";
import { useAuthStore } from './useAuthStore'

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try{
            const res = await axiosInstanace.get("/messages/users")
            set({ users: res.data })
        }
        catch (error){
            toast.error(error.respose.data.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (userId)=> {
        set({ isMessagesLoading: true })
        try{
            const res = await axiosInstanace.get(`/messages/${userId}`)
            set({ messages: res.data})
        }catch (error){
            toast.error(error.res.data.message)
        }finally {
            set({ isMessagesLoading: false})
        }
    },

    sendMessage: async (messageData) =>{
        const {selectedUser, messages} = get()
        try{
            const res = await axiosInstanace.post(`messages/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data]})
        }catch(error) {
            toast.error(error.respose.data.message)
        }
    },

    subscribeToMessages: () => {
        const {selectedUser} = get()
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket

        //todo: optimize this one later
        socket.on('newMessage', (newMessage) => {
            const isMessageSentFormSelectedUser = newMessage.senderId === selectedUser._id
            if(!isMessageSentFormSelectedUser) return
            set({ messages: [...get().messages, newMessage]})
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket
        socket.off('newMessage')
    },

    // todo: optimize this one later
    setSelectedUser: (selectedUser) => set({selectedUser})
}))