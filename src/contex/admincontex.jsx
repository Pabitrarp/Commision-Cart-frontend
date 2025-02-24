 import React, { createContext, useContext ,useState} from 'react'
  const Admin=createContext();
 export const Admincontex = ({children}) => {
    const [admin, setadmin] = useState('');

   return (
     <Admin.Provider  value={{admin,setadmin}}>
        {children}
     </Admin.Provider>
   )
 }
export default Admin;
