import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const AdminContext = createContext({});


export function AdminContextProvider({children}){

    const [admin, setAdmin] = useState(null);

    useEffect(()=>{
        if(!admin){
            axios.get("/admin-profile")
            .then(({data})=>{
                setAdmin(data);
                console.log(data)
            })
        }
    },[])

    return (
        <AdminContext.Provider value={{admin, setAdmin}}>{children}</AdminContext.Provider>
    )
}