import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DefaultLayout from './Layouts/DefaultLayout'
import Login from './Pages/Login'
import Home from './Pages/Home'
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout/>}>
              <Route index element={<Home/>}/>
              <Route path='/login' element={<Login/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
