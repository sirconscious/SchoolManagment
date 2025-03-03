import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
export default function DefaultLayout() {
  return (
    <div>
        <NavBar/>
        <div className="w-full">

        <Outlet/>

        </div>
    </div>
  )
}
