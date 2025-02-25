import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyCartProvider } from './contex/usercart';
import { Usercontextprovider } from './contex/usercontex.jsx';
import { Admincontex } from './contex/admincontex.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
     <Admincontex>
     <Usercontextprovider>
      <MyCartProvider>
        <App />
      </MyCartProvider>
    </Usercontextprovider>
      <ToastContainer />
     </Admincontex>
    </Router>
  </React.StrictMode>,
)
