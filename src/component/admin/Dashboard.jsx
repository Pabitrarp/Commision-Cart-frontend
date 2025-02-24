import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout } from './adminconponent/Layout'
import { Adminaxios } from '../../axios'

import {  BiCategory, BiSolidUser } from 'react-icons/bi'
import { BsFillCartFill } from 'react-icons/bs'

import { TbBrandProducthunt } from 'react-icons/tb'

export const Dashboard = () => {
  const [Dashboarddata, setDashboarddata] = useState([]);
const navigate=useNavigate()
  useEffect(()=>{
     const checkadmin=()=>{
      const token=localStorage.getItem("admin");
      if(!token){
        navigate("/admin/login")
      }
     }
     checkadmin();
   const fetch =async () => {
      try {
        const data=await Adminaxios.get("/alldata");
        setDashboarddata(data.data.dashboarddata)
      } catch (error) {
        console.log(error)
      }
    }
    fetch();
  },[])
  return (
   <Layout>
        {Dashboarddata.map((data)=> <div className='flex gap-4'>
             <Link className="card border w-36 h-32 rounded-3xl flex flex-col justify-between items-center p-6  shadow-lg bg-gray-700 " to={"/admin/users"}>
                 <p className='text-orange-500'>
                 <BiSolidUser className='text-3xl'/>
                 </p>
                 <p className='text-2xl capitalize font-bold text-white'>{Object.keys(data)[0]}</p>
                 <p className='font-semibold  text-xl text-green-500'>{data.user}</p>
             </Link>

             <Link className="card border w-36 h-32 rounded-3xl flex flex-col justify-between items-center p-6 bg-gray-700  shadow-lg" to={"/admin/orders"}>
             <p className='text-orange-500'>
                 <BsFillCartFill className='text-3xl'/>
                 </p>
                 <p className='text-2xl capitalize font-bold text-white'>{Object.keys(data)[1]}</p>
                 <p className='font-semibold  text-xl text-green-500'>{data.order-data.user}</p>
             </Link>
             <Link className="card border w-36 h-32 rounded-3xl flex flex-col justify-between items-center p-6 bg-gray-700  shadow-lg">
             <p className='text-orange-500'>
                 <TbBrandProducthunt className='text-3xl'/>
                 </p>
                 <p className='text-2xl capitalize font-bold text-white'>{Object.keys(data)[2]}</p>
                 <p className='font-semibold  text-xl text-green-500'>{data.products-data.user}</p>
             </Link>
             <Link className="card border w-36 h-32 rounded-3xl flex flex-col justify-between items-center p-6 bg-gray-700  shadow-lg">
             <p className='text-orange-500'>
                 <BiCategory className='text-3xl'/>
                 </p>
                 <p className='text-xl capitalize font-bold text-white'>{Object.keys(data)[3]}</p>
                 <p className='font-semibold  text-xl text-green-500'>{data.catagory-data.user}</p>
             </Link>
            
         </div>)}
   </Layout>
  )
}

