import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Link, NavLink } from 'react-router-dom';
import TheatreSeats from './TheatreSeatsAdmin';
import { motion } from "framer-motion"
import { MovieContext } from '../../contexts/MovieContext';
import axios from 'axios'
import { AuthContext } from '../../contexts/AuthContext';
import { BiAddToQueue } from 'react-icons/bi';
import {RxCross1, RxCross2} from "react-icons/rx"
import { BookingContext } from '../../contexts/BookingContext';
import { AiOutlinePlus } from 'react-icons/ai';
import Loading from '../../components/Loading';


const AdminDetails = () => {

    const {id,event_id} = useParams();
    const {currentUser} = useContext(AuthContext);
    const [dates, setDates] = useState();
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [book, setBook] = useState([]);
    const [total, setTotal] = useState(0);
    const {movies,setMovies,loading,setLoading} = useContext(MovieContext);
    // console.log(movies)
    const [cinemaInfo, setCinemaInfo] = useState([]);
    const {cinemaId} = useContext(BookingContext)

    const [title, setTitle] = useState("");
    const [movieImg, setMovieImg] = useState("");
    const [time, setTime] = useState("");
    const [startingRow, setStartingRow] = useState("A");
    const [endingRow, setEndingRow] = useState("D");
    const [seatsPerRow, setSeatsPerRow] = useState(10);
    const [modal, setModal] = useState(false);


    const [seatsArray, setSeatsArray] = useState([]);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [data, setData] = useState([]);
    console.log(params)
    const [toggleShowTime, setToggleShowTime] = useState(true);




    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            await axios.get("/event").then(({data})=>{
                setEvents(data);
            })
            await axios.get(`/cinema/${cinemaId}`).then(({data})=>{
                // console.log(data.seats)
                setSeatsPerRow(Number(data.seatsPerRow));
                setEndingRow(data.endingRow);
                setStartingRow(data.startingRow);
                setSeats(data.seats)
                setLoading(false);
            })
        }
        fetchData();
    },[])    

    useEffect(()=>{
        setTime("");
        setTitle("");
        setMovieImg("");
        setTotal(0);
        axios.get(`/cinema/${cinemaId}`).then(({data})=>{
            // console.log(data.seats)
            setSeatsPerRow(Number(data.seatsPerRow));
            setEndingRow(data.endingRow);
            setStartingRow(data.startingRow);
            setSeats(data.seats)
        })
    },[params.day])

    const calculateRevenue = (seatsInfo) => {
        let totalOccupiedSeatPrice = 0;

        // Loop through the array of seats
        for (const seat of seatsInfo) {
            if (seat.isOccupied === true) {
                totalOccupiedSeatPrice += seat.price;
            }
        }

        setTotal(totalOccupiedSeatPrice);
    }
 

    const handleSeat = (seat,index) => {
        alert(seat.isOccupied)
    }



    useEffect(()=>{

        function getShortDate(date) {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return days[date.getDay()] + ' ' + date.getDate();
            // return days[date.getDay()] + ' ' + (date.getMonth() + 1) + '-' + date.getDate();
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

    const filterEvents = events.filter((event)=>{
        return event.date === params.day && params.id.toLowerCase().includes(event.cinema.toLowerCase());
    })

    // Use reduce to group movies by their title
    const groupedMovies = filterEvents.reduce((result, item) => {
    // Check if a movie with the same title already exists in the result array
    const existingMovie = result.find((movie) => movie.movie_id === item.movie_id);
  
    if (existingMovie) {
      // If it exists, add the showTime to the existing movie
      existingMovie.showTimes.push(item.showTime);
      existingMovie.event_ids.push(item.event_id);
      existingMovie.seatsArray.push(item.seats);
    } else {
      // If it doesn't exist, create a new movie object
      result.push({
        ...item,
        event_ids: [item.event_id],
        movie_title: item.movie_title,
        showTimes: [item.showTime],
        seatsArray: [item.seats]
      });
    }
  
    return result;
  }, []);

  console.log(groupedMovies);
      
     
    if(!filterEvents.length){
        <section className="col-span-10 grid z-50 grid-cols-10 min-h-screen">
        <div className="col-span-6">
            <p className="px-[.7rem]">Manage CinemaDetail <span className="uppercase">{params.id}</span> <span>{params.day}</span></p>
            <div className="flex gap-2 px-[.7rem] py-4 z-50 w-[130%] overflow-scroll text-center">
                {dates?.length > 0 && dates.map((date)=>(
                    <NavLink to={`/admin/${params.id}/${date.date}`} className="text-light px-4 rounded-sm bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">{date.day}</NavLink>
                ))}
            </div>
            <div className="px-[.7rem]"><span className="text-center">There is no event yet!</span></div>
        </div>
    </section>
    }

    const filter = movies.filter((movie)=>{
        return movie;
    })

    // if (!filter.length){
    //     return (
    //         <section className="col-span-10 grid z-50 grid-cols-10 min-h-screen">
    //         <div className="col-span-6">
    //             <p className="px-[.7rem]">Manage CinemaDetail <span className="uppercase">{params.id}</span> <span>{params.day}</span></p>
    //             <div className="flex gap-2 px-[.7rem] py-4 z-50 w-[130%] overflow-scroll text-center">
    //                 {dates?.length > 0 && dates.map((date)=>(
    //                     <NavLink to={`/admin/${params.id}/${date.date}`} className="text-light px-4 rounded-sm bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">{date.day}</NavLink>
    //                 ))}
    //             </div>
    //             <div className="px-[.7rem]"><span className="text-center">Coming soon!</span></div>
    //         </div>
    //     </section>
    //     )
    // }


    const addMoviesToShowTime = (id,title,img,lang,cinema) => {
        console.log(id,title,img,lang,cinema)
        setTitle(title);
        setMovieImg(img);
        setTime([...time]);
        setTotal(0);
        // setSeats(seats);
        axios.get(`/cinema/${cinemaId}`).then(({data})=>{
            // console.log(data.seats)
            setSeatsPerRow(Number(data.seatsPerRow));
            setEndingRow(data.endingRow);
            setStartingRow(data.startingRow);
            setSeats(data.seats)
        })
        setToggleShowTime(true);
        navigate(`/admin/${params.id}/${params.day}/${id}`)
    }

    const handleCreateEvent = () => {
        console.log(seats)
        if(params.event_id){
            setLoading(true);
            axios.put(`/event_time/${event_id}`,{showTime:time}).then(res=>{
                axios.get("/event").then(({data})=>{
                    setEvents(data);
                    setLoading(false);
                })  
            }).catch(err=>console.log(err));       
        }else{
            try{
                setLoading(true);
                axios.post("/event",{cinema:params.id, date:params.day, movie_title:title, time, movie_id:params.movie_id, movieImg, seats:seats, startingRow, endingRow, seatsPerRow}).then(()=>(
                    axios.get("/event").then(({data})=>{
                        setEvents(data);
                        setLoading(false);
                    })
                ))
            }catch(err){
                console.log(err)
            }
        }
    }

    const handleModal = () => {
        if(!modal){
            setModal(true)
        }else{
            setModal(false);
        }
    }

    const handleUpdate = (id,day,movie_id,show_time,event_id,seatsArray) => {
        try{
            setLoading(true);
            axios.get(`/event/${event_id}`).then(({data})=>{
                setTime(data.showTime);
                setTitle(data.movie_title);
                setMovieImg(data.movieImg);
                setSeats(data.seats);
                calculateRevenue(data.seats);  
                setSeatsPerRow(data.seatsPerRow);
                setStartingRow(data.startingRow);
                setEndingRow(data.endingRow);
                setLoading(false);
            })
        }catch(err){
            console.log(err)
        }
    }


    const deleteEvent = () => {
        axios.delete(`/event/${event_id}`).then((res)=>{
            console.log(res)
            const filterDeleted = events.filter(event => event.event_id !== event_id);
            setEvents(filterDeleted);
            navigate(``)
        }).catch(err => console.log(err));
    }


    const handleToggle = () => {
        if(!toggleShowTime){
            setToggleShowTime(true);
        }else{
            setToggleShowTime(false);
        }
    }

    if (loading) return <Loading />

  return (
    <section className="col-span-10 grid z-50 grid-cols-10 min-h-screen">
        <div className="col-span-5 overflow-y-scroll overflow-x-hidden">
            <p className="px-[.7rem]">Manage CinemaDetail <span className="uppercase">{params.id}</span> <span>{params.day}</span></p>
            <div className="flex gap-2 px-[.7rem] py-4 z-50 w-[130%] overflow-scroll text-center">
                {dates?.length > 0 && dates.map((date)=>(
                    <NavLink to={`/admin/${params.id}/${date.date}`} className="text-light px-4 rounded-sm bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">{date.day}</NavLink>
                ))}
            </div>
            {toggleShowTime && <motion.div layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-[.7rem] mt-8">
                    <p>Showtime</p>
                </div>
                {!filterEvents.length?<span className="px-[.7rem]">There's no showtime available right now!</span> : filterEvents.length > 0 && groupedMovies.map((event)=>(
                <div key={event.id}  className="flex mx-[.7rem] gap-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
                    <div>
                        <div className="flex">
                            <img className="w-36 aspect-square object-cover" src={`https://image.tmdb.org/t/p/w500${event.movieImg}`} alt={event.movie_title+"IMG"} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-1 p-4">
                        <span>{event.movie_title}</span>
                        <div className="flex flex-col gap-1">
                        <p>{event.date}</p>
                        <div className="flex gap-2">
                            {event.showTimes.map((showtime,index)=>(
                                <Link key={index} to={`/admin/${params.id}/${params.day}/${event.movie_id}/${showtime}/${event.event_ids[index]}`} onClick={()=>{handleUpdate(params.id,params.day,event.movie_id,event.showTime,event.event_ids[index],event.seatsArray)}} className="py-2 px-4 text-center text-dark bg-primary rounded-md w-20">{showtime}</Link>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
                ))}
            </motion.div>}
            {!toggleShowTime && <motion.div layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="flex flex-col gap-4 z-[1000] mb-8">
                <p className="px-[.7rem] mt-8">Movies</p>
                {filter.map((movie)=>(
                <Link className="flex mx-[.7rem] gap-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
                    <div>
                        <img className="w-36 h-full object-cover" src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path}  alt="" />
                    </div>
                    <div className="flex flex-col justify-center gap-1 p-4">
                        <span>{movie.title}</span>
                        <p>{movie.overview.slice(0,80)}...</p>
                        <button onClick={(e)=>{e.preventDefault();addMoviesToShowTime(movie.id,movie.title,movie.backdrop_path,movie.original_language,params.id)}} className="bg-primary hover:bg-primary py-1 mt-2 rounded-md">Add</button>
                    </div>
                </Link>
                ))}
            </motion.div>}
        </div>
        
            <motion.div layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className={`col-span-5 z-1000 px-4 overflow-y-scroll`}>
                <h2 className="text-primary">{params.event_id?"Update Showtime "+params.showtime:"Create Showtime"}</h2>
                <form className="flex flex-col gap-4 text-sm mt-4 mb-8" action="">
                <div className="flex flex-1 flex-col gap-1">

                <label className="text-light" htmlFor="">Movie Title</label>
                <div className="flex w-full rounded-md overflow-hidden">
                    <input value={title} className="  
                    basis-1/2
                    p-2               
                    bg-gray-400 
                    bg-clip-padding 
                    backdrop-filter
                    text-light 
                    backdrop-blur-sm 
                    bg-opacity-10" type="text" placeholder="movie title" />
                    <button onClick={(e)=>{e.preventDefault(); handleToggle()}} className="flex items-center bg-primary p-2">
                        {toggleShowTime?<AiOutlinePlus className="" />: <RxCross1 />}
                    </button>
                </div>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                <label className="text-light" htmlFor="">Movie Image</label>
                <img src={'https://image.tmdb.org/t/p/w500' + movieImg}  alt="" />
                </div>
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="text-light" htmlFor="">Cinema</label>
                        <input value={params.id} className="   
                            p-2               
                            bg-gray-400 
                            bg-clip-padding 
                            backdrop-filter
                            text-light 
                            backdrop-blur-sm 
                            bg-opacity-10" type="text" placeholder="cinema" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="text-light" htmlFor="">Date</label>
                        <input value={params.day} className="   
                            p-2               
                            bg-gray-400 
                            bg-clip-padding 
                            backdrop-filter
                            text-light 
                            backdrop-blur-sm 
                            bg-opacity-10" type="text" placeholder="date" />
                    </div>
                    <div className={`${params.event_id && "animate-pulse"} flex flex-1 flex-col gap-1`}>
                        <label className="text-light" htmlFor="">Time</label>
                        <div className="flex items-center gap-2">
                            <input value={time} onChange={(e)=>{setTime(e.target.value); !params.event_id && navigate(`/admin/${params.id}/${params.day}/${params.movie_id}/${time}}`)}} className="   
                                text-primary
                                p-2               
                                bg-gray-400 
                                bg-clip-padding 
                                backdrop-filter
                                backdrop-blur-sm 
                                placeholder:text-primary
                                bg-opacity-10" type="time" placeholder="time" />
                            <button onClick={(e)=>{e.preventDefault()}} className="text-primary"><BiAddToQueue className="text-2xl rounded-md" /></button>
                        </div>
                    </div>
                    <p>Theatre Details សម្រាប់ថ្ងៃ <span>{params.day}</span> ម៉ោង <span>{time}</span></p>
                    <TheatreSeats cinema={params.id} time={time} movie_id={params.movie_id} seats={seats} setSeats={setSeats} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} seatsPerRow={seatsPerRow} total={total} setTotal={setTotal} handleSeat={handleSeat} />
                    {params.event_id ? 
                    <div className="flex gap-2">
                        <motion.button whileHover={{ scale: .99 }} whileTap={{ scale: 0.9 }} onClick={(e)=>{e.preventDefault();handleCreateEvent();}} className="bg-primary py-2 rounded-md cursor-pointer z-50 flex-1">Update</motion.button> 
                        <motion.button whileHover={{ scale: .99 }} whileTap={{ scale: 0.9 }} onClick={(e)=>{e.preventDefault();deleteEvent();}} className="bg-red-500 py-2 rounded-md cursor-pointer z-50 flex-1">delete</motion.button> 
                    </div>
                    :<motion.button whileHover={{ scale: .99 }} whileTap={{ scale: 0.9 }} onClick={(e)=>{e.preventDefault();handleCreateEvent();}} className="bg-primary py-2 rounded-md cursor-pointer z-50">Create Place Event</motion.button>}
                </form>
            </motion.div>
        
    </section>
  )
}

export default AdminDetails