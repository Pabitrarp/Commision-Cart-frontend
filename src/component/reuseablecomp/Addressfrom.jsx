
import React, { useState,useContext } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Usercontex from '../../contex/usercontex'
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Useraxios } from '../../axios';
import { Modal } from './Modal';

const logindetails=[
    {
     name:'AddressName',
     placeholder:"e.g. home,office etc",
     type:"text"
    },
    {
     name:'City',
     placeholder:"Enter Your City",
     type:"text"
    },
    {
     name:'PIN',
     placeholder:"Enter Your Mobile Number",
     type:"Number"
    },
    // {
    //  name:'Land Mark',
    //  placeholder:"Enter Your Land Mark",
    //  type:"textarea"
    // },
    
 ]
export const Addressfrom = ({id,onclose}) => {
    const [Userdetails,setUserdetails]=useState({id});
    const [Error,setError]=useState({})
   
     
    const validation = () => {
        const errors = {};
        if (!Userdetails.AddressName || Userdetails.AddressName.length <= 3) {
          errors.AddressName = "AddressName should be Require";
        }
        if (!Userdetails.City ) {
          errors.City = "City should be Require";
        }
        if (!Userdetails.PIN || Userdetails.PIN.length !==6) {
          errors.PIN = "PIN number should be 6 digits";
        }
        if (!Userdetails.Landmark ) {
          errors.Landmark = "Landmark should be Require";
        }
        setError(errors);
        return Object.keys(errors).length === 0; // Returns true if no errors
      };

      const setvalue=(e)=>{
        const {value,name} =e.target;
      
         setUserdetails((prev) => ({
             ...prev,[name]: value
           }));
        }

        const submit=async(e)=>{
            e.preventDefault();
            if(validation()){
               try {
                 const response=await Useraxios.post("user/addaddress",{Userdetails})
                    if(response.status==201){
                        toast.success(`${response.data.massage}`) 
                        onclose();
                    }
                 }
               catch (error) {
              console.log(error)
               }
            }
          }


  return (
  <>
        {
        logindetails.map((details,index)=>(
            <div className='flex flex-col gap-2 mb-4' key={index}>
            <label htmlFor={details.name} className='text-black  text-sm'> {details.name}</label>
            {Error[details.name] && (
                <span className="text-red-500 text-sm ">
                  {Error[details.name]}
                </span>
              )}
        <input type={details.type} name={details.name} className={`${
    Error[details.name]?
      "border-red-500 border":"text-blue-400 hover:shadow-md hover:shadow-blue-100 min-h-6 border-blue-400 border"} focus:outline-none p-2 rounded-lg placeholder:text-black placeholder:opacity-30 bg-white`} placeholder={details.placeholder} onChange={(e)=>setvalue(e)}/></div>
        ))
       }
<label className='text-black  text-sm'>Landmark</label><br />
<span className="text-red-500 text-sm ">
                  {Error.Landmark}
                </span>
    <textarea className={`${
    Error.Landmark?
      "border-red-500 border":"text-blue-400 hover:shadow-md hover:shadow-blue-100 min-h-6 border-blue-400 border"} focus:outline-none p-2 rounded-lg placeholder:text-black placeholder:opacity-30 bg-white w-full mt-2`}
      name='Landmark'
      onChange={(e)=>setvalue(e)}
      placeholder='e.g. landmark,city,state,pincode'
      >
    </textarea>
    <div className="flex justify-center items-center mt-6"><button className='px-5 py-2 uppercase border font-extrabold border-blue-400 text-blue-400 rounded-md mb-2' onClick={(e)=>submit(e)}>Submit</button></div>
   
</>
  )
}
