import react,{ createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const Usercontex=createContext();



export const Usercontextprovider = ({children}) => {
    const[User,setUser]=useState();
    useEffect(()=>{
        try {
            const token=localStorage.getItem("user");
            const decode=jwtDecode(token)
            if(decode.Number!=User?.Number&&!User){
                navigate("/signup");
            }
            setUser({Email:decode.Email,Phone:decode.Number,id:decode.id})
          } catch (error) {
            console.log(error)
          }
    },[])
  return (
    <Usercontex.Provider value={{User,setUser}} >
        {children}
    </Usercontex.Provider>
  )
}
export default Usercontex;