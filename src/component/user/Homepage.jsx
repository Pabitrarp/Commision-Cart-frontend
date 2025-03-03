import React,{useState,useEffect, useContext} from 'react'
import { Navbar } from '../reuseablecomp/Navbar'
import {Crousal} from "../crousal"
import { Catagory } from '../Catagory'
import { Productscard } from '../reuseablecomp/Productscard'
import { useNavigate } from 'react-router-dom'
import Usercontex from '../../contex/usercontex'
import { jwtDecode } from 'jwt-decode'
import { Productsaxios } from '../../axios'
import { Modal } from '../reuseablecomp/Modal'
import { Loading } from '../reuseablecomp/Loading'
 


export const Homepage = () => {
  const [allproducts,setallproducts]=useState([]);
  const navigate=useNavigate();
  const [Load,setLoad]=useState(false);
  const {User,setUser}=useContext(Usercontex);
  useEffect(()=>{
    const token=localStorage.getItem("user");
    if(!token){
      navigate("/signup")
    }else{
      try {
        const decode=jwtDecode(token)
        
        if(decode.Number!=User?.Number&&!User){
            navigate("/signup");
        }
      
      } catch (error) {
        console.log(error)
      }
     
    }
    const getproducts=async()=>{
      setLoad(true);
      try {
        const res= await Productsaxios.get("products/allproducts");
        if(res.status===200){
          setallproducts(res.data)
          setLoad(flase)
        }
      } catch (error) {
        console.log(error)
        setLoad(false)
      }
    }
    getproducts();
    

  },[])
  if(Load){
    return <Loading></Loading>
  }
  return (
<div className=' h-full '>
    <Navbar></Navbar>
    <Crousal></Crousal>
    <Catagory></Catagory>
    <Productscard allproducts={allproducts}></Productscard>
    
</div>

  )
}
