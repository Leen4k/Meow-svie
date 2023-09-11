import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Link, NavLink } from 'react-router-dom';
import TheatreSeats from '../components/TheatreSeats';
import { motion } from "framer-motion"
import { MovieContext } from '../contexts/MovieContext';
import axios from 'axios'
import { BookingContext } from '../contexts/BookingContext';
import { AuthContext } from '../contexts/AuthContext';


const CinemaDetails = () => {

    const {id} = useParams();
    const {currentUser} = useContext(AuthContext);
    const [dates, setDates] = useState();
    const [seats, setSeats] = useState([]);
    // const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatsArray, setSeatsArray] = useState([]);
    const [book, setBook] = useState([]);
    const [total, setTotal] = useState(0);
    const [movies, setMovies] = useState([]);
    const {bookingInfo, setBookingInfo} = useContext(BookingContext);
    const {seatInfo, setSeatInfo, setSeatIsEmpty, movieOverview, setMovieOverview, movieTitle, setMovieTitle, movieImg, setMovieImg, booking_id, setBooking_id, selectedSeats, setSelectedSeats} = useContext(BookingContext);
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const [startingRow, setStartingRow] = useState("A");
    const [endingRow, setEndingRow] = useState("D");
    const [seatsPerRow, setSeatsPerRow] = useState(10);
    const [expired, setExpired] = useState(false);




    useEffect(()=>{
        const fetchData = async () => {
            await axios.get("/event").then(({data})=>{
                setMovies(data);
            })
        }
        fetchData();
    },[])

    useEffect(()=>{
        setTotal(0);
        setSelectedSeats([])
    },[seats])

    useEffect(()=>{
        filteringSeats(); 
    },[params.event_id])

    const filteringSeats = () => {
            const filterData = movies.find(({event_id}) => event_id === params.event_id);
            if (filterData) {
                // Set the filtered seats data
                setSeats(filterData);
                // Extract the seats array from the filtered data
                const seatsArray = filterData.seats || [];
        
                // Update the state with the extracted seats array
                setSeatsArray(seatsArray);
                setSeatsPerRow(filterData.seatsPerRow);
                setStartingRow(filterData.startingRow);
                setEndingRow(filterData.endingRow);
            } else {
                console.log("Event not found or no seats data available for the event.");
            }
    }
    console.log(seats)


    


    useEffect(()=>{
        const totalPrice = selectedSeats?.reduce((accumulator, currentSeat) => {
            return accumulator + currentSeat.price;
          }, 0);
        setTotal(totalPrice);
    },[selectedSeats])


    const handleSeat = (seat,index) => {
        console.log(seat)
        // setSeatsArray([...seats.seats])
        if(seat.isPending){
            const setToFalse = seat.isPending=false;
            let pendingSeats = [...seatsArray];
            // setSeats(pendingSeats);
            let filter = seatsArray.filter(seat => seat.isPending === true);
            let todo = [...filter]
            setSelectedSeats(todo);
        }else{
            // setSeatsArray([...seats.seats])
            const setToTrue = seat.isPending=true;       
            let pendingSeats = [...seatsArray];
            let filter = seatsArray.filter(seat => seat.isPending === true);
            let todo = [...filter]
            setSelectedSeats(todo);
        }

    }



    const handleBooking = (seat,total) => {
        if(!currentUser){
            navigate("/login");
        }else if(selectedSeats.length === 0){
            setSeatIsEmpty(true)
            const timeout = setTimeout(() => {
                setSeatIsEmpty(false); 
            }, 5000);
            return () => clearTimeout(timeout);     
        }else{

            for (let seat of seatsArray) {
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
            //pass to filtered pending seatsArray to the context to make use in the other page
            setSeatInfo(seatsArray);
            console.log(seatsArray)
            console.log(selectedSeats)
            setBookingInfo([{user:currentUser.email, event_id:seats.event_id, movie_title:seats.movie_title, movieImg:seats.movieImg, seats:seat, total:total, cinema:params.id, date:params.day, time:params.time}]);
            console.log(bookingInfo)
            navigate("/BookingFormPage/"+params.event_id)  
        }
    }


    useEffect(()=>{

        function getShortDate(date) {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return days[date.getDay()] + ' ' + date.getDate();
          }
          
          
        function getNext7Days() {
            const today = new Date();
            const next7Days = [];
          
            for (let i = 0; i < 7; i++) {
              const currentDate = new Date(today);
              currentDate.setDate(today.getDate() + i);
              
              const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero
              const month = String(currentDate.getMonth() + 1).padStart(2, '0');
              const year = currentDate.getFullYear();
              
              next7Days.push({
                day: getShortDate(currentDate),
                date: `${day}-${month}-${year}`,
              });
            }
          
            return next7Days;
          }
          
          const next7DaysArray = getNext7Days();
          setDates(next7DaysArray);
    },[])
    

    let filter = movies.filter((movie)=>{
        return params.day === movie.date && params.id.toLowerCase().includes(movie.cinema.toLowerCase())
    })
    console.log(filter)

    if (!filter.length){
        return (
            <section className="col-span-10 grid z-50 grid-cols-10 min-h-screen">
            <div className="col-span-6">
                <p className="px-[.7rem]">CinemaDetail of <span className="uppercase">{params.id}</span> <span>{params.day}</span></p>
                <div className="flex gap-2 px-[.7rem] py-4 z-50 w-[130%] overflow-scroll text-center">
                    {dates?.length > 0 && dates.map((date)=>(
                        <NavLink to={`/cinema/${params.id}/${date.date}`} className="text-light px-4 rounded-sm bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">{date.day}</NavLink>
                    ))}
                </div>
                <div className="px-[.7rem]"><span className="text-center">Coming soon!</span></div>
            </div>
        </section>
        )
    }


    function isCurrentTimeAfter(targetTime) {
        // Parse the target time string into hours and minutes
        const [targetHours, targetMinutes] = targetTime.split(':').map(Number);
      
        // Get the current time
        const currentTime = new Date();
      
        // Extract hours and minutes from the current time
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
      
        // Compare the current time with the target time
        if (currentHours > targetHours || (currentHours === targetHours && currentMinutes >= targetMinutes)) {
            console.log("time is false")
            return false; // Current time is after the target time
          
        } else {
            console.log("time is true")
            return true; // Current time is before the target time
        }
      }
      
    

  return (
    <section className="col-span-10 grid z-50 grid-cols-10 min-h-screen">
        <div className="col-span-6 overflow-y-scroll overflow-x-hidden">
            <p className="px-[.7rem]">CinemaDetail of <span className="uppercase">{params.id}</span> <span>{params.day}</span></p>
            <div className="flex gap-2 px-[.7rem] py-4 z-50 w-[130%] overflow-scroll text-center">
                {dates?.length > 0 && dates.map((date)=>(
                    <NavLink to={`/cinema/${params.id}/${date.date}`} className="text-light px-4 rounded-sm bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">{date.day}</NavLink>
                ))}
            </div>
            <motion.div layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="flex flex-col gap-4">
                <p className="px-[.7rem] mt-8">Showtime</p>
                {filter.length > 0 && filter.map((movie)=>(
                <div key={movie.id} onClick={()=>{filteringSeats()}}  className="flex mx-[.7rem] gap-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
                    <div>
                        <div className="flex">
                            <img className="w-36 aspect-square object-cover" src={`https://image.tmdb.org/t/p/w500${movie.movieImg}`} alt={"asd"} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-1 p-4">
                        <span>{movie.movie_title}</span>
                        <div className="flex flex-col gap-1">
                        <p>{movie.date}</p>
                        {/* <button disabled><Link to={`/cinema/${params.id}/${movie.date}/${movie.showTime}/${movie.event_id}`} onClick={()=>{setMovieTitle(movie.movie_title);setMovieImg(movie.movieImg);setMovieOverview(movie.date);}} className={`${isCurrentTimeAfter(movie.showTime)?"":"opacity-20"} disabled:hidden py-2 px-4 text-center text-dark bg-primary rounded-md w-24`}>{movie.showTime}</Link></button> */}
                        <button disabled={!isCurrentTimeAfter(movie.showTime)} onClick={()=>{
                            setMovieTitle(movie.movie_title);
                            setMovieImg(movie.movieImg);
                            setMovieOverview(movie.date);
                            navigate(`/cinema/${params.id}/${movie.date}/${movie.showTime}/${movie.event_id}`)
                            }}
                            className={`${isCurrentTimeAfter(movie.showTime)?"":"opacity-20"} disabled:cursor-not-allowed py-2 px-4 text-center text-dark bg-primary rounded-md w-24 font-normal`}
                            >        
                                  
                            {movie.showTime}
                            </button>
                        </div>
                    </div>
                </div>
                ))}
            </motion.div>
        </div>
        {params.time &&
                <motion.div key={seats?.event_id} layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className={`col-span-4 px-4 overflow-y-scroll`}>
                    <p>Theatre Seats សម្រាប់ថ្ងៃ <span>{params.day}</span> ម៉ោង <span>{params.time}</span></p>
                    <TheatreSeats cinema={params.id} time={params.time} event_id={params.event_id} seats={seats} setSeats={setSeats} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} total={total} setTotal={setTotal} handleSeat={handleSeat} handleBooking={handleBooking} seatsPerRow={seatsPerRow} user={currentUser && currentUser?.email} />
                </motion.div>
        }
    </section>
  )
}

export default CinemaDetails