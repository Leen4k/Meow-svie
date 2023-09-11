import { createContext, useEffect, useState } from "react";

export const BookingContext = createContext({});

const getLocalCinemaId = ()=>{
    let listId = localStorage.getItem('cinema');
    if(listId){
      return JSON.parse(localStorage.getItem("cinema"));
    }else{
      return "";
    }
  }


const BookingProvider = ({children}) => {

    const [bookingInfo, setBookingInfo] = useState([]);
    const [seatInfo, setSeatInfo] = useState([]);
    const [isSucceeded, setIsSucceeded] = useState(false);
    const [seatIsEmpty, setSeatIsEmpty] = useState(false);
    const [cinemaId, setCinemaId] = useState(getLocalCinemaId);
    const [movieTitle, setMovieTitle] = useState("");
    const [movieImg, setMovieImg] = useState("");
    const [movieOverview, setMovieOverview] = useState("");
    const [isUpdated, setIsUpdated] = useState(false);
    const [booking_id, setBooking_id] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        localStorage.setItem('cinema', JSON.stringify(cinemaId));
      }, [cinemaId]);

    useEffect(()=>{
        console.log(bookingInfo);
    },[])

    return <BookingContext.Provider value={{bookingInfo, setBookingInfo, seatInfo, setSeatInfo, isSucceeded, setIsSucceeded,cinemaId, setCinemaId, seatIsEmpty, setSeatIsEmpty, movieTitle, setMovieTitle, movieImg, setMovieImg, movieOverview, setMovieOverview ,isUpdated, setIsUpdated, booking_id, setBooking_id, selectedSeats, setSelectedSeats, error, setError}}>{children}</BookingContext.Provider>
}

export default BookingProvider;