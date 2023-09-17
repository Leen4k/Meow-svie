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
import axios from 'axios'
import BookingFormPage from './pages/BookingFormPage'
import Admin from './pages/admin/Admin'
import AdminDetails from './pages/admin/AdminDetails'
import ManageCinema from './pages/admin/ManageCinema'
import ManageUser from './pages/admin/ManageUser'
import LoginAdmin from './pages/LoginAdmin'
import { AdminContext } from './contexts/AdminContext'


const App = () => {

  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;
  const config = { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "text/plain", }, }; const instance = axios.create({ baseURL: "https://api.themoviedb.org/3", https: config, });


  const {currentUser} = useContext(AuthContext);
  const {admin} = useContext(AdminContext);
  
  const ReqAuth = ({children}) => {
    return (currentUser?children:<div className="col-span-8 px-[.7rem]">
            <Login />
    </div>)
  }

  const ReqAdmin = ({children}) => {
    return (admin?children:
    <div className="col-span-8 px-[.7rem]">
    <LoginAdmin />
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
        <Route path="/cinema/:id/:day" element={<CinemaDetails />} />
        <Route path="/cinema/:id/:day/:time/:event_id" element={<CinemaDetails />} />
        <Route path="/admin/manage-cinema" element={<ReqAdmin><Admin /></ReqAdmin>} />
        <Route path="/admin/manage-user" element={<ReqAdmin><ManageUser /></ReqAdmin>} />
        <Route path="/admin/manageCinemaDetails" element={<ManageCinema />} />
        <Route path="/admin/manageCinemaDetails/:cinema_id" element={<ManageCinema />} />  
        <Route path="/admin/:id/:day" element={<ReqAdmin><AdminDetails /></ReqAdmin>} />
        <Route path="/admin/:id/:day/:movie_id" element={<ReqAdmin><AdminDetails /></ReqAdmin>} /> 
        <Route path="/admin/:id/:day/:movie_id/:showtime" element={<ReqAdmin><AdminDetails /></ReqAdmin>} /> 
        <Route path="/admin/:id/:day/:movie_id/:showtime/:event_id" element={<ReqAdmin><AdminDetails /></ReqAdmin>} /> 
        <Route path="/booking" element={<ReqAuth><Booking /></ReqAuth>} />
        <Route path="/BookingFormPage/:event_id" element={<ReqAuth><BookingFormPage /></ReqAuth>} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Home />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
      </Routes>
      <Ads />
    </div>
  )
}

export default App