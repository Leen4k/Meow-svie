import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Link, NavLink } from 'react-router-dom';
import TheatreSeats from './TheatreSeatsAdmin';
import { motion } from "framer-motion"
import { MovieContext } from '../../contexts/MovieContext';
import axios from 'axios'
import { AuthContext } from '../../contexts/AuthContext';
import { BiAddToQueue, BiSolidChevronDown, BiTrashAlt } from 'react-icons/bi';
import {FaLocationDot} from "react-icons/fa6"
import {PiNotePencilDuotone} from "react-icons/pi"
import {IoCloseCircleSharp} from "react-icons/io5"


//firebase
import { db, storage } from '../../firebase';
import { uploadBytesResumable,uploadBytes,ref, getDownloadURL } from 'firebase/storage';
import { BookingContext } from '../../contexts/BookingContext';
import { FaStar } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import Loading from '../../components/Loading';



const ManageCinema = () => {

    const {id} = useParams();
    const {currentUser} = useContext(AuthContext);
    const [dates, setDates] = useState();
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [book, setBook] = useState([]);
    const [total, setTotal] = useState(0);
    const {movies,setMovies,loading,setLoading} = useContext(MovieContext);
    // console.log(movies)
    const [cinemaInfo, setCinemaInfo] = useState([]);
    const {isUpdated, setIsUpdated} = useContext(BookingContext);

    const [title, setTitle] = useState("");
    const [movieImg, setMovieImg] = useState("");
    const [time, setTime] = useState("");
    const [startingRow, setStartingRow] = useState("A");
    const [endingRow, setEndingRow] = useState("D");
    const [seatsPerRow, setSeatsPerRow] = useState(10);
    const [modal, setModal] = useState(false);

    const [cinema, setCinema] = useState("");
    const [screen, setScreen] = useState("");
    const [location, setLocation] = useState("");

    const [images, setImages] = useState([]);
    const [downloadUrls, setDownloadUrls] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(null); 



    useEffect(()=>{
        setLoading(true);
        axios.get("/cinema").then(({data})=>{
            setCinemaInfo(data);
            setLoading(false);
        }).catch(err => console.log(err)); 
    },[])

    useEffect(()=>{
        params.cinema_id && getSingleCinema(params.cinema_id);
    },[])

    const navigate = useNavigate();
    const params = useParams();
    const {day} = useParams();


    useEffect(()=>{
        // const totalPrice = selectedSeats?.reduce((accumulator, currentSeat) => {
        //     return accumulator + currentSeat.price;
        //   }, 0);
        const totalPrice = seats.reduce((total, seat) => total + seat.price, 0);
        setTotal(totalPrice);
    },[selectedSeats])
    console.log(seats)

    const createSeats = () => {
        // Create an array to hold the seat objects
        const seatArray = [];

        // Loop through rows from A to D
        for (let row = startingRow; row <= endingRow; row = String.fromCharCode(row.charCodeAt(0) + 1)) {
            // Loop through seat numbers within each row
            for (let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
                // Create a seat object
                const seat = {
                    row: row,
                    seatNumber: row+seatNumber,
                    isVIP: false,
                    isPending: false,
                    isOccupied: false,
                    // screen:"3D",
                    price: 5,
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

        if(seat.isVIP){
            const setToFalse = seat.isVIP=false;
            seat.isVIP ? seat.price = 10: seat.price = 5
            let VIPSeats = [...seats];
            setSeats(VIPSeats);
            let filter = seats.filter(seat => seat.isVIP === true);
            let VIP = [...filter]
            setSelectedSeats(VIP);
        }else{
            const setToTrue = seat.isVIP=true;
            seat.isVIP ? seat.price = 10: seat.price = 5
            let VIPSeats = [...seats];
            setSeats(VIPSeats);
            let filter = seats.filter(seat => seat.isVIP === true);
            let VIP = [...filter]
            setSelectedSeats(VIP);
        }

    }


    useEffect(()=>{
        return createSeats();
    },[endingRow,startingRow,seatsPerRow])



    // const handleCinema = () => {
    //     try{
    //         axios.post("/cinema",{cinema, screen, location, seats, downloadUrls})
    //         alert("Sucessfully created cinema");
    //         window.location.reload();
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
    const handleCinema = () => {
        if(params.cinema_id){
            try{
                axios.put(`/cinema/${params.cinema_id}`,{cinema,location,screen,downloadUrls,seats, startingRow, endingRow, seatsPerRow}).then(()=>{
                    axios.get("/cinema").then(({data})=>{
                        setCinemaInfo(data);
                    }).catch(err => console.log(err));
                    setIsUpdated(true); 
                    const timeout = setTimeout(() => {
                        setIsUpdated(false); 
                    }, 5000);
                    return () => clearTimeout(timeout);     
                })
            }catch(err){
                console.log(err)
            }
        }else{
            try{
                axios.post("/cinema",{cinema, screen, location, seats, startingRow, endingRow, seatsPerRow, downloadUrls})
                alert("Sucessfully created cinema");
                window.location.reload();
            }catch(err){
                console.log(err)
            }
        }
    }


  
    const handleImageChange = (e) => {
        const selectedFiles = e.target.files;
        setImages([...selectedFiles]);
    };


    useEffect(() => {
        const uploadFile = async () => {
          const downloadURLs = [...downloadUrls];
    
          for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const storageRef = ref(storage, `/imgFiles/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
    
            uploadTask.on("state_changed", (snapshot) => {
              const newProgress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setProgress(newProgress);
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  break;
              }
            }, (error) => {
              console.log(error);
            }, async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                downloadURLs.push(downloadURL);
                setDownloadUrls(downloadURLs);           
              } catch (error) {
                console.log(error);
              } finally {
                setImages([]);
              }
            });
          }
        };
    
        if (images.length > 0) {
          uploadFile();
        }

      }, [images]);

    // const uploadFile = async () => {
    //     const downloadURLs = [];
  
    //     for (let i = 0; i < images.length; i++) {
    //       const image = images[i];
    //       const storageRef = ref(storage, `/imgFiles/${image.name}`);
    //       const uploadTask = uploadBytesResumable(storageRef, image);
  
    //       uploadTask.on("state_changed", (snapshot) => {
    //         const newProgress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //         setProgress(newProgress);
    //         switch (snapshot.state) {
    //           case "paused":
    //             console.log("Upload is paused");
    //             break;
    //           case "running":
    //             console.log("Upload is running");
    //             break;
    //           default:
    //             break;
    //         }
    //       }, (error) => {
    //         console.log(error);
    //       }, async () => {
    //         try {
    //           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    //           downloadURLs.push(downloadURL);
    //           setDownloadUrls(downloadURLs);           
    //         } catch (error) {
    //           console.log(error);
    //         } finally {
    //           setImages([]);
    //         }
    //       });
    //     }
    //   };
  
    //   if (images.length > 0) {
    //     uploadFile();
    //   }


 
    //   useEffect(()=>{
    //     if(progress == 100){
    //         console.log("yayyy")
    //       }
    //       setImages([]);
    //   },[progress])

    // const uploadFile = () => {
    //     let array = [];
    //     for (let i = 0; i < images.length; i++) {
    //         const storageRef = ref(storage, `/imgFiles/${images[i].name}`);
    //         const uploadTask = uploadBytesResumable(storageRef, images[i])
    //         uploadTask.on("state_changed", (snapshot) => {
    //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             setProgress(progress);
    //             switch (snapshot.state) {
    //               case "paused":
    //                 console.log("upload is paused");
    //               case 'running':
    //                console.log("Upload is running");
    //               default:
    //                 break;
    //             }
    //           },(error)=>{
    //             console.log(error)
    //           },() => {
    //             getDownloadURL(uploadTask.snapshot.ref)
    //             .then((downloadURL)=>{
    //                 array.push({downloadURL});
    //                 console.log(downloadURL)
    //             })
    //             setDownloadUrls(array); 
    //           }
    //           );
    //     };
    // };

      
    const getSingleCinema = (cinema_id) =>{
        navigate(`/admin/manageCinemaDetails/${cinema_id}`)
        setLoading(true);
        axios.get(`/cinema/${cinema_id}`).then(({data})=>{
            setCinema(data.cinema)
            setLocation(data.location)
            setScreen(data.screen)
            setDownloadUrls(data.imageUrls)
            setSeats(data.seats);
            setStartingRow(data.startingRow)
            setEndingRow(data.endingRow)
            setSeatsPerRow(data.seatsPerRow)      
            setLoading(false); 
        })     
    }

    const handleDelete = (cinema_id) => {
        axios.delete(`cinema/${cinema_id}`)
        const filterDeleted = cinemaInfo.filter((cinema)=>( cinema.cinema_id !== cinema_id));
        setCinemaInfo(filterDeleted);
        // navigate(`/admin/manage-cinema`)
    }
  

    
    const cssGrid = (index) => {
      if (index === 0){
        return "row-span-6 col-span-6"
      }if(index >= 1){
        return "col-span-3 row-span-3"
      }
    //   }if(index === 2){
    //     return "row-span-2 col-span-2"
    //   }if(index === 3){
    //     return "row-span-2 col-span-2"
    //   }
      
    }
  

    const screenResolution = [{id:1,screen:"2D"},{id:2,screen:"3D"},{id:3,screen:"4DX"}]

    const deletePhotos = (index) => {
        const newArray = [...downloadUrls];
        newArray.splice(index, 1);
        setDownloadUrls(newArray);
    }
    console.log(downloadUrls)

    const setDefaultPhotos = (photo) => {
        const otherPhotos = downloadUrls.filter(e => e !== photo)
        const starPhoto = photo;
        setDownloadUrls([starPhoto, ...otherPhotos])
    }

    if(loading) return <Loading />

  return (
    <section className="col-span-10 grid z-50 grid-cols-10 min-h-screen">
        <div className="col-span-5 overflow-y-scroll overflow-x-hidden mb-8">
            <p className="px-[.7rem]">Manage CinemaDetail <span className="uppercase">{params.id}</span> <span>{day}</span></p>
            {<motion.div layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="flex flex-col gap-4 z-[1000] mt-4">
                {cinemaInfo.map((cinema)=>(
                <div className="flex mx-[.7rem] gap-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 overflow-hidden">
                    <div>
                        <img className="w-36 aspect-square object-cover" src={cinema.imageUrls[0]}  alt={cinema.cinema + " picture"} />
                    </div>
                    <div className="flex flex-col justify-center gap-1 p-4">
                        <p className="text-light">{cinema.cinema}</p>
                        <a href={`http://maps.google.com/?q=`+cinema.location} className="flex text-primary items-center gap-1 hover:underline"><FaLocationDot />{cinema.location}</a>
                        <div className="flex gap-2">
                            <button onClick={(e)=>{e.preventDefault();getSingleCinema(cinema.cinema_id);}} className="text-green-500 text-xl  py-1 mt-2 rounded-md"><PiNotePencilDuotone /></button>
                            <button onClick={(e)=>{e.preventDefault();handleDelete(cinema.cinema_id);}} className="text-red-500 text-xl py-1 mt-2 rounded-md"><BiTrashAlt /></button>
                        </div>
                    </div>
                </div>
                ))}
            </motion.div>}
        </div>
        {
            <motion.div layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className={`col-span-5 px-4 overflow-y-scroll`}>
                {params.cinema_id ?<h2 className="text-primary">Update Cinema</h2>:<h2 className="text-primary">Create Cinema</h2>}

                <form className="flex flex-col gap-4 text-sm mt-4 mb-8" action="">
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="text-light" htmlFor="">Cinema Name</label>
                        <input value={cinema} onChange={(e)=>setCinema(e.target.value)} className="   
                            p-2               
                            bg-gray-400 
                            bg-clip-padding 
                            backdrop-filter
                            text-light 
                            backdrop-blur-sm 
                            bg-opacity-10" type="text" placeholder="cinema" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="text-light" htmlFor="">Location</label>
                        <input value={location} onChange={(e)=>setLocation(e.target.value)} className="   
                            p-2               
                            bg-gray-400 
                            bg-clip-padding 
                            backdrop-filter
                            text-light 
                            backdrop-blur-sm 
                            bg-opacity-10" type="text" placeholder="location" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="text-light" htmlFor="">Theatre Screen</label>
                        <div className="flex items-center rounded-lg">
                        <input value={screen} disabled onChange={(e)=>{setScreen(e.target.value)}} className="   
                            p-2               
                            bg-gray-400 
                            bg-clip-padding 
                            backdrop-filter
                            text-light 
                            backdrop-blur-sm 
                            bg-opacity-10" type="text" placeholder="screen" />
                            <div className="dropdown bg-primary flex px-2 py-[.65rem]">
                            <label tabIndex={0} className=" text-light"><BiSolidChevronDown /></label>                           
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2                                 
                                                      bg-gray-400 
                                                        bg-clip-padding 
                                                        backdrop-filter
                                                        text-light 
                                                        backdrop-blur-sm 
                                                        bg-opacity-10 rounded-box w-52">
                                    {screenResolution.map(screen=>(
                                        <li><a className="hover:text-primary" onClick={(e)=>setScreen(e.target.innerHTML)}>{screen.screen}</a></li>
                                    ))}
                                </ul>                     
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">   
                    <label className="text-light" htmlFor="">Theatre Image</label>     
                        <input type="file" className="text-light w-full" multiple onChange={handleImageChange} />
                        {/* <button className="bg-primary py-2 rounded-md" onClick={(e)=>{e.preventDefault();uploadFile()}}>Upload Images</button> */}
                        {(progress || downloadUrls) && <div className="mt-4">
                            <div className={`text-center`}>
                                {(progress !== 100 && downloadUrls.length === 0) && 
                                    <div className="radial-progress my-8 text-primary" style={{ "--value": `${progress}`, "--size": "5rem", "--thickness": "2px" }}>{progress}%</div>
                                }
                            </div>
                            <div  className="grid grid-rows-6 grid-cols-12 grid-flow-col gap-1">
                            {downloadUrls.map((url, index) => (                 
                                <motion.div layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} key={index} className={cssGrid(index)+" relative"} >
                                    <img className="object-cover aspect-square h-full w-full" src={url} alt={`Image ${index}`} />
                                    <motion.button whileHover={{ scale: .90 }} whileTap={{ scale: 0.9 }} onClick={(e)=>{e.preventDefault();setDefaultPhotos(url)}} className="absolute left-0 top-0"><AiFillStar className="text-primary text-3xl" /></motion.button>
                                    <motion.button whileHover={{ scale: .90 }} whileTap={{ scale: 0.9 }} onClick={(e)=>{e.preventDefault();deletePhotos(index)}} className="absolute right-0 top-0"><IoCloseCircleSharp className="text-primary text-3xl" /></motion.button>
                                </motion.div>                                        
                            ))}
                            </div>   
                            
                        </div>}
                    </div>
                    <div className="flex flex-col flex-1 gap-1">
                        <label className="text-light" htmlFor="">Theatre Seats</label>
                        <div className="grid grid-cols-3 gap-1">
                            <input value={startingRow} onChange={(e)=>setStartingRow(e.target.value)} className="   
                                p-2               
                                bg-gray-400 
                                bg-clip-padding 
                                backdrop-filter
                                text-light 
                                backdrop-blur-sm 
                                bg-opacity-10" type="text" placeholder="startingRow" />
                            <input value={endingRow} onChange={(e)=>setEndingRow(e.target.value)}  className="   
                                p-2               
                                bg-gray-400 
                                bg-clip-padding 
                                backdrop-filter
                                text-light 
                                backdrop-blur-sm 
                                bg-opacity-10" type="text" placeholder="EndingRow" />
                            <input value={seatsPerRow} onChange={(e)=>setSeatsPerRow(e.target.value)}  className="   
                                p-2               
                                bg-gray-400 
                                bg-clip-padding 
                                backdrop-filter
                                text-light 
                                backdrop-blur-sm 
                                bg-opacity-10" type="number" placeholder="seatsPerRow" />
                        </div>
                    </div>
                    <p>Theatre Details សម្រាប់ថ្ងៃ <span>{params.day}</span> ម៉ោង <span>{time}</span></p>
                    <TheatreSeats cinema={params.id} time={time} movie_id={params.movie_id} seats={seats} setSeats={setSeats} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} seatsPerRow={parseInt(seatsPerRow)} total={total} setTotal={setTotal} createSeats={createSeats} handleSeat={handleSeat} />
                    {/* create cinema */}
                    {params.cinema_id
                    ? 
                    <motion.button whileHover={{ scale: .99 }} whileTap={{ scale: 0.9 }}  onClick={(e)=>{e.preventDefault();handleCinema();}} className="bg-primary py-2 rounded-md cursor-pointer z-50">Update Cinema</motion.button>
                    :
                    <motion.button whileHover={{ scale: .99 }} whileTap={{ scale: 0.9 }}  onClick={(e)=>{e.preventDefault();handleCinema();}} className="bg-primary py-2 rounded-md cursor-pointer z-50">Create Cinema</motion.button>
                    }
                    
                </form>
            </motion.div>
        }
    </section>
  )
}

export default ManageCinema