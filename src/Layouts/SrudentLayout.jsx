import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom' 
import SideBar from '../components/SideBar'
export default function SrudentLayout() {
  return (
    <div>
        <div className=" z-50">
        <NavBar />
            </div>
            <div className="z-10">
        <SideBar />
            </div>
        <Outlet />
    </div>
  )
}
