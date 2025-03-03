import axios from "axios";
 const baseurl="https://commision-cart-backend.onrender.com/api/v1/";
// const baseurl="http://192.168.245.172:8000/api/v1/";
  export const baseurlforimg="https://commision-cart-backend.onrender.com";
export const Productsaxios = axios.create({
  baseURL: `${baseurl}`, 
  headers: {
    "Content-Type": "application/json",
  },
});

export const Useraxios = axios.create({
  baseURL: `${baseurl}`, 
  headers: {
    "Content-Type": "application/json",
  },
});

export const Orderaxios=axios.create({
    baseURL:`${baseurl}`,
    headers:{
          "Content-Type": "application/json",
    }
});
export const Adminaxios=axios.create({
  baseURL:`${baseurl}admin`,
  headers:{
    "Content-Type": "application/json",
}
})
