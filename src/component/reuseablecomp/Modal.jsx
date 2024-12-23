import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
export const Modal = ({isopen,onclose,children,title}) => {
const [visible,setvisible]=useState(false);
 useEffect(()=>{
 if(isopen) setTimeout(() => setvisible(true),300);
 else setTimeout(() => setvisible(false),500);
 },[isopen])
  return (<>
     {visible&&(
        <div className={`fixed bg-black inset-0 bg-opacity-40 flex justify-center items-center z-50 transition-opacity duration-500 ease-in-out ${isopen?" opacity-100":"opacity-0"}`}>
       <div className={`bg-blue-50 w-[80vw] rounded-lg p-6 shadow-lg ease-in-out transform transition-transform duration-300 ${isopen?"scale-100":"scale-95"}`}>
       
        <div className="flex justify-between item-center mb-4">
         <h2 className='text-md font-semibold'> </h2>
         <button className="text-black hover:text-blue-400 text-2xl extrabold" onClick={onclose}><IoCloseOutline /></button>
         
        </div>
        <div className="mb-4">
            <p className='text-center font-bold text-md underline capitalize'>{title}</p>
         </div>
         <div className="">{children}</div>
         {/* <div className="text-right mt-4">
            <button className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600' onClick={onclose}>Close</button>
         </div> */}
       </div>

        </div>
    )}
  
  
  
  </>
    
  )
}
