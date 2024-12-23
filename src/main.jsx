import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyCartProvider } from './contex/usercart';
import { Usercontextprovider } from './contex/usercontex.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Usercontextprovider>
      <MyCartProvider>
        <App />
      </MyCartProvider>
    </Usercontextprovider>
      <ToastContainer />
    </Router>
  </React.StrictMode>,
)
