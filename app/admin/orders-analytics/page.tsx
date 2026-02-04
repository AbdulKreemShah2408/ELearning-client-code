"use client"
import React, { FC } from 'react'
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar"
import Heading from "../../utils/Heading"
import OrderAnalytics from "../../components/Admin/Analytics/OrderAnalytics"
import DashboardHeader from "../../components/Admin/DashboardHeader"
type Props = {
  
}

const page = (props:Props) => {
  return (
    <div>
          <Heading 
        title="ELearning - Admin"
        description='ELearning is a platform for students to learn and get help from teachers'
        keywords='Programming,LMS,MERN,Redux,Machine Learning'
        />
        <div className='flex'>
         <div className='1500px:w-[16%] w-1/5'>
          <AdminSidebar />
         </div>
         <div className='w-[85%]'>
           <DashboardHeader  />
           <OrderAnalytics />
         </div>
        </div>
    </div>
  )
}

export default page