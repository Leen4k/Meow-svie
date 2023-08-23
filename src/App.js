import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Cinema from './pages/Cinema'
import Booking from './pages/Booking'
import Ads from './Ads'
import Account from './pages/Account'
import Login from './pages/Login'
import { AuthContext } from './contexts/AuthContext'
import CinemaDetails from './pages/CinemaDetails'

const App = () => {

  const {currentUser} = useContext(AuthContext);

  const ReqAuth = ({children}) => {
    return (currentUser?children:<div className="col-span-6 px-[0.7rem]">
            <Login />
    </div>)
  }

  return (
    <div className="grid grid-cols-12 bg-darker h-screen overflow-hidden relative">
      <div className="absolute gradient-01 -rotate-45 inset-20 -z-[0] opacity-20"></div>
      <Navbar />
      <Sidebar />
      <Routes className="z-50">
        <Route path="/" element={<Home />} />
        <Route path="/cinema" element={<Cinema />} />
        {/* <Route path="/cinema/:id" element={<CinemaDetails />} /> */}
        <Route path="/cinema/:id/:day" element={<CinemaDetails />} />
        <Route path="/booking" element={<ReqAuth><Booking /></ReqAuth>} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Home />} />
      </Routes>
      <Ads />
    </div>
  )
}

export default App