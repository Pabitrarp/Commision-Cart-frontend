import React from "react";
import { Route, Routes } from "react-router-dom";
import './index.css';
import userrouter from "./component/user/userroutes";
import adminroutes from "./component/admin/adminroutes";

import { Homepage } from "./component/user/Homepage";
import { Adminsignin } from "./component/admin/Adminsignin";
import { Dashboard } from "./component/admin/Dashboard";
import { Alluserlist } from "./component/admin/Alluserlist";
import { Order } from "./component/user/Order";

const App = () => {
  return (
    <Routes>
      {userrouter.map((user, index) => (
        <Route key={index} path={user.path} element={<user.Component />} />
      ))}

    {/* {adminroutes.map((admin, index) => (
      
        <Route key={index} path={admin.path} element={<admin.Component />} />
      ))} */}
       <Route path="/admin/login" element={<Adminsignin></Adminsignin>}/>
       <Route path="/admin/dashboard" element={<Dashboard></Dashboard>}/>
       <Route path="/admin/users" element={<Alluserlist></Alluserlist>}/>
       <Route path="/admin/orders" element={<Order/>}/>

      <Route path="/" element={<Homepage/>}></Route>
    </Routes>
  );
};

export default App;
