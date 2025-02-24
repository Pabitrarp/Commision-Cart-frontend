import React, { useContext, useEffect, useState } from 'react';
import { GrFormPrevious } from "react-icons/gr";
import { FaBagShopping } from "react-icons/fa6";
import { json, Link } from 'react-router-dom';
import Mycart from '../../contex/usercart';
import Usercontex from '../../contex/usercontex';
import { Useraxios,Orderaxios,baseurlforimg } from '../../axios';
import { Modal } from '../reuseablecomp/Modal';                             
import { Addressfrom } from '../reuseablecomp/Addressfrom';
import { BsHouseAdd } from 'react-icons/bs';
import { FiDelete } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { BiSave } from 'react-icons/bi';
import { Paymentqrcode } from '../Paymentqrcode';
import { data } from 'autoprefixer';
import { toast } from 'react-toastify';


const Cart = () => {
  const [Address,setAddress]=useState("");
  const [Selectadd,setSelectadd]=useState("");
  const [ismodadlopen,setismodalopen]=useState(false);
  const [ispaymodadlopen,setispaymodadlopen]=useState(false);
  const [addrescontainer,setaddrescontainer]=useState(true);
  const {User}=useContext(Usercontex)
  const {cart,remove,incrementquantity,decrementquantity,empty}=useContext(Mycart);
  const [file,setfile]=useState(null);
  const [tsid,settsid]=useState(null);

 useEffect(()=>{
  async function fetch() {
    try {
      const res=await Useraxios.post("user/getaddress",{User});
      setAddress(res.data.address);
    } catch (error) {
      console.log(error);
    }
  }
  if(User){
    fetch();
  }
 },[ismodadlopen])
  
  const openpaymetmodal=()=>setispaymodadlopen(true);
  
  const openmodal=()=>setismodalopen(true);
  const onclose=()=>{
    setismodalopen(false)
    setispaymodadlopen(false)
  }
  const decreasecart=(v,value)=>{
    v==1?remove(value):decrementquantity(value);
  }
  const increment=(value)=>{
    incrementquantity(value);
  }
  const createorder=async(e)=>{

    if(!file) {
      toast.error("plz upload screenshots")
      return;
    }
    if(!tsid){
      toast.error("enter transaction id")
      return;
    }
   try {
    const data=new FormData();
    data.append("amount",total_amount);
    data.append("id",User?.id);
    data.append("products",JSON.stringify(products));
    data.append("add",Selectadd);
    data.append("tsid",tsid);
    data.append("paymentproof",file);
 
    const response=await Orderaxios.post("createorder",data,{
      headers:{
        "Content-Type":"multipart/from-data"
      }
    });
    toast.success(response.data.message);
    onclose();
    empty();
   } catch (error) {
    console.log(error)
   }
  }

  // const handlePayment = async (amount,id,products,add) => {
  //   try {
  //     if(cart.length==0){alert("plase add some products");return}
  //     if(!Selectadd){alert("plase selsect address");return}
  //     const { data } = await Orderaxios.post("addproducts", { amount });
  //     const options = {
  //       key: "rzp_test_uOZqbhkzZQ9vKC", // Replace with your test Razorpay key
  //       amount: data.order.total_amount * 100, // Amount in paise
  //       currency: data.order.currency,
  //       order_id: data.order.razorpay_order_id, // Correct order_id
  //       handler: async (response) => {
  //         const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
  //         if (!razorpay_signature) {
  //           console.log("Signature not present");
  //           return alert("Payment was not completed!");
  //         }
  //         try {
  //           const verifyResponse = await Orderaxios.post("veryfypayment", {
  //             razorpay_order_id,
  //             razorpay_payment_id,
  //             razorpay_signature,
  //             id,
  //             products,
  //             add,
  //             amount
  //           });
  //           if(verifyResponse.status==201){
  //           alert("Payment successful! Verification passed.");
  //                    empty();
  //             }
  //         } catch (error) {
  //           console.error("Verification failed:", error);
  //           alert("Payment verification failed!");
  //         }
  //       },
  //       theme: { color: "#3399cc" },
  //     };
  
  //     const rzp = new Razorpay(options);
  //     rzp.open();
  //   } catch (error) {
  //     console.error("Payment initiation failed:", error);
  //   }
  // };
 const removeadd=async(id)=>{
  try {
    const filterdata=Address.filter((data)=>data._id !=id);
    setAddress(filterdata);
    const res= await Useraxios.post("/user/deleteadd",{id,User})
  } catch (error) {
    
  }
    
 } 

const total_amount= cart.reduce((acc, item) => acc + item.price*item.quantity, 0)
 const handelchange=(e,id)=>{
   if(e.target.checked){
    
    setSelectadd(id);
   }else{
    setSelectadd("")
   }
 }

const products=cart.map((item)=>item);
  return (<div>
    <div className="header p-4 flex items-center justify-center bg-white sticky top-0 border shadow-sm shadow-blue-200">
    <Link to="/" className="absolute left-4">
      <GrFormPrevious className="text-3xl" />
    </Link>
    <div className="text-xl font-bold uppercase">
      mycart
    </div>
    <Link to="/mycart" className="absolute right-5">
      <FaBagShopping className="text-3xl"  />
      {cart.length>0&&<span className='absolute -top-2 -right-2   rounded-full bg-blue-400 text-white font-extrabold min-w-6 min-h-6 text-center flex justify-center items-center shadow-blue-400 shadow-sm text-sm'>{cart.length}</span>}
    </Link>
  </div>
  <div className="p-3  overflow-auto mb-20">
 {cart.map((cart,index)=><div className="bg-white flex justify-between p-2 items-center border border-blue-400 rounded-lg mt-2" key={index}>
  <div className='overflow-hidden'>
    <img src={`${baseurlforimg}${cart.image}`}  className='max-w-16  min-w-16 min-h-16 max-h-16 rounded-lg'/></div>
  <div className=' items-center  max-w-32 text-wrap overflow-hidden whitespace-nowrap '>{cart.name}</div>
  <div className='flex gap-2 border border-blue-400 rounded-lg'>
    <div className='text-1xl font-bold text-blue-400 border-r border-blue-400 p-2 flex justify-center items-center' onClick={()=>increment(cart)}>+</div>
    <p className='font-bold text-blue-400 justify-center items-center flex'>{cart.quantity}</p>
    <div className='text-2xl font-bold text-blue-400 border-l border-blue-400 p-2 flex justify-center items-center' onClick={()=>decreasecart(cart.quantity,cart)}>-</div>
    </div>
  <div className=' '>₹{cart.price*cart.quantity}</div>
 </div>)}
  </div>
  
  <div className='fixed  bg-white  w-full bottom-0 min-h-14 justify-center flex items-center border shadow-sm shadow-blue-200 '>
    <div className='text-black text-md uppercase'>Total Amount = ₹{total_amount}</div>
  </div>
     { Selectadd&&<button className="fixed bottom-4 right-5 bg-blue-400 text-white text-lg w-16 h-16 rounded-full shadow-md shadow-blue-300 border-white hover:bg-blue-300 hover:shadow-blue-200" onClick={openpaymetmodal}>
       Order
      </button>}
      
      {/* {Address?.length>0&&<button className="fixed bottom-4 right-5 bg-blue-400 text-white text-sm w-16 h-16 rounded-full shadow-md shadow-blue-300 border-white hover:bg-blue-300 hover:shadow-blue-200" onClick={()=>setaddrescontainer(true)}>
       Select address
      </button> } */}
      {
         addrescontainer==true&&(<div className='fixed bottom-0 max-h-[60vh] min-h-[10vh] w-full flex justify-center items-center flex-col overflow-auto bg-white border border-t-1 border-b-0 border-r-0 border-l-0 border-gray-400 rounded-lg '>
          <div className="w-full mt-2 justify-center flex flex-row gap-2"> <button className='text-2xl font-extrabold  p-2 capitalize border border-blue-400 rounded  flex gap-2' onClick={openmodal}><BsHouseAdd></BsHouseAdd><p className='text-base font-semibold '>Add adress</p></button>
          {
            Selectadd&&<button className='text-2xl font-extrabold  p-2 capitalize border border-blue-400 rounded  flex gap-2' onClick={()=>{
              setaddrescontainer(false)}}><BiSave></BiSave><p className='text-base font-semibold'>Save addres</p></button>
          }
          </div>
          {
            Address&&Address.map((add,index)=><><div className='flex gap-4 w-full items-center justify-center bg-white p-2 ' key={index}>
                   <div className=' w-80 flex items-center gap-10 p-1'>
                   <div className="checkbox  ">
                    <input type="radio"  className='w-5 h-5' name="A"
                    checked={Selectadd==add._id}
                   onChange={(e)=>handelchange(e,add._id)}/>
                   </div>
              <div className="addres text-balck text-md capitalize  break-all  w-80 text-center font-bold">{add.name}<br></br><p className='text-justify font-normal'>{add.city},{add.landmark},{add.pincode}</p></div>
              <MdDelete className='text-red-500 text-3xl font-extrabold' onClick={()=>removeadd(add._id)}></MdDelete>
             </div>  
              </div>
              <hr className='border  w-full'/></>)
          }
          
         </div>)
      }
    <Modal isopen={ismodadlopen} onclose={onclose} title={"Your Address Is Require For Order"}>
      <Addressfrom id={User?.id} onclose={onclose}></Addressfrom>
    </Modal>
    
    <Modal isopen={ispaymodadlopen} onclose={onclose} title={"Payment"}>
        <div className='  w-full flex flex-col items-center gap-5 '>
                 <div className=' flex items-center'>
                     <Paymentqrcode amount={total_amount?total_amount:0}/>
                 </div>
                 <div className='flex justify-center border-2 h-32  border-blue-300 rounded-lg items-center w-full flex-col gap-2'>
                   <label htmlFor="lable" className='capitalize font-bold '>
                    Upload scrrenshort of payment
                   </label>
                   <div className='w-52 flex flex-col gap-2'>
                   <input type="file" name="" id=""  accept='' onChange={(e)=>setfile(e.target.files[0])}/>
                   <input type="text"  onChange={(e)=>settsid(e.target.value)} className='border-blue-500 rounded-lg px-2 py-1 border outline-none' placeholder='enter transaction id'/>
                   </div>
                 </div>
                 <button className='px-5 py-2 capitalize bg-blue-300 rounded-md font-bold text-md shadow-md hover:bg-blue-200' onClick={createorder}>submit</button>

        </div>
    </Modal>


  </div>);
};

export default Cart;
