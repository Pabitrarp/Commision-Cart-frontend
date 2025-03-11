import React, { useContext, useEffect, useState } from 'react'
import { Productscard } from '../reuseablecomp/Productscard'
import { useParams } from 'react-router-dom';
import { GrFormPrevious } from "react-icons/gr";
import { FaBagShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Mycart from '../../contex/usercart';
import { toast } from 'react-toastify';
import { Productsaxios,baseurlforimg } from '../../axios';
export const Productdetailspage = () => {
  const { id } = useParams();
  const { catagoryname } = useParams();
  const {addcart,cart}=useContext(Mycart);
  const [allproducts,setallproducts]=useState([]);
  useEffect(()=>{
    const getproducts=async()=>{
      try {
        const res= await Productsaxios.get("products/allproducts");
        if(res.status===200){
          setallproducts(res.data)
        }
      } catch (error) {
        console.log(error) 
      }
    }
    getproducts();
  },[])
  const subproducts = allproducts
    .filter((item) => item.catagoryname === catagoryname) // Filter by category name
    .map((item) => ({
      catagoryname: item.catagoryname, // Include catagoryname
      products: item.products.filter((p) => p.id != id), // Filter by product name
    }));

    const add=(value)=>{
      addcart(value)
      toast.success(`${value.name} added to cart!`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  return (<>
    <div>
      {
        allproducts?.map((category) => {
          return category.products?.map((p,index) => {
            if (p.id === id) {
              return <>
                <div className="header p-4 flex items-center justify-center bg-white sticky top-0 border shadow-sm shadow-blue-200" key={index}>
                  <Link to="/" className="absolute left-4">
                    <GrFormPrevious className="text-3xl" />
                  </Link>
                  <div className="text-xl font-bold ">
                    {category.catagoryname}
                  </div>
                  <Link to="/mycart" className="absolute right-5">
                    <FaBagShopping className="text-3xl"  />
                    {cart.length>0&&<span className='absolute -top-2 -right-2   rounded-full bg-blue-400 text-white font-extrabold min-w-6 min-h-6 text-center flex justify-center items-center shadow-blue-400 shadow-sm text-sm'>{cart.length}</span>}
                  </Link>
                </div>
                <div key={p.id} className="justify-center flex items-center p-2 mt-4">
                  <div className="img  rounded-md overflow-hidden max-w-72 max-h-72 min-h-72 border-black border">
                    <img src={`${baseurlforimg}${p.image}`} className='object-cover min-h-72' />
                  </div>
                </div>
                <div className="flex-col   items-center p-4">
                  <p className="text-center font-bold mb-2">{p.name}</p>
                  <p className="text-justify text-sm font-semibold">{p.description}</p>
                  <div className='flex justify-between p-2'>
                    <p className="text-blue-500 font-bold">₹{p.price}</p>
                    <p className="font-semibold opacity-30">{p.grams}/g</p></div>
                   {p.stuck==0?<div className=' p-2 capitalize font-semibold text-md text-red-500 border-red-500 border rounded-md'>this product currentlly out of stucks</div>: <button className='uppercase bg-blue-400 p-2 text-white rounded-lg mt-2' onClick={()=>add(p)}>add to cart</button>}
                  
                </div>
                <hr className="border-t border-black  " />
              </>;
            }
          });
        })
      }

    </div>
    <Productscard allproducts={subproducts}></Productscard>
  </>
  )
}
