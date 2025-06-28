import {create} from 'zustand'
import { axiosInstanace } from '../lib/axios.js'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:5001' : "/"

export const useAuthStore = create((set, get)=>({
    authUser: null,
    isSingninUp: false,
    isLoggingIng: false,
    isUpdateingProfile: false,
    isCheckingAuth: true,
    onlineUsers:[],
    socket: null,

    checkAuth: async () => {
        try {
            // console.log("hi")
            const res = await axiosInstanace.get("/auth/check")
            // console.log("/auth/check", res)
            set({authUser: res.data})

            get().connectSocket()
        }catch (error){
            console.log("Error in checkAuth: ", error)
            set({authUser: null})
            get().connectSocket()
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
            set({ isSingninUp: true})
            try {
                const res = await axiosInstanace.post("/auth/signup", data)
                set({ authUser: res.data})
                toast.success(" Account created successfully")
            }catch (error){
                toast.error(" Account cannot created ",error)
                // toast.error("error up",error.response.data)
            }finally{
                set({ isSingninUp: false})
            }
    },

// log in
// logout
    login: async (data) => {
        set({ isLoggingIng: true })
        try {
            const res = await axiosInstanace.post("/auth/login", data)
            set({ authUser: res.data });
            toast.success("Logged in successfully")

            get().connectSocket()
        } catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({ isLoggingIng: false })
        }
    },
    logout: async () => {
        try {
            await axiosInstanace.post("/auth/logout")
            set({ authUser: null})
            toast.success("Logged out successfuly")
            get().disconnectSocket()
        }catch(error) {
            toast.error("somethin is wrong in log out page",error)
        }
    },

    updateProfile: async(data) => {
        // console.log("com data",data)
         set({ isUpdateingProfile: true})

         try{
            const res = await axiosInstanace.put("/auth/update-profile", data)
            set({ authUser: res.data})
            toast.success("Profile update successfully")

         }catch (error){
            console.log("error in update profile:", error)
            toast.error(error)
         }finally{
            set({ isUpdateingProfile: false })
         }
    },
    connectSocket: ()=> {
        const { authUser } = get()
        if(!authUser || get().socket?.connected) return

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            }
        })
        socket.connect()

        set({ socket:socket })

        socket.on("getOnlineUsers", (usersIds) => {
            set({onlineUsers: usersIds})
        })
    },

    disconnectSocket: ()=> {
        if(get().socket?.connected) get().socket.disconnect()
    }

}))