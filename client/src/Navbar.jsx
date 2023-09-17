import React, { useContext } from 'react'
import {FaGithubAlt} from 'react-icons/fa'
import {BiSearch, BiSolidUserCircle} from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import { motion } from 'framer-motion'
import { BookingContext } from './contexts/BookingContext'
import { AiFillWarning } from 'react-icons/ai'
import { AdminContext } from './contexts/AdminContext'

const Navbar = () => {

  const {currentUser} = useContext(AuthContext);
  const {isSucceeded, setIsSucceeded, seatIsEmpty, isUpdated, error} = useContext(BookingContext);
  const {pathname} = useLocation();
  const {admin} = useContext(AdminContext);


  // const {email} = currentUser;

  return (
    <div className="fixed px-[1.7rem] py-4 text-primary w-screen col-span-3 flex items-center justify-between gap-1 z-[1000]">
        <div className="flex gap-1 cursor-pointer">
            <FaGithubAlt className="text-2xl" />Meow'svie
        </div>
        <div className=" flex px-2 basis-1/3 items-center rounded-xl    
                  bg-gray-400 
                    bg-clip-padding 
                    backdrop-filter 
                    backdrop-blur-sm 
                    bg-opacity-10 ">
            <button className="text-light px-3"><BiSearch /></button>
            <input className="bg-transparent flex-1 focus:outline-none p-2 text-light placeholder:text-gray-500" placeholder="search" type="text" />
        </div>
        {!pathname.includes("/admin") && <Link to={currentUser?"/logout":"/login"} className="flex items-center gap-1 rounded-xl                  
                  bg-gray-400 
                    bg-clip-padding 
                    backdrop-filter 
                    backdrop-blur-sm 
                    bg-opacity-10 
                    p-2
                    cursor-pointer
                    ">
            <BiSolidUserCircle className="text-2xl" />
            <p>{currentUser?currentUser && currentUser.email:"Anonymous"+Math.floor(Math.random(100)*10+10)}</p>
        </Link>}
        {pathname.includes("/admin") && <Link className="flex items-center gap-1 rounded-xl                  
                  bg-gray-400 
                    bg-clip-padding 
                    backdrop-filter 
                    backdrop-blur-sm 
                    bg-opacity-10 
                    p-2
                    cursor-pointer
                    ">
            <img className="w-6 aspect-square rounded-full object-cover" src={admin && admin.photo} alt="" />
            <p>{admin?admin && admin.email:"Anonymous"+Math.floor(Math.random(100)*10+10)}</p>
        </Link>}
        
        {isSucceeded && <motion.div layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="alert bg-primary border-none w-auto px-8 absolute bottom-0 right-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p className="text-dark">Your booking is sucessful!</p>
        </motion.div>}
        {seatIsEmpty && <motion.div layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="alert bg-gray-400 
                    bg-clip-padding 
                    backdrop-filter 
                    backdrop-blur-sm 
                    bg-opacity-10  border-none w-auto px-4 absolute bottom-0 right-4">
          <AiFillWarning className="text-primary " />
          <p className="text-light">Please select a seat to procceed!</p>
        </motion.div>}
        {isUpdated && <motion.div layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="alert bg-primary border-none w-auto px-8 absolute bottom-0 right-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p className="text-dark">Your update is sucessful!</p>
        </motion.div>}
        {error && <motion.div layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity:0 }} key="error_key" transition={{ duration: 0.3 }} className="alert bg-gray-400 
                    bg-clip-padding 
                    backdrop-filter 
                    backdrop-blur-sm 
                    bg-opacity-10  border-none w-auto px-4 absolute bottom-0 right-4">
          <AiFillWarning className="text-primary " />
          <p className="text-light">Please enter all the fields to procceed!</p>
        </motion.div>}

    </div>
  )
}

export default Navbar