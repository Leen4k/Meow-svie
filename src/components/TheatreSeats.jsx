import React, { useEffect, useState } from 'react'
import {MdOutlineChair} from 'react-icons/md'
import {AiOutlineShoppingCart} from 'react-icons/ai'

const TheatreSeats = () => {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [book, setBook] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        const total = selectedSeats.reduce((accumulator, currentSeat) => {
            return accumulator + currentSeat.price;
          }, 0);
        setTotal(total);
    },[selectedSeats])

    const createSeats = () => {
        // Create an array to hold the seat objects
        const seatArray = [];

        // Loop through rows from A to D
        for (let row = 'A'; row <= 'D'; row = String.fromCharCode(row.charCodeAt(0) + 1)) {
            // Loop through seat numbers within each row
            for (let seatNumber = 1; seatNumber <= 10; seatNumber++) {
                // Create a seat object
                const seat = {
                    row: row,
                    seatNumber: row+seatNumber,
                    isPending: false,
                    isOccupied: false,
                    screen:"3D",
                    price:5
                };
                
                // Push the seat object to the seatArray
                seatArray.push(seat);
            }
        }

        // Print the seatArray to see the result
        setSeats(seatArray);
        // console.log(seats)

        // console.log(seatArray);
    }

    const handleSeat = (seat,index) => {

        if(seat.isPending){
            const setToFalse = seat.isPending=false;
            let pendingSeats = [...seats];
            setSeats(pendingSeats);
            let filter = seats.filter(seat => seat.isPending === true);
            let todo = [...filter]
            setSelectedSeats(todo);
        }else{
            const setToTrue = seat.isPending=true;
            let pendingSeats = [...seats];
            setSeats(pendingSeats);
            let filter = seats.filter(seat => seat.isPending === true);
            let todo = [...filter]
            setSelectedSeats(todo);
        }

    }



    const handleBooking = (seat,index) => {
        
    }

    useEffect(()=>{
        return createSeats();
    },[])


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
        <button onClick={()=>{createSeats()}} className="cursor-pointer text-white z-50">អេក្រង់ <span>Meow's Hall</span></button>
        <div className="m-auto h-[20px] w-[80%] rounded-t-[100000000%] rounded-b-[100%] bg-gradient-to-b from-[#B4D429] via-blue-400">
        </div>
        <div className="grid grid-cols-10 gap-y-2 gap-x-0 place-items-center w-[55%] m-auto">
            {seats.length > 0 && seats.map((seat,index)=>(
                <div key={seat.seatNumber} className={`flex flex-col items-center text-2xl cursor-pointer`}>
                    <p className={`text-sm ${!seat.isPending?"":"animate-pulse"}`}>{seat.seatNumber}</p>
                    <MdOutlineChair onClick={()=>{handleSeat(seat,index)}} className={seat.isPending?"text-yellow-400 transition-all animate-bounce":"text-primary transition-all"} />
                </div>
            ))}
        </div>
        <div className="text-light flex flex-col gap-1 justify-center w-[80%] m-auto">
            <div className="flex items-center gap-1">
                <AiOutlineShoppingCart className="text-primary" />:
                {selectedSeats.length > 0 && selectedSeats.map((s,index)=>(
                    <div key={s.seatNumber}>
                        <p  className="text-light">{s.seatNumber}</p>
                    </div>
                ))}
            </div>
            <p><span>Total:</span> ${total}</p>
        </div>

        <button className="bg-primary py-2 rounded-md w-[80%] m-auto">Book Seats</button>
    </div>
  )
}

export default TheatreSeats