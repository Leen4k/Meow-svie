import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Booking = () => {

  const {currentUser} = useContext(AuthContext);

  return (
    <section className="col-span-6 px-4">
        <h2 className="p-[.7rem]">Bookings</h2>
        <p className="p-[.7rem]">Welcome Back <span className="text-primary upper">{currentUser && currentUser.email.split("@")[0]}!</span></p>
        <form action="">
  
        </form>
    </section>
  )
}

export default Booking