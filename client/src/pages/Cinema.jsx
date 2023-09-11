import React, { useEffect, useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'

const Cinema = () => {

  const [today, setToday] = useState("");
  const [cinemas, setCinemas] = useState([]);

  useEffect(()=>{
    axios.get("/cinema").then(({data})=>{
      console.log(data)
      setCinemas(data)
    }).catch((err)=>{console.log(err)});
  },[])

  // const cinemas = [
  //   {id:1,name:"meow ciniplex", IMG:"https://a0.muscache.com/im/pictures/miso/Hosting-730884644046569848/original/23cba0d9-2fcd-4720-a41d-f66092e17a00.jpeg?im_w=1200", event:[14,22,13]},
  //   {id:2,name:"cats ciniplex", IMG:"https://a0.muscache.com/im/pictures/miso/Hosting-730884644046569848/original/23cba0d9-2fcd-4720-a41d-f66092e17a00.jpeg?im_w=1200", event:[14,22,13]},
  //   {id:3,name:"meowssss ciniplex", IMG:"https://a0.muscache.com/im/pictures/miso/Hosting-730884644046569848/original/23cba0d9-2fcd-4720-a41d-f66092e17a00.jpeg?im_w=1200", event:[14,22,13]},
  //   {id:4,name:"caties ciniplex", IMG:"https://a0.muscache.com/im/pictures/miso/Hosting-730884644046569848/original/23cba0d9-2fcd-4720-a41d-f66092e17a00.jpeg?im_w=1200", event:[14,22,13]}
  // ]

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
        {/* <h2 className="py-[.7rem]">Cinema</h2>
        <div className="grid grid-cols-3 gap-2 rounded-lg overflow-hidden">
            <img className="cursor-pointer" src="https://a0.muscache.com/im/pictures/miso/Hosting-730884644046569848/original/23cba0d9-2fcd-4720-a41d-f66092e17a00.jpeg?im_w=1200" alt="" />
            <img className="cursor-pointer" src="https://a0.muscache.com/im/pictures/miso/Hosting-730884644046569848/original/f3d5a15f-f9cb-4ede-bf61-cf3c1cef5f8c.jpeg?im_w=1440" alt="" />
            <img className="cursor-pointer" src="https://a0.muscache.com/im/pictures/miso/Hosting-730884644046569848/original/95a22c29-b2f2-4e6e-b8f2-0a717ae46fbd.jpeg?im_w=1440" alt="" />
        </div> */}
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

export default Cinema