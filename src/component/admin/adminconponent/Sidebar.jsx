import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { BsFillCartFill } from 'react-icons/bs'
import { FiHome } from 'react-icons/fi'
import { TbBrandProducthunt } from 'react-icons/tb'

export const Sidebar = () => {
  return (
    <div className='p-4'> 
        <div className='flex gap-2 p-2 text-2xl  cursor-pointer border border-r-white border-l-white border-t-orange-500 border-b-green-500'><AiFillHome className='text-orange-500'/> <p className='capitalize text-base font-bold text-white flex'>ho<p className='text-green-500 normal-case'>me</p></p></div>
        <div className='flex gap-2 p-2 text-2xl  cursor-pointer'><BsFillCartFill className='text-orange-500'></BsFillCartFill> <p className='capitalize text-base font-bold text-white flex'>ord<p className='text-green-500 normal-case'>ers</p></p></div>
        <div className='flex gap-2 p-2  text-2xl  cursor-pointer'><TbBrandProducthunt className='text-orange-500'></TbBrandProducthunt> <p className='capitalize text-base font-bold flex text-white'>prod<p className='text-green-500 normal-case'>ucts</p></p></div>
        <div className='flex gap-2 p-2  text-2xl  cursor-pointer'><BiCategory className='text-orange-500'/> <p className='capitalize text-base font-bold flex text-white'>cate<p className='normal-case text-green-500'>gory</p></p></div>
    </div>
  )
}
