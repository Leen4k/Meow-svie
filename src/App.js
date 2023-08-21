import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Cinema from './pages/Cinema'
import Booking from './pages/Booking'
import Ads from './Ads'
import Account from './pages/Account'

const App = () => {
  return (
    <div className="grid grid-cols-12 bg-darker h-screen overflow-hidden relative">
      <div className="absolute gradient-01 -rotate-45 inset-20 opacity-20"></div>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <Ads />
    </div>
  )
}

export default App