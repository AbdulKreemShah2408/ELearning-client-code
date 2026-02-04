import { styles } from "../../styles/styles";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarDefault from "../../../public/assets/avatardefault.jpg";
import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar,{isSuccess,error}]=useUpdateAvatarMutation();
  const [loadUser,setLoadUser]=useState(false);
  const {}=useLoadUserQuery(undefined,{skip:loadUser ? false:true});
  const [editProfile,{isSuccess:success,error:updateError}]=useEditProfileMutation();
  const imgeHandler = async (e: any) => {
    const fileReader=new FileReader();
    fileReader.onload=()=>{
      if(fileReader.readyState===2){
        const avatar=fileReader.result;
         updateAvatar(
          avatar,
         )
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
   if(isSuccess || success){
    setLoadUser(true);
   }
   
   if(error){
    console.log(error || updateError);
   }
   if(success){
    toast.success("Profile updated successfully");
   }
  }, [isSuccess,error,success,updateAvatar]);

   

  const handleSubmit = async (e: any) => {
    e.preventDefault();
     if(name !==""){
     await editProfile({
        name:name,
        
      })
     }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="relative">
        {/* Profile Image Section */}
        <div className="relative flex justify-center w-full top-10">
          <div className="relative">
            <Image
              src={user.avatar || avatar ? user.avatar?.url || avatar : avatarDefault}
              width={120}
              height={120}
              alt="Profile"
              quality={100}
              className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full object-cover"
            />
            <input
             title="f"
              type="file"
              name="avatar"
              id="avatar"
              className="hidden"
              onChange={imgeHandler}
              accept="image/png,image/jpg,image/jpeg,image/webp"
            />
            <label htmlFor="avatar">
              <div className="w-[30px] h-[30px] bg-slate-900 dark:bg-slate-700 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                <AiOutlineCamera size={20} className="z-1" fill="#fff" />
              </div>
            </label>
          </div>
        </div>
        <br/>
        <br/>

        {/* Form Section */}
        <div className="w-full pl-6 md:pl-10 mt-20"> {/* Increased margin top to clear absolute image */}
          <form onSubmit={handleSubmit}>
            <div className="md:w-[100%] pb-4">
              <label className="block pb-2 text-black dark:text-white font-medium">
                Full Name
              </label>
              <input
               title="e"
                type="text"
                className="w-full md:w-[400px] border border-gray-400 dark:border-gray-500 bg-transparent rounded-[5px] p-2 outline-none text-black dark:text-white"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="md:w-[100%] pb-4">
              <label className="block pb-2 text-black dark:text-white font-medium">
                Email Address
              </label>
              <input
              title="g"
                type="email"
                readOnly
                className="w-full md:w-[400px] border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-transparent rounded-[5px] p-2 outline-none text-black dark:text-white cursor-not-allowed"
                required
                value={user?.email}
              />
            </div>

            <input
             title="g"
              className="w-full md:w-[400px] h-[40px] border border-[#37a39a] text-[#37a39a] dark:text-[#fff] rounded-[3px] mt-4 cursor-pointer hover:bg-[#37a39a] hover:text-white transition-all duration-300 font-semibold"
              value="Update"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;