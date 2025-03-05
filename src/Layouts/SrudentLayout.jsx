import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom' 
import StudentDashboard from '../components/StudentDashbored'
export default function SrudentLayout() {
  return (
    <div>
        <div className=" fixed right-0 w-full">
        <NavBar />
        </div>
            
       
            
        <Outlet />
    </div>
  )
}
