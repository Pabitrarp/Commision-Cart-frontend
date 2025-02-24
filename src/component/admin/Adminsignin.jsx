import React ,{useContext, useState}from 'react'
import { Adminaxios } from '../../axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import Admin from '../../contex/admincontex';
const logindetails=[
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
    
 ]


export const Adminsignin = () => {
    const [Userdetails,setUserdetails]=useState({});
    const [Error,setError]=useState({});
    const navigate =useNavigate();
    const {setadmin}=useContext(Admin)
 const setvalue=(e)=>{
    const {name,value}=e.target;
    setUserdetails((prev)=>({...prev,
        [name]:value
    }));
 }
 const validation=()=>{
    const errors={}
    if (!Userdetails.Number || Userdetails.Number.length !== 10) {
        errors.Number = "Mobile number should be 10 digits";
      }
      if (!Userdetails.Password || Userdetails.Password.length < 6) {
        errors.Password = "Password should be at least 6 characters";
      }
      setError(errors);

  return Object.keys(errors).length===0;
 }
 const submit=async(e)=>{
    e.preventDefault();
    if(validation()){
        try {
            const res= await Adminaxios.post("signin",{Userdetails})
            if(res.status==200){
             toast.success(`${res.data.massege}`,{
               position: "top-center",
               autoClose: 1000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
             });
             localStorage.setItem("admin",res.data.token)
             const decode=jwtDecode(res?.data?.token)
             setadmin({Phone:decode?.Number,id:decode?.id})
             navigate("/admin/dashboard")
            }
          } catch (error) {
            toast.error(`${error?.response?.data?.massege}`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
         console.log(error)
          }
    }
 }

  return (
    <div className='w-full h-[93vh] flex justify-center items-center '>
      <div className="form bg-white p-8 shadow-lg shadow-blue-200 border rounded-2xl">
        <p className='uppercase text-center font-extrabold text-2xl text-blue-400 mb-4 underline '>Log-in</p>
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
     
      </div>
    </div>
  )
}
