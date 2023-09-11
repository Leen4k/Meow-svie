import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Account = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      setEmail("");
      setPassword("");
      navigate("/login")
    })
    .catch((error) => {
      setError(true)     
    });
  }


  return (
    <section className="col-span-8 px-[6rem]">
        <p className="px-[.7rem] text-center mb-8">New to <span>Meow'svie?</span></p>

        <form onSubmit={handleLogin} action="" className="flex flex-col gap-6 text-light lg:w-[60%] xl:w-[50%] m-auto bg-gray-400 
                          rounded-xl
                          py-8
                          px-8
                          min-h-[60%]
                          bg-clip-padding 
                          backdrop-filter 
                          backdrop-blur-sm 
                          bg-opacity-10  ">
          <h2 className="text-2xl font-bold text-center mb-8">Register Page</h2>
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
          <p className="text-center text-sm">Already Have an Account? <Link to="/login" className="cursor-pointer"><span>Login</span></Link></p>
          <button type="submit" className="bg-primary text-dark p-2 rounded-md cursor-pointer">Register Account</button>

        </form>
    </section>
  )
}

export default Account