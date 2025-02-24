import React from 'react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

export const Layout = ({children}) => {
  return (
    <div className='flex  flex-col '>
    <Navbar></Navbar>
   <div className=" flex h-full">
    <div className="h-[92vh] w-[13vw] border-r border-black bg-gray-700">
     <Sidebar></Sidebar>
    </div>
  <div>
  <div className="content p-4  bg-blue-50 w-[87vw] h-[92vh] min-h-full">{children}</div>
  
  </div>
   
   </div>
  
</div>

  )
}
