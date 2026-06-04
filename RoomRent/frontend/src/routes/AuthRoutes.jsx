import React from 'react'
import {Route, Routes} from "react-router-dom"
import Signup from '../auth/Signup'
import Home from '../pages/Home'
import Login from '../auth/Login'
import Profile from '../pages/Profile'
import Navbar from '../Navbar'
const AuthRoutes = () => {
  return (
    <>
      <Navbar/>
      <Routes>
           <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile/>}/>
       </Routes>
</>
  )
}

export default AuthRoutes