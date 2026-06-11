import React from 'react'
import Signup from './auth/Signup'
import AuthRoutes from "./routes/AuthRoutes"
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
const App = () => {
    const darkMode = useSelector(
    (state) => state.theme.darkMode
  )



  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  

  return (
    <>
      <AuthRoutes />
      <ToastContainer/>
</>
  )
}

export default App