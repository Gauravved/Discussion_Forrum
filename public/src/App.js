import React from 'react'
import Registeration from './pages/Registration.jsx'
import Login from './pages/Login.jsx'
import Chats from './pages/chat.jsx'
import {BrowserRouter as Routers, Route, Routes} from 'react-router-dom'

export default function App() {
  return (
    <div>
      <Routers>
        <Routes>
          <Route path='/register' element={<Registeration />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/chats' element={<Chats />} />
        </Routes>
      </Routers>
    </div>
  )
}
