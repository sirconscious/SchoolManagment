import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
export default function DefaultLayout() {
  return (
    <div>
        <NavBar/>
        <Outlet/>
    </div>
  )
}
