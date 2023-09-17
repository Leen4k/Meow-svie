import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase';
import {signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AdminContext } from '../contexts/AdminContext';

const LoginAdmin = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {admin, setAdmin} = useContext(AdminContext);

  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
   const adminInfo = axios.post("/login-admin",{email,password},{withCredentials: true})
    .then(({data})=>{
        console.log(data)
        setAdmin(data );   
        alert("login successful")
        navigate("/admin/manage-cinema")
    })
    .catch((err) => {console.log(err);alert("login failed")});
  }
  


  return (
    <motion.section layout className="col-span-8 px-[6rem]">
        {/* <p className="px-[.7rem] text-center mb-8">Login to grab a seat at <span>Meow'svie Now!</span></p> */}

        <form onSubmit={handleLogin} action="" className="flex flex-col gap-6 text-light lg:w-[50%] m-auto bg-gray-400 
                          rounded-xl
                          py-8
                          px-8
                          h-[70%]
                          bg-clip-padding 
                          backdrop-filter 
                          backdrop-blur-sm 
                          bg-opacity-10  ">
          <h2 className="text-2xl font-bold text-center mb-8">Admin Login Page</h2>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="
                          rounded-md                  
                          bg-gray-400 
                          bg-clip-padding 
                          backdrop-filter 
                          backdrop-blur-sm 
                          bg-opacity-10 
                          py-2
                          px-4
                          cursor-pointer
                          placeholder:text-gray-500
            " placeholder="email" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="
              rounded-md                  
              bg-gray-400 
              bg-clip-padding 
              backdrop-filter 
              backdrop-blur-sm 
              bg-opacity-10 
              py-2
              px-4
              cursor-pointer
              placeholder:text-gray-500
            "
            placeholder="password"
             />
          </div>
          <button type="submit" className="bg-primary text-dark p-2 rounded-md cursor-pointer">Login</button>
          {error&&<span>Wrong email or password</span>}

        </form>
    </motion.section>
  )
}

export default LoginAdmin