import React, { useEffect, useState } from 'react'
import { Layout } from './adminconponent/Layout'
import { Adminaxios } from '../../axios';

export const Alluserlist = () => {
    const [User, setUser] = useState([]);
    useEffect(()=>{
        const fetch= async()=>{
            try {
                 const data=await Adminaxios.get("/alluser");
                 setUser(data.data);
            } catch (error) {
             console.log(error)    
            }
        }
        fetch();
    },[])
  return (
    <Layout>
        <div className='flex  gap-4 '>
        {User.map((data)=><div className='bg-gray-700  w-60  rounded-xl p-3 text-xl font-bold flex flex-col justify-center items-center'>
           <p className='text-orange-500 uppercase'>{data.name}</p> 
           <p className='text-orange-500 text-base'>{data.phone}</p> 
           <p className='text-white text-sm font-normal'>{data.email}</p> 
           <p className='text-white text-base font-normal'>referearn: {data.referearn}</p> 
           <p className=' text-base font-normal text-green-500'>commision: {data.commision}</p> 
           <p className='text-green-500 text-base font-normal'> join at:{new Date(data.createdAt).toLocaleDateString()}</p> 
         </div>)}
        </div>
    </Layout>
  )
}
