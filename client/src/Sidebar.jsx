import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {BiHomeAlt2,BiSolidCameraMovie} from "react-icons/bi"
import {FiLogOut} from "react-icons/fi"
import {TbBrandBooking} from "react-icons/tb"
import { AuthContext } from './contexts/AuthContext'
import { motion } from "framer-motion"
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { AdminContext } from './contexts/AdminContext'
import axios from 'axios'

const Sidebar = ({isActive}) => {
  const {currentUser} = useContext(AuthContext);
  const {admin} = useContext(AdminContext);
  const navigate = useNavigate();
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [logoutAlertAdmin, setLogoutAlertAdmin] = useState(false);
  const {pathname} = useLocation();
  console.log(pathname)

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
        <NavLink layout to="/" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><BiHomeAlt2 /></i>Home</NavLink>
        <NavLink layout to="/cinema" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><BiSolidCameraMovie/></i>{pathname.includes("/admin")?"Manage Cinema":"Cinema"}</NavLink>
        <NavLink to="/booking" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><TbBrandBooking /></i>Bookings</NavLink>
        <NavLink to="/logout" onClick={()=>{handleLogout()}} className={`${!currentUser?"hidden":""} flex items-center gap-2 p-[.7rem] text-light`}><i className="text-primary"><FiLogOut /></i>Logout</NavLink>
        <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="h-[30%] transition-all ease-in-out delay-700 justify-between py-8 px-7 w-1/3 flex flex-col m-auto z-10 absolute inset-0 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
          <p className="font-bold text-lg">Are you sure you want to Logout?</p>
          <p>It's sad to see you go <span>{currentUser && currentUser.email.split("@")[0]}!</span></p>
          <div className="flex justify-end gap-4">
            <button onClick={()=>{setLogoutAlert(false);navigate(-1)}} className="text-light bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-4 py-2 rounded-md">No</button>
            <button onClick={()=>{localStorage.clear();navigate("/");window.location.reload();setLogoutAlert(false);}} className="bg-primary px-4 py-2 rounded-md">Yes</button>
          </div>
      </motion.div>
    </section>
    )
  }

  if(logoutAlertAdmin){
    return(
      <section className="flex flex-col gap-8 pt-32 px-4 py-8 col-span-2 transition ease-in-out delay-150">
        {!pathname.includes("/admin") && <NavLink to={"/"} className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><BiHomeAlt2 /></i>Home</NavLink>}
        <NavLink to={pathname.includes("/admin")?"/admin/manage-cinema":"/cinema"} className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><BiSolidCameraMovie/></i>{pathname.includes("/admin")?"Manage Cinema":"Cinema"}</NavLink>
        <NavLink to="/admin/manage-user" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><AiOutlineUsergroupAdd /></i>Manage User</NavLink>
        {!pathname.includes("/admin") && <NavLink to="/booking" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><TbBrandBooking /></i>Bookings</NavLink>}
        {!pathname.includes("/admin") && <NavLink to="/admin" onClick={()=>{handleLogout()}} className={`${!currentUser?"hidden":""} flex items-center gap-2 p-[.7rem] text-light`}><i className="text-primary"><FiLogOut /></i>Logout</NavLink>}
        <NavLink to="/admin/logout" onClick={()=>{handleLogoutAdmin()}} className={`${!currentUser?"hidden":""} flex items-center gap-2 p-[.7rem] text-light`}><i className="text-primary"><FiLogOut /></i>Signout</NavLink>
        <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="h-[30%] transition-all ease-in-out delay-700 justify-between py-8 px-7 w-1/3 flex flex-col m-auto z-10 absolute inset-0 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
          <p className="font-bold text-lg">Are you sure you want to Signout?</p>
          <p>It's sad to see you go <span>{admin && admin.name}!</span></p>
          <div className="flex justify-end gap-4">
            <button onClick={()=>{setLogoutAlertAdmin(false);navigate(-1)}} className="text-light bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-4 py-2 rounded-md">No</button>
            <button onClick={async()=>{await axios.post("/logout-admin").then(()=>{alert("signout sucessful")});navigate("/admin/manage-cinema");window.location.reload();setLogoutAlertAdmin(false);}} className="bg-primary px-4 py-2 rounded-md">Yes</button>
          </div>
      </motion.div>
    </section>
    )
  }

  const handleLogout = (e) => {
    setLogoutAlert(true)
  }
  const handleLogoutAdmin = (e) => {
    setLogoutAlertAdmin(true)
  }

  return (
    <section className="flex flex-col gap-8 pt-32 px-4 py-8 col-span-2">
        {/* client */}
        {!pathname.includes("/admin") && <NavLink to={"/"} className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><BiHomeAlt2 /></i>Home</NavLink>}
        {!pathname.includes("/admin") && <NavLink to={"/cinema"} className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><BiSolidCameraMovie/></i>{"Cinema"}</NavLink>}
        {!pathname.includes("/admin") && <NavLink to="/booking" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><TbBrandBooking /></i>Bookings</NavLink>}
        {!pathname.includes("/admin") && <NavLink to="/logout" onClick={()=>{handleLogout()}} className={`${!currentUser?"hidden":""} flex items-center gap-2 p-[.7rem] text-light`}><i className="text-primary"><FiLogOut /></i>Logout</NavLink>}
        {/* admin */}
        {pathname.includes("/admin") && <NavLink to={"/admin/manage-cinema"} className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><BiSolidCameraMovie/></i>{"Manage Cinema"}</NavLink>}
        {pathname.includes("/admin") && <NavLink to="/admin/manage-user" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><AiOutlineUsergroupAdd /></i>Manage User</NavLink>}
        {pathname.includes("/admin") && <NavLink to="/admin/logout" onClick={()=>{handleLogoutAdmin()}} className={`${!admin?"hidden":""} flex items-center gap-2 p-[.7rem] text-light`}><i className="text-primary"><FiLogOut /></i>Signout</NavLink>}
    </section>
  )
}

export default Sidebar