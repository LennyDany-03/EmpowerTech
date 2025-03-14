import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Find from './pages/Find'
import Legal from './pages/Legal'
import Dashboard from './pages/Dashboard'
import ChatBot from './pages/Chatbot'

import WorkerRights from './pages/Worker-Rights'
import TenantRights from './pages/TenderRights'
import ConsumerRights from './pages/ConsumerRights'
import CyberLaw from './pages/CyberLaw'
import WomenRights from './pages/WomenRights'
import SeinorRights from './pages/SeniorRights'
import RightToInformation from './pages/RightToInformation'
import LowIncome from './pages/LowIncome'
import Game from './pages/Game'
import Contact from './pages/Contact'

import SignIn from './pages/Signin'
import Profile from './pages/Profile'

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
            <Route  path='/consumer-rights' element={<ConsumerRights />}/>
            <Route  path='/cyber-laws' element={<CyberLaw />}/>
            <Route  path='/womens-rights' element={<WomenRights />}/>
            <Route  path='/senior-rights' element={<SeinorRights />}/>
            <Route  path='/rti' element={<RightToInformation />}/>
            <Route  path='/legal-aid' element={<LowIncome />}/>
            <Route  path='/learn' element={<Game />}/>
            <Route  path='/contact' element={<Contact />}/>

            <Route  path='/signin' element={<SignIn />}/>
            <Route  path='/profile' element={<Profile />}/>
        </Routes>
      </Router>
    </>
  )
}
export default App