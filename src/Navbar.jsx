import React from 'react'
import {FaGithubAlt} from 'react-icons/fa'
import {BiSearch, BiSolidUserCircle} from 'react-icons/bi'

const Navbar = () => {
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
        <div className="flex items-center gap-1 rounded-xl                  
                  bg-gray-400 
                    bg-clip-padding 
                    backdrop-filter 
                    backdrop-blur-sm 
                    bg-opacity-10 
                    p-2
                    cursor-pointer
                    ">
            <BiSolidUserCircle className="text-2xl" />
            <p>N4k's</p>
        </div>
    </div>
  )
}

export default Navbar