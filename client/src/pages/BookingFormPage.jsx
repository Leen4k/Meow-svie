import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { BookingContext } from '../contexts/BookingContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"

const BookingFormPage = () => {

    const {currentUser} = useContext(AuthContext);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phone , setPhone] = useState(null);
    const {bookingInfo,setBookingInfo,setBooking_id,selectedSeats} = useContext(BookingContext);
    const navigate = useNavigate();
    const [isBooked, setIsBooked] = useState("");
    const params = useParams();
    const {seatInfo, setSeatInfo, movieTitle, movieOverview, movieImg, error, setError} = useContext(BookingContext);
    const {isSucceeded, setIsSucceeded} = useContext(BookingContext);
    console.log(seatInfo)

    useEffect(()=>{
        let updatedBookingInfo = bookingInfo;
        const newArray= updatedBookingInfo.map(obj => ({
            ...obj,  // Spread the existing properties
            phone:phone, firstName:firstName, lastName:lastName  // Add the new property
          }));          
        setBookingInfo(newArray);
    },[firstName,lastName,phone])

    const id = params.event_id
    console.log(id);

    const confirmBooking = async () => {
        const id = params.event_id

        if(!phone || !firstName || !lastName){
            setError(true)
            const timeout = setTimeout(() => {
                setError(false); 
            }, 5000);
            return () => clearTimeout(timeout);     
        }else{
            axios.post("/booking/",{bookingInfo}).then((res)=>{
                console.log(res.data.booking_id);
                const booking_id = res.data.booking_id;
                setBooking_id(booking_id);
                for (let seat of seatInfo) {
                    for (let selectedSeat of selectedSeats) {
                    if (seat.seatNumber === selectedSeat.seatNumber) {
                        seat.isOccupied = true;
                        seat.isPending = false;
                        seat.user = currentUser.email;
                        seat.booking_id = booking_id;
                        break; // Exit the loop once the seat is found and updated
                    }
                    }
                }
                setSeatInfo(seatInfo);
                axios.put(`event/${id}`,{seatInfo,booking_id})
                navigate("/booking")
                setIsSucceeded(true); 
                const timeout = setTimeout(() => {
                    setIsSucceeded(false); 
                }, 5000);
                return () => clearTimeout(timeout);     
            }).catch((err) => {
                console.log(err)
            });
        }
    }

    const validate = () => {
        let errors ={};

        if(!phone || !firstName || !lastName){
            errors = "Please Complete All The Requiring Information!"
        }
    
        return errors; 
      }


  return (
    <motion.section layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="col-span-6 absolute inset-0 md:w-3/2 lg:w-1/2 flex flex-col min-h-screen z-50 m-auto justify-center gap-4 overflow-scroll">
        <motion.div className="basis-1/3 flex px-4 gap-8 items-start">
            <img className="rounded-lg w-[250px] object-cover aspect-square" src={"https://image.tmdb.org/t/p/w500"+movieImg} alt={movieImg} />
            <div className="flex flex-col gap-4">
                <span className="text-3xl font-bold">{movieTitle}</span>
                {bookingInfo.length > 0 && bookingInfo.map((info) => (
                    <div className="flex flex-col gap-4 justify-between items-between h-full">
                        <div className="flex w-full items-center gap-1">
                            <span className="" htmlFor="">Email:</span>
                            <p className="text-light">{currentUser && currentUser.email}</p>
                        </div>
                        <div className="flex w-full items-center gap-1">
                            <span className="" htmlFor="">Theatre:</span>
                            <p className="text-light">{info.cinema}</p>
                        </div>
                        <div className="flex w-full items-center gap-1">
                            <span className="" htmlFor="">Seats:</span>
                            <input value={info.seats.map(seat => seat.seatNumber+(seat.isVIP?"(VIP)":""))} className={`bg-transparent text-light`}  type="text" disabled placeholder="seats" />
                        </div>
                        <div className="flex w-full items-center gap-2">
                            <span className="" htmlFor="">Time:</span>
                            <motion.button whileHover={{ scale: .99 }} whileTap={{ scale: 0.9 }} className="bg-primary py-1 px-2  rounded-md">{info.date} -- {info.time}</motion.button>
                        </div>
                        <div className="flex w-full items-center gap-1 text-2xl">
                            <span className="" htmlFor="">Total:</span>
                            <p className="text-light">${info.total}</p>
                        </div>
                    </div>))}
            </div>
        </motion.div>
        <div className="flex flex-col text-sm basis-1/2 mb-8 gap-4 px-[.7rem]" action="">
        {/* <div className="flex flex-1 flex-col gap-1">
                <label className="text-light" htmlFor="">Email</label>
                <input value={currentUser && currentUser.email} className="   
                    p-2               
                    bg-gray-400 
                    bg-clip-padding 
                    backdrop-filter
                    text-light 
                    backdrop-blur-sm 
                    bg-opacity-10" type="text" placeholder="email" />
            </div> */}
            <div className="flex flex-col gap-1">
                <label className="text-light" htmlFor="">Phone</label>
                <input value={phone} onChange={(e) => {setPhone(e.target.value)}} className="   
                    p-2               
                    bg-gray-400 
                    bg-clip-padding 
                    backdrop-filter
                    text-light 
                    backdrop-blur-sm 
                    bg-opacity-10" type="number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="phone" />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-light" htmlFor="">FirstName</label>
                <input value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} className="   
                    p-2               
                    bg-gray-400 
                    bg-clip-padding 
                    backdrop-filter
                    text-light 
                    backdrop-blur-sm 
                    bg-opacity-10" type="text" placeholder="firstname" />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-light" htmlFor="">Lastname</label>
                <input value={lastName} onChange={(e)=>{setLastName(e.target.value)}} className="   
                    p-2               
                    bg-gray-400 
                    bg-clip-padding 
                    backdrop-filter
                    text-light 
                    backdrop-blur-sm 
                    bg-opacity-10" type="text" placeholder="lastname" />
            </div>
            {/* {bookingInfo.length > 0 && bookingInfo.map((info) => (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="text-light" htmlFor="">Seats</label>
                        <input value={info.seats.map(seat => seat.seatNumber+(seat.isVIP?"(VIP)":""))} className={`
                            p-2               
                            bg-gray-400 
                            bg-clip-padding 
                            backdrop-filter
                            text-light 
                            backdrop-blur-sm 
                            bg-opacity-10`}  type="text" disabled placeholder="seats" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="text-light" htmlFor="">Time</label>
                        <input value={info.time} className="   
                            p-2               
                            bg-gray-400 
                            bg-clip-padding 
                            backdrop-filter
                            text-light 
                            backdrop-blur-sm 
                            bg-opacity-10" type="text" disabled placeholder="Time" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="text-light" htmlFor="">Total</label>
                        <input value={`$${info.total}`} className="   
                            p-2               
                            bg-gray-400 
                            bg-clip-padding 
                            backdrop-filter
                            text-light 
                            backdrop-blur-sm 
                            bg-opacity-10" type="text" disabled placeholder="Total" />
                    </div>
                </div>
            ))} */}
            <motion.button whileHover={{ scale: .99 }} whileTap={{ scale: 0.9 }} onClick={(e)=>{e.preventDefault();confirmBooking()}} className="bg-primary py-2 rounded-md cursor-pointer z-50">Confirm Booking</motion.button>
        </div>
    </motion.section>
  )
}

export default BookingFormPage