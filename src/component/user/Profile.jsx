import React, { useContext, useEffect, useState } from 'react';
import { GrFormPrevious } from "react-icons/gr";
import { FaBagShopping, FaCopy } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Mycart from '../../contex/usercart';
import axios from 'axios';
import { Binarytree } from '../reuseablecomp/Binarytree';
import Usercontex from '../../contex/usercontex';
import { Useraxios } from '../../axios';

export const Profile = () => {
const {cart}=useContext(Mycart);
const [treedata,settreedata]=useState("");
const [data,setdata]=useState("");
const {User}=useContext(Usercontex);

useEffect(() => {
  async function fetchAndSetData() {
    try {
      if (!User?.id) return;
      
      const response = await Useraxios.post("user/profile", {
        userid:User?.id,
      });
      settreedata(response?.data?.referralTree);
      setdata(response?.data?.user);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  fetchAndSetData();
}, [User]);

const copytext=(text)=>{
  navigator.clipboard.writeText(text).then(()=>alert("referid copied to clipboard")).catch(()=>alert("failed to copy "))

}

  return (<>
    <div className="header p-4 flex items-center justify-center bg-gradient-to-tr from-cyan-400  to-cyan-800 text-white  sticky top-0 ">
    <Link to="/" className="absolute left-4">
      <GrFormPrevious className="text-3xl" />
    </Link>
    <div className="text-xl font-bold uppercase">
      myprofile
    </div>
    <Link to="/mycart" className="absolute right-5">
      <FaBagShopping className="text-3xl"  />
      {cart.length>0&&<span className='absolute -top-2 -right-2   rounded-full bg-blue-400 text-white font-extrabold min-w-6 min-h-6 text-center flex justify-center items-center shadow-blue-400 shadow-sm text-sm'>{cart.length}</span>}
    </Link>
  </div>
  <div className="profile  flex justify-center flex-col items-center p-4">
   <div className="card p-4 border flex-col flex text-center rounded-xl border-black w-70 gap-1">
    <strong>Name : {data?.name}</strong>
    <strong>Mobile : {data?.phone}</strong>
    <strong>email : {data?.email}</strong>
    <strong>commision Amount: {data?.commision}</strong>
    <strong>Refer Amount: {data?.referearn}</strong>
   <div className='flex justify-center gap-2 items-center'>
     <label htmlFor="referid" className='capitalize font-bold '>referId :</label>
     <input type="text"  value={data?.referId}className='p-1 pl-2 w-fit max-w-32 rounded-lg border-black border outline-none font-bold text-md'/>
     <FaCopy className='text-2xl  font-normal text-blue-500' title='copy' onClick={()=>copytext(data?.referId)}></FaCopy>
     </div>
   </div>
  </div>
  <div>
      <div className='p-2'>{treedata ? <Binarytree node={treedata} /> : <div>Loading...</div>}</div>
    </div>
  </>)
}
