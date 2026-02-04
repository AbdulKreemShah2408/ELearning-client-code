"use client"
import { FC,useState } from "react"
import Heading from "./utils/Heading";
import Header from "./components/Header"
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses"
import Reviews from "./components/Route/Reviews"
import FAQ from "./components/Route/FAQ"
import Footer from "./components/Footer/Footer"

import { useEffect } from "react";

interface Props{}

const Page:FC<Props>=(props)=>{
  const[open,setOpen]=useState(false);
  const [activeItem]=useState(0);
  const [route,setRoute]=useState("Login")
 
  
  return (
   <div>
    <Heading
     title="Elearning"
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
      <Hero/>
      <Courses/>
      <Reviews />
      <FAQ />
      <Footer/>
   </div>
  )
}

export default Page;