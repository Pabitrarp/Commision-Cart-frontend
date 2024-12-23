import React,{useContext,useState} from 'react'
import { TiThMenu } from "react-icons/ti";
import { SlMenu } from "react-icons/sl";
import { FaBagShopping } from "react-icons/fa6";
import Mycart from '../../contex/usercart';
import { Link } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { MdPerson3 } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export const Navbar = () => {
    const {cart}=useContext(Mycart);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate=useNavigate();
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    const logout=()=>{
      localStorage.clear();
      toast.success(`Log-out successfully`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/login")
    }
  return (
   <div className="sticky  top-0 z-50 ">
     <div className="header p-4 flex items-center justify-center bg-white sticky top-0 border shadow-sm shadow-blue-200" >
                  <div  className="absolute left-4 text-2xl"  onClick={toggleMenu}>
                    {isMenuOpen?<IoCloseOutline className='text-3xl'/>:<SlMenu/>}
                  </div>
                  <div className="text-xl font-bold ">
                    sr
                  </div>
                  <Link to="/mycart" className="absolute right-5">
                    <FaBagShopping className="text-3xl"  />
                    {cart.length>0&&<span className='absolute -top-2 -right-2   rounded-full bg-blue-400 text-white font-extrabold min-w-6 min-h-6 text-center flex justify-center items-center shadow-blue-400 shadow-sm text-sm'>{cart.length}</span>}
                  </Link>
                </div>
                {isMenuOpen && (
        <div className= {`flex flex-col p-4 bg-blue-50 border-t w-52 h-[100vh] absolute transform transition-transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } duration-1000 ease-in-out border-t-0 border-blue-400 shadow-md shadow-blue-400`}>
          <div className=" text-lg  max-w-40 overflow-hidden text-ellipsis font-bold text-center">Welcome !</div>
          <div className="text-lg  max-w-48 overflow-hidden text-ellipsis font-semibold text-center">Pabitra moharana</div>
          <hr  className='border w-full border-black opacity-20 my-4'/>
          <div className="text-lg"></div>
          <Link to="/myprofile" className="py-2 text-lg uppercase flex gap-3 items-center hover:font-extrabold"><MdPerson3 className='text-2xl'/> profile</Link>
          <Link to="mywallet" className="py-2 text-lg uppercase flex gap-3 items-center hover:font-extrabold"><FaWallet className="text-2xl"/>Wallet</Link>
          <Link to="/myorders" className="py-2 text-lg uppercase flex gap-3 items-center hover:font-extrabold">< HiMiniShoppingCart className="text-2xl"/>orders</Link>
          <hr  className='border w-full border-black opacity-20 mt-4'/>
          <div className="py-2 text-sm  flex  items-center justify-center mt-10"><button className='uppercase border hover:border-red-400 p-3 rounded-lg hover:text-red-400 font-bold border-blue-400 text-blue-400 shadow-inner shadow-blue-400 hover:shadow-none'onClick={logout}>log-out</button></div>
        </div>
      )}
   </div>
  )
}