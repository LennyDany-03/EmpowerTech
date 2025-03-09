import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Find from './pages/Find'
import Legal from './pages/Legal'
import Dashboard from './pages/Dashboard'
import ChatBot from './pages/Chatbot'

import WorkerRights from './pages/Worker-Rights'
import TenantRights from './pages/TenderRights'

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
            <Route  path='/' element={<Home />}/>
            <Route  path='/find' element={<Find />}/>
            <Route  path='/legal' element={<Legal />}/>
            <Route  path='/dashboard' element={<Dashboard />}/>
            <Route  path='/chatbot' element={<ChatBot />}/>
            <Route  path='/workers-rights' element={<WorkerRights />}/>
            <Route  path='/tenant-rights' element={<TenantRights />}/>
        </Routes>
      </Router>
    </>
  )
}
export default App