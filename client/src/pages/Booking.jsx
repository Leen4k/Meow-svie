import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios';
import { MdOutlineChair } from 'react-icons/md';
import {motion} from "framer-motion"

const Booking = () => {

  const {currentUser} = useContext(AuthContext);
  const [userBooking, setUserBooking] = useState([]);

  useEffect(()=>{
    axios.get("/booking").then(({ data }) => {
      const filterUserBooking = data.filter(({ user }) => user === currentUser.email);
      
      // Update state with the filtered user bookings
      setUserBooking(filterUserBooking);
    })
    .catch(error => {
      console.error("Error fetching booking data:", error);
    })

  },[])
  console.log(userBooking)

  return (
    <section className="col-span-6 px-4 z-[10] mb-8 overflow-y-scroll">
        <div className="sticky">
        <h2 className="p-[.7rem]">Bookings</h2>
        <p className="p-[.7rem]">Welcome Back <span className="text-primary upper">{currentUser && currentUser.email.split("@")[0]}!</span></p>
        </div>
        <div className="flex gap-4 flex-col p-[.7rem]">
          {userBooking.length > 0 && userBooking.map((booking)=>(
            <motion.div layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="flex gap-4 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
              <img className="object-cover w-32 aspect-square" src={`https://image.tmdb.org/t/p/w500${booking.movieImg}`} alt="" />
              <div className="py-2">
                <span className="text-xl">{booking.movie_title}</span>
                <p className="text-light">{booking.cinema}</p>
                <p className="text-light">{booking.date}</p>
                <span className="">{booking.time}</span>
                <p className="flex gap-1">Booking Ticket: <span className="block">{booking.booking_id}</span></p>
                <p className={`flex items-center gap-2`}><span><MdOutlineChair className="text-xl" /></span>{booking.seats.length>0 && booking.seats.map((seat)=>(
                  <p>{seat.isVIP?seat.seatNumber+"(VIP)":seat.seatNumber}</p>
                ))}</p>
                <p>Thanks for booking! {booking.firstName}</p>
              </div>
            </motion.div>
          ))}
        </div>
    </section>
  )
}

export default Booking