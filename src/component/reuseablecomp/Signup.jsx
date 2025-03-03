import React, { useState,useContext } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Usercontex from '../../contex/usercontex'
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Useraxios } from '../../axios';
import mainlogo from "../../assets/mainlogo.png"
import { Loading } from './Loading';
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
    const [Load,setLoad]=useState(false);
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
           setLoad(true);
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
            setLoad(false);
            navigate("/")
           }
         } catch (error) {
          setLoad(false)
        console.log(error)
         }
      }
    }
    if(Load){
      return <Loading></Loading>
    }
  return (
    <div className='w-full  flex justify-center items-center py-10 bg-gradient-to-l from-cyan-200 via-cyan-300 to-cyan-300'>
      <div className="form  p-8 shadow-xl  rounded-2xl   bg-opacity-50">
        <div className='flex flex-col justify-center items-center mb-4 gap-2'>
                <img src={mainlogo} alt=""  className='w-24 h-24 rounded-full'/>
                <p className='uppercase text-green-500  text-xl font-extrabold italic  px-3 py-2 rounded-md shadow-sm  bg-white  '>Success Road</p>
                </div>

        <p className='uppercase text-center font-extrabold text-2xl text-white mb-4  opacity-90 bg-gray-600 py-1 rounded-lg shadow-sm shadow-black bg-opacity-50'>Sign up</p>
       {
        logindetails.map((details,index)=>(
            <div className='flex flex-col gap-2 mb-4' key={index}>
            <label htmlFor={details.name} className='text-white font-bold  drop-shadow-2xl '> {details.name}</label>
            {Error[details.name] && (
                <span className="text-red-500 text-sm ">
                  {Error[details.name]}
                </span>
              )}
        <input type={details.type} name={details.name} className={`${
    Error[details.name]?
      " bg-red-500 text-white":"text-white hover:py-3  min-h-6"} focus:outline-none p-2 rounded-lg placeholder:text-white placeholder:opacity-70  bg-gray-700 bg-opacity-50 shadow-sm shadow-black text-lg font-bold placeholder:font-thin`} placeholder={details.placeholder} onChange={(e)=>setvalue(e)}/></div>
        ))
       }
       <div className="flex justify-center items-center mt-6"><button className='px-5 py-2 uppercase  font-extrabold  text-white rounded-md mb-2 bg-gray-700 bg-opacity-50 shadow-sm shadow-black' onClick={(e)=>submit(e)}>Submit</button></div>
       <span  className='text-gray-600 opacity-90'>Already have an account? <Link to={"/login"} className='text-md text-blue-500 font-bold'>Log-in</Link> here!</span>
      </div>
    </div>
  )
}
