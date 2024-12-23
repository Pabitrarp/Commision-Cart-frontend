import react ,{ createContext, useState } from "react";

  const Mycart=createContext();

 export const MyCartProvider=({children})=>{
    const [cart,setCart]=useState([]);
    
    const addcart=(value)=>{
        if (cart.some((item) => item.id === value.id)) {
            // Update quantity of the existing item
            setCart((prev) => 
                prev.map((item) =>
                    item.id === value.id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                )
            );
        } else{
        setCart((prev)=>[...prev,value])
        }
    }
    const remove=(value)=>{
        setCart(()=>cart.filter((cart)=>cart.id!= value.id))
    }
    const empty=()=>{
        setCart([])
    }
    const incrementquantity=(value)=>{
        setCart((pre)=>pre.map((item)=>item.id==value.id&&item.quantity>0?{...item,quantity:value.quantity+1}:item))
    }
    const decrementquantity=(value)=>{
        setCart((pre)=>pre.map((item)=>item.id==value.id&&item.quantity>0?{...item,quantity:value.quantity-1}:item))
    }
    return(
        <Mycart.Provider value={{addcart,remove,empty,setCart,cart,incrementquantity,decrementquantity}} >
            {children}
        </Mycart.Provider>
    );
}
export default Mycart;