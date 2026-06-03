import React from 'react'
import Signup from './auth/Signup'
import AuthRoutes from "./routes/AuthRoutes"
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
<>
      <AuthRoutes />
      <ToastContainer/>
</>
  )
}

export default App