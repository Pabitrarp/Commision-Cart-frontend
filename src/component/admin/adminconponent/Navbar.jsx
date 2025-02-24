import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { PiArrowFatLineRightFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate=useNavigate();
  return (
    <div className='w-full bg-gray-700 px-6 py-4 flex justify-between items-center border border-b border-black'>
        <div className='flex items-center tracking-tight'>
           <span className='inline-block text-orange-500 capitalize text-xl'>adm</span>
           <span className='inline-block text-white text-xl'>inp</span>
           <span className='text-green-500 text-xl'>anle</span>
        </div>
        <div>
            <button onClick={()=>{localStorage.clear() 
            navigate("/admin/login")
            }} className='text-white text-xl'><FiLogOut ></FiLogOut></button>
        </div>
    </div>
  )
}
