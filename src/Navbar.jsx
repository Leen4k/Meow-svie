import React, { useContext } from 'react'
import {FaGithubAlt} from 'react-icons/fa'
import {BiSearch, BiSolidUserCircle} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'

const Navbar = () => {

  const {currentUser} = useContext(AuthContext);
  // const {email} = currentUser;

  return (
    <div className="fixed px-[1.7rem] py-4 text-primary w-screen col-span-3 flex items-center justify-between gap-1">
        <div className="flex gap-1">
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
        <Link to={currentUser?"/logout":"/login"} className="flex items-center gap-1 rounded-xl                  
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
        </Link>
    </div>
  )
}

export default Navbar