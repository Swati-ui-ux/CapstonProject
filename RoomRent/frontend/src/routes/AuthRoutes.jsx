import React from 'react'
import {Route, Routes} from "react-router-dom"
import Signup from '../auth/Signup'
import Home from '../pages/Home'
import Login from '../auth/Login'
import Profile from '../pages/Profile'
import Navbar from '../Navbar'
import AddProperty from '../pages/AddProperty'
import MyProperties from '../pages/MyProperties'
import PropertyDetails from '../pages/PropertyDetail'
import MyRoom from '../pages/MyRoom'
const AuthRoutes = () => {
  return (
    <>
      <Navbar/>
      <Routes>
           <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route
  path="/add-property"
  element={<AddProperty />}
        />
        <Route
  path="/my-properties"
  element={<MyProperties />}
        />
        <Route
  path="/property/:id"
  element={<PropertyDetails />}
        />
        <Route
  path="/my-room"
  element={<MyRoom />}
/>
       </Routes>
</>
  )
}

export default AuthRoutes