import React, { useContext, useEffect, useState } from 'react';
import { GrFormPrevious } from "react-icons/gr";
import { FaBagShopping, FaCopy } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Mycart from '../../contex/usercart';
import Usercontex from '../../contex/usercontex';
import { Orderaxios, Useraxios } from '../../axios';
import { baseurlforimg } from '../../axios';
export const Order = () => {
    const [order,setorder]=useState([]);
    const {cart}=useContext(Mycart);
    const {User}=useContext(Usercontex);
    useEffect(()=>{
       const fetch= async () => {
            try {
                const userorders=await Orderaxios.post("/getallorders",{User});
                if(userorders.status==200){
                    setorder(userorders?.data?.orders)
                }
            } catch (error) {
              console.log(error)  
            }
        }
        fetch();
    } ,[User])
  return (
    <>
    <div className="header p-4 flex items-center justify-center bg-white sticky top-0 border shadow-sm shadow-blue-200">
     <Link to="/" className="absolute left-4">
      <GrFormPrevious className="text-3xl" />
   </Link>
    <div className="text-xl font-bold uppercase">
   my orders
   </div>
  <Link to="/mycart" className="absolute right-5">
  <FaBagShopping className="text-3xl"  />
  {cart.length>0&&<span className='absolute -top-2 -right-2   rounded-full bg-blue-400 text-white font-extrabold min-w-6 min-h-6 text-center flex justify-center items-center shadow-blue-400 shadow-sm text-sm'>{cart.length}</span>}
</Link>
</div>
  <div className=" w-fulll h-screen  px-2">
   {
   order.map((data)=>
    // <div className='bg-white border-2 p-2 rounded-lg shadow-lg shadow-blue-200 ' key={data?._id}>
   <>
      {
        data?.products?.map((product)=><>
        <div className='flex gap-4 items-center justify-between mt-5 bg-white p-2 shadow-blue-300 shadow-lg border rounded-2xl'>
            <img src={`${baseurlforimg}${product.image}`} className='w-32 h-32 rounded-lg border'/>
            <div className="h-32 border border-gray-300 rounded-lg"></div>
            <div>
            <p className='capitalize font-semibold'>name: {product?.name}</p>
            <p className='capitalize font-semibold'>amount: {data?.total_amount}.0 Rs</p>
            <p className=' font-semibold'>Weight: {product?.grams} gm</p>
            <p className='capitalize font-semibold'>quantity: {product?.quantity}</p>
            <p className='capitalize font-semibold'>order status: {data?.orderstatus}</p>
           
            </div>
        </div>
        </>)
      }
    </>
   )
   }
  </div>
</>
  )
}
