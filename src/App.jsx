import React from "react";
import { Route, Routes } from "react-router-dom";
import './index.css';
import userrouter from "./component/user/userroutes";
import adminroutes from "./component/admin/adminroutes";

import { Homepage } from "./component/user/Homepage";

const App = () => {
  return (
    <Routes>
      {userrouter.map((user, index) => (
        <Route key={index} path={user.path} element={<user.Component />} />
      ))}

    {adminroutes.map((admin, index) => (
      
        <Route key={index} path={admin.path} element={<admin.Component />} />
      ))}

      <Route path="/" element={<Homepage/>}></Route>
    </Routes>
  );
};

export default App;
