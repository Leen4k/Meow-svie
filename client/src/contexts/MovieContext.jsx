import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { db } from '../firebase';



export const MovieContext = createContext();

const MovieProvider = ({children}) => {

  const [movies, setMovies] = useState([]);
  // const [title, setTitle] = useState("roth");

  useEffect(()=>{

    const fetchMovies = async () => {
      try{
        const res = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=145419a56bbc65db41851853b9453890&language=en-US");
        const data = await res.data;
        const {results} = data
        setMovies(results);

        //request the backend to map our data from the api's results
        // const response = axios.post("/movie",{results})
        // console.log('Response from backend:', response);
      }catch(err){
        console.log(err)
      }
    }

    fetchMovies();
  },[]);

  return (
    <MovieContext.Provider value={{movies, setMovies}}>{children}</MovieContext.Provider>
  )
}

export default MovieProvider;