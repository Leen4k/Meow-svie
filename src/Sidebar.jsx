import React from 'react'
import { NavLink } from 'react-router-dom'
import {BiHomeAlt2,BiSolidCameraMovie} from "react-icons/bi"
import {FiLogOut} from "react-icons/fi"
import {TbBrandBooking} from "react-icons/tb"

const Sidebar = ({isActive}) => {
  return (
    <section className="flex flex-col gap-8 pt-32 px-4 py-8 col-span-2">
        <NavLink to="/" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><BiHomeAlt2 /></i>Home</NavLink>
        <NavLink to="/cinema" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><BiSolidCameraMovie/></i>Cinema</NavLink>
        <NavLink to="/booking" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><TbBrandBooking /></i>Bookings</NavLink>
        <NavLink to="/account" className="flex items-center gap-2 p-[.7rem] text-light"><i className="text-primary"><FiLogOut /></i>Logout</NavLink>
    </section>
  )
}

export default Sidebar