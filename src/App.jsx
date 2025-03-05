import React , {useEffect} from 'react'
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'
import DefaultLayout from './Layouts/DefaultLayout'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { useDispatch } from 'react-redux'
import SrudentLayout from './Layouts/SrudentLayout'
import StudentDashboard from './Pages/StudentDashboard'
import AdminLayout from './Layouts/AdminLayout'
import AdminDashbored from './components/AdminDashbored'
import TeacherLayout from './Layouts/TeacherLayout'
import TeacherDashbored from './components/TeacherDashbored'
export default function App() {  
  const dispatch = useDispatch()
    useEffect(() => {
      const loginStatus = localStorage.getItem("LOGIN_STATUS"); 
      const userData = localStorage.getItem("USER_DATA"); 
      if (loginStatus === "true") {
        dispatch({ type : "LOG_IN" , payload :  JSON.parse(userData)})
      } 
    } , [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* default route */}
          <Route path="/" element={<DefaultLayout/>}>
              <Route index element={<Home/>}/>
              <Route path='/login' element={<Login/>} />
          </Route>
          {/* student route */}
          <Route path='/student' element={<SrudentLayout/>} >
            <Route index element={<h3>Tets</h3>} />
            <Route  path='dashbored' element={<StudentDashboard />} />
            <Route  path='pop' element={<h3>pop</h3>} />
          </Route>
          {"/* admin route */"}
          <Route path='/admin' element={<AdminLayout />} >
          <Route path='dashbored' element={<AdminDashbored />}/>
          </Route>
          <Route path='/teacher' element={<TeacherLayout />}>
          <Route path='dashbored' element={<TeacherDashbored />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  ) 
}
