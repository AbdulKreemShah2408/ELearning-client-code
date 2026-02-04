"use client"
import React, { FC, useState } from 'react'
 import Protected from "../hooks/useProtected"
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Profile from "../components/Profile/Profile"
import { useSelector } from 'react-redux'
import Footer from '../components/Footer/Footer'
 type Props = {}
 
 const page:FC<Props> = (props: Props) => {
      const[open,setOpen]=useState(false);
      const [activeItem]=useState(5);
      const [route,setRoute]=useState("Login");
      const {user}=useSelector((state:any)=>state.auth);
   return (
     <div className='min-h-screen'>
       <Protected>
         <Heading
     title={`${user.name} profile`}
     description="Elearning is a plateform for students to learn and get help from teachers"
     keywords="Elearning,online learing,education,course,tutorials,tarings"
      />
      <Header 
      open={open}
      setOpen={setOpen}
      activeItem={activeItem}
      route={route}
      setRoute={setRoute}
      />
      <Profile user={user} />
      <Footer />
       </Protected>
     </div>
   )
 }
 
 export default page