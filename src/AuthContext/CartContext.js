import axios from "axios";
import { createContext, useEffect, useState } from "react";





export const CartContext = createContext()
export default function CartContextProvider ({children}) {
    const [userIsLoggedIn , setUserIsLoggedIn]=useState()
    const [cart,setCart] = useState([]);
    async function getLoggedCart () {
        try {
          const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
          headers:{
            token:localStorage.getItem('token')
          }
        })
        console.log(data);
       
        setCart(data)
      
          
        } catch (error) {
          console.log(error);
          
        }
      }
      useEffect(()=>{
        getLoggedCart()
      },[])
  
    return <CartContext.Provider value={{cart,setCart}}>

        {children}

    </CartContext.Provider>
    
}