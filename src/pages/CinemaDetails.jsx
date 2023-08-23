import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Link, NavLink } from 'react-router-dom';
import TheatreSeats from '../components/TheatreSeats';

const CinemaDetails = () => {
    const {id} = useParams();
    const [dates, setDates] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const {day} = useParams();
    console.log(params)
    
    // console.log(location)


    useEffect(()=>{
        function getShortDate(date) {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return days[date.getDay()] + ' ' + (date.getMonth() + 1) + '-' + date.getDate();
          }
          
          function getNext7Days() {
            const today = new Date();
            const next7Days = [];
          
            for (let i = 0; i < 7; i++) {
              const currentDate = new Date(today);
              currentDate.setDate(today.getDate() + i);
              next7Days.push({
                day: getShortDate(currentDate),
                date: currentDate.getDate() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + currentDate.getFullYear(),
              });
            }
          
            return next7Days;
          }
          
          const next7DaysArray = getNext7Days();
          console.log(next7DaysArray);
          setDates(next7DaysArray);
    },[])
    console.log(dates)

    

  return (
    <section className="col-span-10 grid z-50 grid-cols-10">
        <div className="col-span-6 overflow-scroll">
            <p className="px-[.7rem]">CinemaDetail of <span className="uppercase">{params.id}</span> <span>{day}</span></p>
            <div className="flex gap-2 px-[.7rem] py-4 z-50 w-[130%] overflow-scroll text-center">
                {dates?.length > 0 && dates.map((date)=>(
                    <NavLink to={`/cinema/${params.id}/${date.date}`} className="text-light px-4 rounded-sm bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">{date.day}</NavLink>
                ))}
            </div>
        </div>
        <div className="col-span-4 px-4">
            <TheatreSeats />
        </div>
    </section>
  )
}

export default CinemaDetails