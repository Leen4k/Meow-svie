import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase';
import {signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      dispatch({type:"LOGIN", payload:user});
      console.log(user)
      navigate("/booking")
    })
    .catch((error) => {
      setError(true)    
      console.log(error) 
    });
  }


  return (
    <motion.section layout className="col-span-8 px-[6rem]">
        <p className="px-[.7rem] text-center mb-8">Login to grab a seat at <span>Meow'svie Now!</span></p>

        <form onSubmit={handleLogin} action="" className="flex flex-col gap-6 text-light lg:w-[50%] m-auto bg-gray-400 
                          rounded-xl
                          py-8
                          px-8
                          h-[70%]
                          bg-clip-padding 
                          backdrop-filter 
                          backdrop-blur-sm 
                          bg-opacity-10  ">
          <h2 className="text-2xl font-bold text-center mb-8">Login Page</h2>
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
          <p className="text-center text-sm">Don't have an account yet? <Link to="/account" className="cursor-pointer text-primary">Register Now!</Link></p>
          <button type="submit" className="bg-primary text-dark p-2 rounded-md cursor-pointer">Login</button>
          {error&&<span>Wrong email or password</span>}

        </form>
    </motion.section>
  )
}

export default Login