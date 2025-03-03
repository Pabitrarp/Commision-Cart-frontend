import React, { useEffect, useRef, useState } from 'react'
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import {Productsaxios} from "../axios"
import { baseurlforimg } from '../axios';
import { Loading } from './reuseablecomp/Loading';

export const Catagory = () => {
  const scrollRef = useRef(null);
  const [Load,setLoad]=useState(false);
  const [Catagorydata,setCatagorydata]=useState([]);
  useEffect(()=>{
  const fetchcatagory=async()=>{
    try {
      setLoad(true);
      const res=await Productsaxios.get("products/getcatagory");
      if(res.status==200){
        setCatagorydata(res.data.catagory)
        setLoad(false);
      }
    } catch (error) {
      setLoad(false);
      console.log(error)
    }
  };
   fetchcatagory();
  },[])

  const scrollLeft = () => {
    if (scrollRef.current) {

      scrollRef.current.scrollBy({ left: -106, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 106, behavior: 'smooth' });
    }
  };
  const scrollsection = (id) => {
    const div = document.getElementById(id);
    div.scrollIntoView({ behavior: 'smooth' })
  }

   if(Load){
    return <div className=' flex  justify-center items-center h-20'>
     <Loading></Loading>
    </div>
   }
  return (
    <div >
      <p className='text-center underline font-bold text-lg lg:text-2xl '>Catagory</p>
      <div className='flex justify-center items-center p-1'>
        <div className='text-2xl p-1 '>
          <GrFormPrevious onClick={scrollLeft} className='cursor-pointer' />
        </div>
        <div className='flex overflow-auto space-x-2 p-2 scrollbar-hide' ref={scrollRef}>
          {Catagorydata.map((data,index) => <div className=" lg:w-40 min-w-24 rounded-xl overflow-hidden cursor-pointer border-r-2 border-l-2 border-b-2 border-blue-100" onClick={() => scrollsection(data.Name)} key={index} >
            <div className="image ">
              <img src={`${baseurlforimg}${data.image}`} className='object-cover h-20 w-24 lg:w-40 lg:h-32' alt='pabitra'/>
            </div>
            <div className='text-center  text-sm p-2 lg:font-semibold bg-gray-100'>{data.Name}</div>
          </div>)}
        </div>
        <div className=' text-2xl p-1'>
          <MdNavigateNext onClick={scrollRight} className='cursor-pointer' />
        </div>
      </div>
             
      {/* for all fruites */}
     
    </div>
  )
}
