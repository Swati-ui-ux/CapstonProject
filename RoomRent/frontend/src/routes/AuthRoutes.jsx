import React from 'react'
import {Route, Routes} from "react-router-dom"
import Signup from '../auth/Signup'
import Home from '../pages/Home'
import Login from '../auth/Login'
const AuthRoutes = () => {
  return (
      <Routes>
           <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login/>}/>
       </Routes>
  )
}

export default AuthRoutes