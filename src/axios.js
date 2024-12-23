import axios from "axios";
 const baseurl="http://localhost:8000/api/v1/";
// const baseurl="http://192.168.245.172:8000/api/v1/";
  export const baseurlforimg="http://localhost:8000";
export const Productsaxios = axios.create({
  baseURL: `${baseurl}`, // Ensure `baseurl` is defined earlier in your code
  headers: {
    "Content-Type": "application/json",
  },
});

export const Useraxios = axios.create({
  baseURL: `${baseurl}`, // Ensure `baseurl` is defined earlier in your code
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
