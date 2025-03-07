import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Find from './pages/Find'
import Legal from './pages/Legal'
import Dashboard from './pages/Dashboard'

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
            <Route  path='/' element={<Home />}/>
            <Route  path='/find' element={<Find />}/>
            <Route  path='/legal' element={<Legal />}/>
            <Route  path='/dashboard' element={<Dashboard />}/>
        </Routes>
      </Router>
    </>
  )
}
export default App