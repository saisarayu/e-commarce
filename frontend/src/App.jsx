import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {Routes,Route} from 'react-router-dom'
import { LoginPage , SignupPage } from './routes/routes'
function App() {
  

  return (
   <>
   <Routes>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/signup' element={<SignupPage/>}/>
   </Routes>
   </>
  )
}
export default App