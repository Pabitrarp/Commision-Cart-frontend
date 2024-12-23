import React, { useContext, useEffect, useState } from 'react';
import { GrFormPrevious } from "react-icons/gr";
import { FaBagShopping, FaCopy, FaInfo } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Mycart from '../../contex/usercart';
import Usercontex from '../../contex/usercontex';
import { Useraxios } from '../../axios';
import { GiMoneyStack } from 'react-icons/gi';
import { FaInbox } from 'react-icons/fa';
import { Modal } from '../reuseablecomp/Modal';
export const Walet = () => {
  const [isopen,setisopen]=useState(false);
    const {cart}=useContext(Mycart);
    const {User}=useContext(Usercontex);
    const [Wallet, setWallet] = useState('')
    const [error, seterror] = useState('p');
    useEffect(() => {
       const fetch=async()=>{
        try {
          const res=await Useraxios.post("/user/wallet",{User});
          setWallet(res.data.data);
        } catch (error) {
          console.log(error);
        }
       }
    if(User){
      fetch();
    }
     
    }, [User])
     const onclose=()=>{
      setisopen(false);
     }
 const withdrawal=(e)=>{
     e.preventDefault();
     if(validate()){

     }
     else{
      
     }
 }
  return (
    <>
    <div className="header p-4 flex items-center justify-center bg-white sticky top-0 border shadow-sm shadow-blue-200">
    <Link to="/" className="absolute left-4">
      <GrFormPrevious className="text-3xl" />
    </Link>
    <div className="text-xl font-bold uppercase">
      my wallet
    </div>
    <Link to="/mycart" className="absolute right-5">
      <FaBagShopping className="text-3xl"  />
      {cart.length>0&&<span className='absolute -top-2 -right-2   rounded-full bg-blue-400 text-white font-extrabold min-w-6 min-h-6 text-center flex justify-center items-center shadow-blue-400 shadow-sm text-sm'>{cart.length}</span>}
    </Link>
  </div>
  <div className='p-3'>
      <div className='border p-2 rounded-lg border-black text-justify  flex flex-col items-center bg-white'>
        <p className='text-lg font-semibold capitalize'>name: {Wallet.name}</p>
        <p className='text-lg font-semibold capitalize'>phone: {Wallet.phone}</p>
        <p className='text-lg font-semibold capitalize'>email: {Wallet.email}</p>
        <p className='text-lg font-semibold capitalize'>commision: {Wallet.commision}</p>
        <p className='text-lg font-semibold capitalize'>referearn: {Wallet.referearn}</p>
        <div className=' w-full p-2 flex justify-between items-center mt-4'>
            <p className='capitalize text-lg font-semibold'>total earnings: {Wallet.referearn+Wallet.commision}</p>
            <button className={`${Wallet.referearn+Wallet.commision>100&&Wallet.commision>0?"bg-blue-400 text-white":"bg-gray-400 text-black opacity-50"} flex p-2 gap-2 text-lg capitalize font-semibold rounded-lg border`}disabled={Wallet.referearn+Wallet.commision>10&&Wallet.commision==0?false:true} onClick={()=>setisopen(true)}>withdrawal<GiMoneyStack className='text-3xl'></GiMoneyStack></button>
        </div>
      </div>

  </div>
  <Modal isopen={isopen} onclose={onclose} title={"withdrawal amount"}>
    <div className='flex flex-col gap-2'>
      <label htmlFor="amount">Amount</label>
      <input type="text"  className='p-2 outline-none border-blue-400 border rounded-lg'/>
      <button className='bg-blue-400 p-2 text-white capitalize text-lg font-bold rounded-lg' onClick={withdrawal}>withdraw</button>
      {
        error&&<div className='flex items-center gap-2 capitalize mt-4 border border-red-400 rounded-lg p-2 text-base  text-red-400'><FaInfo className='text-black'/>{error}</div>
      }
    </div>
  </Modal>
    </>
  )
}
