import React from 'react'
import Login from '../auth/Login'
import { useSelector } from 'react-redux'

const Home = () => {
  const user = useSelector(state => state.auth.user);
  console.log("User ",user)
  return (
    <div>
      User data
      
    </div>
  )
}

export default Home