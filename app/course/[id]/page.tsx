"use client"
import React from 'react'
import CourseDetailsPage from "../../components/Course/CourseDetailsPage"
type Props = {
    params:{
        id:string
    }
}

const page = ({params}: Props) => {
    const id=params.id;
  return (
    <div>
        <CourseDetailsPage id={id} />
    </div>
  )
}

export default page