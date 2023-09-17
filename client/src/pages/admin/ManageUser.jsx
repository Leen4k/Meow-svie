import axios from 'axios'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { FaUserCheck } from 'react-icons/fa6'
import { PiBuildingsFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { storage } from '../../firebase'
import Loading from '../../components/Loading'
import { MovieContext } from '../../contexts/MovieContext'

const ManageUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [password, setPassword] = useState("");
    const [admins, setAdmins] = useState([]);
    const {loading, setLoading} = useContext(MovieContext)
    console.log(photo)

    useEffect(()=>{
        const uploadFile = () => {
          const name = new Date().getTime() + file.name;
          console.log(file)
          const storageRef = ref(storage, file.name);
          const uploadTask = uploadBytesResumable(storageRef, file);
    
          uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
              case "paused":
                console.log("upload is paused");
              case 'running':
               console.log("Upload is running");
              default:
                break;
            }
          },(error)=>{
            console.log(error)
          },() => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL)=>{
              setPhoto(downloadURL);
            })
          }
          );
        };
        file && uploadFile();
      },[file])    

      
      useEffect(()=>{
        getAdmins();
      },[])

      const getAdmins = () => {
        setLoading(true);
        axios.get("/admins").then(({data})=>{
            setAdmins(data)
            setLoading(false);
      }).catch(err=>{console.log(err)})
      }

    const handleCreateAdmin = async () => {
        try{
            const response = await axios.post("/register-admin",{name,email,password,photo});
            getAdmins();
            alert("created admin successfully")
        }catch(e){
            alert("This admin is already registered")     
        }
    }

    if(loading) return <Loading />;

  return (
    <section className="col-span-10 grid z-50 grid-cols-10 min-h-screen">
        <div className="col-span-5">
            <h2 className="py-[.7rem]">Manage Admins</h2>
            <motion.div layout className="flex gap-2 flex-col">
            {admins.length > 0 && admins.map((admin)=>(
                <motion.div className="flex flex-col gap-2">      
                    <div  className="flex items-center gap-2 justify-between cursor-pointer bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-2">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 flex items-center justify-center"><FaUserCheck className="text-primary text-lg" /></div>
                            <div className="w-12 flex items-center justify-center"><img className="rounded-full aspect-square" src={admin.photo} alt="" /></div>
                            <div className="flex gap-1">
                                <span>Name:</span>
                                <h2>{admin.name}</h2>
                            </div>
                            <div className="flex gap-1">
                                <span>Email:</span>
                                <p>{admin.email}</p>
                            </div>
                        </div>
                        <AiOutlineRight className="text-primary" />
                    </div>
            </motion.div>
            ))}
            </motion.div>
        </div>
        <motion.div layout initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className={`col-span-5 px-4 overflow-y-scroll`}>
            <h2 className="text-primary">Create Cinema</h2>
            <form action="" className="flex flex-col gap-4 text-sm mt-4 mb-8">
                <div className="flex flex-1 flex-col gap-1">
                            <label className="text-light" htmlFor="">Admin name's</label>
                            <input value={name} onChange={(e)=>{setName(e.target.value)}} className="   
                                p-2               
                                bg-gray-400 
                                bg-clip-padding 
                                backdrop-filter
                                text-light 
                                backdrop-blur-sm 
                                bg-opacity-10" type="text" placeholder="name" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                            <label className="text-light" htmlFor="">Admin Email's</label>
                            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="   
                                p-2               
                                bg-gray-400 
                                bg-clip-padding 
                                backdrop-filter
                                text-light 
                                backdrop-blur-sm 
                                bg-opacity-10" type="text" placeholder="email" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                            <label className="text-light" htmlFor="">Admin Password</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} className="   
                                p-2               
                                bg-gray-400 
                                bg-clip-padding 
                                backdrop-filter
                                text-light 
                                backdrop-blur-sm 
                                bg-opacity-10" type="text" placeholder="password" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                            <label className="text-light" htmlFor="">Admin Photo's</label>
                            <input type="file" className="text-light w-full" onChange={(e)=> setFile(e.target.files[0])} />
                            <img className="rounded-full w-12 aspect-square object-cover" src={photo} alt="" />
                </div>
                <motion.button whileHover={{ scale: .99 }} whileTap={{ scale: 0.9 }} onClick={(e)=>{e.preventDefault();handleCreateAdmin()}} className="bg-primary py-2 rounded-md cursor-pointer z-50">Create Admin</motion.button>

            </form>
        </motion.div>
    </section>
  )
}

export default ManageUser