import React from 'react'
import TheatreSeats from './components/TheatreSeats'
import { useParams } from 'react-router'

const Ads = () => {
  const params = useParams();
  console.log(params)
  return (
    <section className="col-span-4 px-4 hidden">
        <p>Theatre Seats {params.day}</p>
        <TheatreSeats />
    </section>
  )
}

export default Ads