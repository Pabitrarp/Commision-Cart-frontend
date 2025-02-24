
import { Homepage } from "./Homepage";
import { Productdetailspage } from "./Productdetailspage";
import Cart from "./Cart";
import { Profile } from "./Profile";
import { Signup } from "../reuseablecomp/Signup";
import { Login } from "../reuseablecomp/Login";
import { Walet } from "./Walet";
import { Order } from "./Order";

const userrouter = [
  {
    path: "/dashboard",
    Component: Homepage, 
  },
  {
    path: "/products/:catagoryname/:id",
    Component: Productdetailspage, 
  },
  {
    path:"/mycart",
    Component: Cart, 
  },
  {
    path:"/myprofile",
    Component: Profile, 
  },
  {
    path:"/signup",
    Component: Signup, 
  },
  {
    path:"/login",
    Component: Login, 
  },
  {
    path:"/mywallet",
    Component: Walet, 
  },
  {
    path:"/myorders",
    Component: Order, 
  },
];

export default userrouter;
