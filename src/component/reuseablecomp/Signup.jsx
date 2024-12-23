import React, { useState,useContext } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Usercontex from '../../contex/usercontex'
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Useraxios } from '../../axios';


 const logindetails=[
    {
     name:'Name',
     placeholder:"Enter Your Name",
     type:"text"
    },
    {
     name:'Email',
     placeholder:"Enter Your Email",
     type:"email"
    },
    {
     name:'Number',
     placeholder:"Enter Your Mobile Number",
     type:"Number"
    },
    {
     name:'Password',
     placeholder:"Enter Your Password",
     type:"Password"
    },
    {
     name:'Referalid',
     placeholder:"Enter Your Referalid",
     type:"text"
    },
 ]
export const Signup = () => {
    const [Userdetails,setUserdetails]=useState({})
    const [Error,setError]=useState({})
    const {User,setUser}=useContext(Usercontex);
    const navigate=useNavigate()
    const setvalue=(e)=>{
       const {value,name} =e.target;
     
        setUserdetails((prev) => ({
            ...prev,[name]: value
          }));
    }
    const validation = () => {
      const errors = {};
      if (!Userdetails.Name || Userdetails.Name.length <= 3) {
        errors.Name = "Name should be more than 3 letters";
      }
      if (!Userdetails.Email || !/\S+@\S+\.\S+/.test(Userdetails.Email)) {
        errors.Email = "Enter a valid email address";
      }
      if (!Userdetails.Number || Userdetails.Number.length !== 10) {
        errors.Number = "Mobile number should be 10 digits";
      }
      if (!Userdetails.Password || Userdetails.Password.length < 6) {
        errors.Password = "Password should be at least 6 characters";
      }
      setError(errors);
      return Object.keys(errors).length === 0; // Returns true if no errors
    };
    const submit=async(e)=>{
      e.preventDefault();
      if(validation()){
         try {
           const res= await Useraxios.post("user/signup",{Userdetails})
           if(res.status==200){
            toast.success(`${res.data.message}`, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            localStorage.setItem("user",res.data.token)
            const decode=jwtDecode(res?.data?.token)
            setUser({Email:decode.Email,Phone:decode.Number,id:decode.id})
            navigate("/")
           }
         } catch (error) {
        console.log(error)
         }
      }
    }
  return (
    <div className='w-full h-[93vh] flex justify-center items-center '>
      <div className="form bg-white p-8 shadow-lg shadow-blue-200 border rounded-2xl">
        <p className='uppercase text-center font-extrabold text-2xl text-blue-400 mb-4 underline '>Sign up</p>
       {
        logindetails.map((details,index)=>(
            <div className='flex flex-col gap-2 mb-4' key={index}>
            <label htmlFor={details.name} className='text-blue-400 font-bold'> {details.name}</label>
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
       <div className="flex justify-center items-center mt-6"><button className='px-5 py-2 uppercase border font-extrabold border-blue-400 text-blue-400 rounded-md mb-2' onClick={(e)=>submit(e)}>Submit</button></div>
       <span >Already have an account? <Link to={"/login"} className='text-md text-blue-400 font-bold'>Log-in</Link> here!</span>
      </div>
    </div>
  )
}
