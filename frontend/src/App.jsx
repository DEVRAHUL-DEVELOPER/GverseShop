import React from 'react'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Registration from './pages/Registration.jsx'
import { Route, Routes,} from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Registration />} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>

    </>
  )
}

export default App
