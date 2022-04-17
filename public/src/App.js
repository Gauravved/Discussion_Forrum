import React from 'react'
import Registration from './pages/Registration.jsx'
import Login from './pages/Login.jsx'
import Chats from './pages/chat.jsx'
import {BrowserRouter as Routers, Route, Routes} from 'react-router-dom'

export default function App() {
  return (
    <div>
      <Routers>
        <Routes>
          <Route exact path='/register' element={<Registration />} />
          <Route exact path='/' element={<Login />}/>
          <Route exact path='/chats' element={<Chats />} />
        </Routes>
      </Routers>
    </div>
  )
}
