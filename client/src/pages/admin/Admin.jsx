import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { BookingContext } from '../../contexts/BookingContext'
import { PiBuildingsFill } from 'react-icons/pi'

const Admin = () => {
  const [today, setToday] = useState("");
  const [cinemas, setCinemas] = useState([]);
  const {cinemaID, setCinemaId} = useContext(BookingContext);

  useEffect(()=>{
    axios.get("/cinema").then(({data})=>{
      console.log(data)
      setCinemas(data)
    }).catch((err)=>{console.log(err)});
  },[])

  function getCurrentDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    const formattedToday = dd + '-' + mm + '-' + yyyy;
    setToday(formattedToday);
  }
  console.log(today)


  useEffect(()=>{
    getCurrentDate();
  },[])
  return (
      <section className="col-span-6 px-8">

              <div>
                <h2 className="py-[.7rem]">Manage Cinema</h2>
                  <motion.div layout className="flex flex-col gap-2">
                     
                          <Link to={`/admin/manageCinema`} className="flex items-center gap-2 justify-between cursor-pointer bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-2">
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-12 flex items-center justify-center"><PiBuildingsFill className="text-primary text-lg" /></div>
                              <h2>Manage Cinema</h2>
                            </div>
                            <AiOutlineRight className="text-primary" />
                          </Link>

                  </motion.div>
                  <h2 className="py-[.7rem]">Create Showtime for a cinema</h2>
                  <motion.div layout className="flex flex-col gap-2">
                      {cinemas.map((cinema)=>(
                          <Link to={`/admin/${cinema.cinema}/${today}`} onClick={()=>setCinemaId(cinema.cinema_id)} key={cinema.cinema_id} className="flex items-center gap-2 justify-between cursor-pointer bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-2 overflow-hidden">
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-12 flex items-center"><img src={cinema.imageUrls[0]} alt="" /></div>
                              <h2>{cinema.cinema}</h2>
                              <span>{cinema.cinema_id}</span>
                            </div>
                            <AiOutlineRight className="text-primary" />
                          </Link>
                      ))

                      }
                  </motion.div>
              </div>
          </section>
  )
}

export default Admin