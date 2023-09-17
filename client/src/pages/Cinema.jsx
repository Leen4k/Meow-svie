import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import Loading from '../components/Loading'
import { MovieContext } from '../contexts/MovieContext'

const Cinema = () => {

  const [today, setToday] = useState("");
  const [cinemas, setCinemas] = useState([]);
  const {loading, setLoading} = useContext(MovieContext);

  useEffect(()=>{
    setLoading(true);
    axios.get("/cinema").then(({data})=>{
      console.log(data)
      setCinemas(data)
      setLoading(false);
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

  if(loading){
    return <Loading />
  }else{
    return (
      <section className="col-span-6 px-8">
          <div>
            <h2 className="py-[.7rem]">Cinema</h2>
              <motion.div layout className="flex flex-col gap-2">
                  {cinemas.map((cinema)=>(
                      <Link to={`/cinema/${cinema.cinema}/${today}`} key={cinema.id} className="flex items-center gap-2 justify-between cursor-pointer bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-2 overflow-hidden">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 flex items-center"><img src={cinema.imageUrls[0]} alt="" /></div>
                          <h2>{cinema.cinema}</h2>
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



}

export default Cinema