import React, { useContext, useEffect, useState } from 'react'
import {MdOutlineChair} from 'react-icons/md'
import {AiOutlineHeart, AiOutlineShoppingCart} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa'
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import { BiSolidHeart } from 'react-icons/bi'

const TheatreSeats = ({event_id,cinema,seats,time,setSeats,selectedSeats,setSelectedSeats,seatsPerRow,total,setTotal,createSeats,handleSeat,handleBooking,movie_id, user}) => {

    const seatColor = (seat) => {
        if(seat.isOccupied){
            return ("text-red-500");   
        }if(seat.isPending){
            return ('text-yellow-500 animate-pulse');
        }if(seat.isVIP){
            return ("text-indigo-500");
        }else{
            return ("text-primary")
        }
    }


  return (
    <div
        className="
                    flex 
                    flex-col
                    justify-center
                    bg-gray-400 
                    rounded-md 
                    bg-clip-padding 
                    backdrop-filter 
                    backdrop-blur-sm 
                    bg-opacity-10 
                    py-8
                    gap-8
                    mt-4
    ">
        <button className="cursor-pointer text-white z-50">អេក្រង់ <span>{cinema}</span> ម៉ោង <span>{time}</span></button>
        <div className="m-auto h-[20px] w-[80%] rounded-t-[100000000%] rounded-b-[100%] bg-gradient-to-b from-[#B4D429] via-blue-400">
        </div>
        <div className={`grid grid-cols-${seatsPerRow} gap-y-2 gap-x-0 place-items-center w-[55%] m-auto`}>
            {seats?.seats?.length > 0 && seats?.seats.map((seat,index)=>(
                <div key={seat.seatNumber} className={`flex flex-col items-center text-2xl cursor-pointer`}>
                    <p className={`text-sm ${!seat.isPending?"":"animate-pulse"}`}>{seat.seatNumber}</p>
                    <button disabled={seat.isOccupied} className="disabled:cursor-not-allowed disabled:text-red-500">
                    {seat.user && seat.user === user ? <BiSolidHeart className="animate-pulse" /> : <MdOutlineChair
                        disabled={seat.isOccupied}
                        onClick={()=>{handleSeat(seat,index)}}  
                        className=
                        {`${seatColor(seat)} disabled:text-red-500 disabled:cursor-not-allowed`} />}
                    </button>
                </div>
            ))}
        </div>
        <div className="text-light flex flex-col gap-1 justify-center w-[80%] m-auto">
            <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                        Normal:<MdOutlineChair className="text-primary" />
                    </div>
                    <div className="flex items-center gap-1">
                        Reserved:<MdOutlineChair className="text-red-500" />
                    </div>
                    <div className="flex items-center gap-1">
                        VIP:<MdOutlineChair className="text-indigo-500" />
                    </div>
                    <div className="flex items-center gap-1">
                        My bookings:<FaHeart className="text-red-500" />
                    </div>

                    
                </div>
            <div className="flex items-center gap-1">

                <AiOutlineShoppingCart className="text-primary" />:
                {selectedSeats?.length > 0 && selectedSeats.map((s,index)=>(
                    <div key={s.seatNumber}>
                        <p className="text-light">{s.seatNumber}</p>
                    </div>
                ))}
            </div>
            <p><span>Total:</span> ${total}</p>
        </div>

        {!movie_id && <button onClick={()=>{handleBooking(selectedSeats,total,event_id)}} className="bg-primary py-2 rounded-md w-[80%] m-auto block">Book Seats</button>}
    </div>
  )
}

export default TheatreSeats