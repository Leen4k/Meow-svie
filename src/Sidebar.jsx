import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {BiHomeAlt2,BiSolidCameraMovie} from "react-icons/bi"
import {FiLogOut} from "react-icons/fi"
import {TbBrandBooking} from "react-icons/tb"
import { AuthContext } from './contexts/AuthContext'

const Sidebar = ({isActive}) => {
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [logoutAlert, setLogoutAlert] = useState(false);

  const {pathname} = useLocation();

  useEffect(()=>{
    if(pathname === "/logout"){
      setLogoutAlert(true);
    }else{
      setLogoutAlert(false);
    }
  },[pathname])

  if(logoutAlert){
    return(
      <section className="flex flex-col gap-8 pt-32 px-4 py-8 col-span-2 transition ease-in-out delay-150">
        <NavLink to="/" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><BiHomeAlt2 /></i>Home</NavLink>
        <NavLink to="/cinema" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><BiSolidCameraMovie/></i>Cinema</NavLink>
        <NavLink to="/booking" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><TbBrandBooking /></i>Bookings</NavLink>
        <NavLink to="/logout" onClick={()=>{handleLogout()}} className={`${!currentUser?"hidden":""} flex items-center gap-2 p-[.7rem] text-light`}><i className="text-primary"><FiLogOut /></i>Logout</NavLink>
        <div className="h-[30%] transition-all ease-in-out delay-700 justify-between py-8 px-7 w-1/3 flex flex-col m-auto z-10 absolute inset-0 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
          <p className="font-bold text-lg">Are you sure you want to Logout?</p>
          <p>It's sad to see you go <span>{currentUser && currentUser.email.split("@")[0]}!</span></p>
          <div className="flex justify-end gap-4">
            <button onClick={()=>setLogoutAlert(false)} className="text-light bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-4 py-2 rounded-md">No</button>
            <button onClick={()=>{localStorage.clear();navigate("/");window.location.reload();setLogoutAlert(false);}} className="bg-primary px-4 py-2 rounded-md">Yes</button>
          </div>
      </div>
    </section>
    )
  }

  const handleLogout = (e) => {
    setLogoutAlert(true)
    // localStorage.clear();
    // window.location.reload();
  }

  return (
    <section className="flex flex-col gap-8 pt-32 px-4 py-8 col-span-2">
        <NavLink to="/" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><BiHomeAlt2 /></i>Home</NavLink>
        <NavLink to="/cinema" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><BiSolidCameraMovie/></i>Cinema</NavLink>
        <NavLink to="/booking" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><TbBrandBooking /></i>Bookings</NavLink>
        <NavLink to="/logout" onClick={()=>{handleLogout()}} className={`${!currentUser?"hidden":""} flex items-center gap-2 p-[.7rem] text-light`}><i className="text-primary"><FiLogOut /></i>Logout</NavLink>
    </section>
  )
}

export default Sidebar