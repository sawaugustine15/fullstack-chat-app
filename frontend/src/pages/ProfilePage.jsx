import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import avator from '../assets/avatar.png'
import { Camera, Mail, User } from "lucide-react";
import { useState } from "react";
// import { useThemeStore } from "../store/useThemeStore";

const ProfilePage = () => {
  const { authUser, isUpdateingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null)

  // const {theme, setTheme} = useThemeStore()
  // console.log("profile page",theme)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    
    if(!file) return;

    const reader = new FileReader()
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image)
      await updateProfile({profilePic: base64Image})
    }


  };
  return (
    <div className={`pt-20 ${'text-white'} backdrop-blur-3xl`} >
      <div className="max-w-md mx-auto p-4 py-8 bg-cyan-950/45 rounded-2xl ">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="mt-2">You profile information</p>
        </div>
        {/* avatar upload section */}

        <div className="flex flex-col items-center gap-4 pt-5">
          <div className="relative">
            <img
              src={selectedImage || authUser.profilePic || avator}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 
                bg-amber-50 hover:scale-105 p-2 
                rounded-full cursor-pointer transition-all 
                duration-200 ${
              isUpdateingProfile ? "animate-pulse pointer-events-none" : ""
            }`}
            >
              <Camera className="w-5 h-5 text-amber-950" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdateingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-50 ">
            {isUpdateingProfile? "Uploading..." : "Click the camera icon to update your photo"}
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <User className="w-4 h-4 text-white" />
              <div className=" text-white" >Full Name</div>
            </div>
            <p className="px-4 py-2.5  rounded-lg border">{authUser?.fullName}</p>
          </div>

          <div className="space-y-1 5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-white" />
              <div className=" text-white" >mail Address</div>
            </div>
            <p className="px-4 py-2.5   rounded-lg border">{authUser?.email}</p>
          </div>
        </div>

        <div className="mt-6 bg-cyan-900/35 rounded-xl p-6 backdrop-blur-none border-b-1 border-r-1 border-b-black-500">
          <h2 className="text-lg font-medium mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
