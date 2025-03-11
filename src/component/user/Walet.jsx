import React, { useContext, useEffect, useState } from 'react';
import { GrFormPrevious } from "react-icons/gr";
import { FaBagShopping, FaCopy, FaInfo } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Mycart from '../../contex/usercart';
import Usercontex from '../../contex/usercontex';
import { Adminaxios, Useraxios } from '../../axios';
import { GiMoneyStack } from 'react-icons/gi';
import { FaInbox } from 'react-icons/fa';
import { Modal } from '../reuseablecomp/Modal';
import { Loading } from '../reuseablecomp/Loading';
import { toast } from 'react-toastify';
export const Walet = () => {
  const [isopen,setisopen]=useState(false);
  const [Load,setLoad]=useState(false);
    const {cart}=useContext(Mycart);
    const {User}=useContext(Usercontex);
    const [Wallet, setWallet] = useState('')
   const [referammount,setreferammount]=useState(0);
   const [commisionammount,setcommisionammount]=useState(0);
   const [upi,setupi]=useState("")
    useEffect(() => {
       const fetch=async()=>{
        try {
          setLoad(true);
          const res=await Useraxios.post("/user/wallet",{User});
          setWallet(res.data.data);
          setLoad(false);
        } catch (error) {
          console.log(error);
          setLoad(false);
        }
       }
    if(User){
      fetch();
    }
     
    }, [User])
     const onclose=()=>{
      setisopen(false);
     }
 const withdrawal=async(e)=>{
     e.preventDefault();
    if(commisionammount < 0 || commisionammount > Wallet?.commision){
      alert("enter valid commision amount")
      onclose();
      setupi("")
      return;
    }
    else if(referammount < 0 || referammount > Wallet?.referearn){
      alert("enter valid referamount amount")
      onclose();
      setupi("")
      return;
    }
    else if(referammount==0 && commisionammount==0){
      alert("enter valid amount");
      onclose();
      setupi("")
    }
     else{
      try {
        const response=await Useraxios.post("/user/withdralreq",{Wallet,referammount,commisionammount,upi});
        if(response.status===201){
         toast.success(response.data.message);
         onclose();
        }
      } catch (error) {
        console.log(error);
        onclose();
        toast.error("something went wrong");
      }
      
     }
     
 }
  if(Load){
    return <Loading/>
  }
  return (
    <>
    <div className="header p-4 flex items-center justify-center bg-gradient-to-tr from-cyan-400  to-cyan-800 text-white sticky top-0 ">
    <Link to="/" className="absolute left-4">
      <GrFormPrevious className="text-3xl" />
    </Link>
    <div className="text-xl font-bold uppercase">
      my wallet
    </div>
    <Link to="/mycart" className="absolute right-5">
      <FaBagShopping className="text-3xl"/>
      {cart.length>0&&<span className='absolute -top-2 -right-2   rounded-full bg-blue-400 text-white font-extrabold min-w-6 min-h-6 text-center flex justify-center items-center shadow-blue-400 shadow-sm text-sm'>{cart.length}</span>}
    </Link>
  </div>
  <div className='p-3'>
    <div className='border p-2 rounded-lg border-black text-justify  flex flex-col items-center bg-gradient-to-tr from-cyan-400  to-cyan-800 text-white'>
      <p className='text-lg font-semibold capitalize'>name: {Wallet.name}</p>
      <p className='text-lg font-semibold capitalize'>phone: {Wallet.phone}</p>
      <p className='text-lg font-semibold capitalize'>email: {Wallet.email}</p>
      <p className='text-lg font-semibold capitalize'>commision: {Wallet.commision}</p>
      <p className='text-lg font-semibold capitalize'>referearn: {Wallet.referearn}</p>
      <div className=' w-full p-2 flex justify-between items-center mt-4'>
          <p className='capitalize text-lg font-semibold'>total earnings: {Wallet.referearn+Wallet.commision}</p>
          <button className={`${Wallet?.isActive && (Wallet?.referearn+Wallet?.commision>=100)?"bg-blue-400 text-white":"bg-gray-400 text-black"} flex p-2 gap-2 text-lg capitalize font-semibold rounded-lg `} disabled={(Wallet?.isActive ) && (Wallet?.referearn+Wallet?.commision>=100)?false:true} onClick={()=>setisopen(true)}>withdrawal<GiMoneyStack className='text-3xl'></GiMoneyStack></button>
      </div>
      {
        (Wallet?.isActive ) && (Wallet?.referearn+Wallet?.commision>=100)?"":<div className='flex  gap-4  capitalize mt-4 border border-red-400 rounded-lg p-2 text-base  text-red-400 bg-red-50'><FaInfo className='text-black'/>To withdraw, you need to activate your account and have a minimum total earnings of ₹100.</div>
      }
      
    </div>
    
  </div>
  <Modal isopen={isopen} onclose={onclose} title={"withdrawal amount"}>
    <div className='flex flex-col gap-2'>
      <label htmlFor="amount">Refer Amount</label>
      <input type="number"  className='p-2 outline-none border-blue-400 border rounded-lg' onChange={(e)=>setreferammount(e.target.value)}/> 
      <label htmlFor="amount">Commision Amount</label>
      <input type="number"  className='p-2 outline-none border-blue-400 border rounded-lg' onChange={(e)=>setcommisionammount(e.target.value)}/>
  
      <label htmlFor="amount">Upi_id||accountnumber</label>
      <input type="text"  className='p-2 outline-none border-blue-400 border rounded-lg' onChange={(e)=>setupi(e.target.value)}/>
       {
     (!upi)?"":<button className= "p-2  capitalize text-lg font-bold rounded-lg bg-blue-200 mt-3" onClick={withdrawal}>withdraw</button>
       }
      
      
    </div>
  </Modal>
    </>
  )
}
