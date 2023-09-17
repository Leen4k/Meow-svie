import React, { useContext, useEffect, useState } from 'react'
import {MdOutlineChair} from 'react-icons/md'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import {HiOutlineMail} from 'react-icons/hi'


const TheatreSeats = ({cinema,seats,time,setSeats,selectedSeats,setSelectedSeats,seatsPerRow,total,setTotal,createSeats,handleSeat,handleBooking,movie_id}) => {

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
    console.log(seats)

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
    ">
        <button onClick={()=>{createSeats()}} className="cursor-pointer text-white z-50">អេក្រង់ <span>{cinema}</span> ម៉ោង <span>{time}</span></button>
        <div className="m-auto h-[20px] w-[80%] rounded-t-[100000000%] rounded-b-[100%] bg-gradient-to-b from-[#B4D429] via-blue-400">
        </div>
        <div className={`grid grid-flow-row gap-y-2 place-items-center w-[55%] m-auto grid-cols-${parseInt(seatsPerRow)}`}>
            {seats?.length > 0 && seats.map((seat,index)=>(
                <div key={seat.seatNumber} data-tip={seat.user && seat.user +", "+ seat.booking_id} className={`tooltip flex flex-col items-center text-2xl cursor-pointer`}>
                    <p className={`text-sm ${!seat.isVIP?"":"animate-pulse"}`}>{seat.seatNumber}</p>
                    <MdOutlineChair onClick={()=>{handleSeat(seat,index)}} className={`${seatColor(seat)} tooltip disabled:text-red-500 disabled:cursor-not-allowed`} />
                </div>
            ))}
        </div>
        <div className="text-light flex flex-col gap-1 justify-center w-[80%] m-auto">
            <div className="flex items-center gap-1 overflow-x-scroll">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        Normal:<MdOutlineChair className="text-primary" />
                    </div>
                    <div className="flex items-center gap-1">
                        Reserved:<MdOutlineChair className="text-red-500" />
                    </div>
                    <div className="flex items-center gap-1">
                        VIP:<MdOutlineChair className="text-indigo-500" />
                    </div>
                </div>
                {selectedSeats?.length > 0 && selectedSeats.map((s,index)=>(
                    <div key={s.seatNumber}>
                        <p className="text-light">{s.seatNumber}</p>
                    </div>
                ))}
            </div>
            <p><span>Total Revenue:</span> ${total}</p>
        </div>
    </div>
  )
}

export default TheatreSeats