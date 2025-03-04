import React , {useEffect} from 'react'
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'
import DefaultLayout from './Layouts/DefaultLayout'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { useDispatch } from 'react-redux'
import SrudentLayout from './Layouts/SrudentLayout'
import StudentDashboard from './Pages/StudentDashboard'
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
          <Route path="/" element={<DefaultLayout/>}>
              <Route index element={<Home/>}/>
              <Route path='/login' element={<Login/>} />
              {/* <Route path='/studentDashBord' element={<StudentDashboard/>} /> */}
          </Route>
          <Route path='/student' element={<SrudentLayout/>} >
            <Route index element={<h3>Tets</h3>} />
            <Route  path='dashbored' element={<h3><StudentDashboard/></h3>} />
            <Route  path='pop' element={<h3>pop</h3>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  ) 
}
