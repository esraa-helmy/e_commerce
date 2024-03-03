import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { CartContext } from '../../AuthContext/CartContext';

export default function Cart() {
  const [cart,setCart] = useState([]);
  const [cartId,setCartId] =useState()
  const {setCart:contextSetCart} = useContext(CartContext)
  async function getLoggedCart () {
    try {
      const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
        token:localStorage.getItem('token')
      }
    })
    console.log(data);
    setCartId(data.data._id)
    setCart(data)
  
      
    } catch (error) {
      console.log(error);
      
    }
  }
  function removeProductFromCart(productId){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed) {
        const {data} = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/'+ productId , {
      headers:{
        token: localStorage.getItem('token')
      }
    })
    console.log(data)
    console.log(productId);
    // toast.success(data.status)
    setCart(data)
    contextSetCart(data)
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
    

  }
   async function clearCart(){
    const {data} = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/', {
      headers:{
        token: localStorage.getItem('token')
      }
    })
    console.log(data)
    toast.success(data.message)
    
    setCart(data)
    contextSetCart()

  }
  async function updateCart(productId,count){
    if (count == 0) {
      removeProductFromCart(productId)
      
    }else{
      const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/cart/'+productId , {
      count
    },
    {
      headers:{
        token:localStorage.getItem('token')
      }
    })
    console.log(data);
    
    setCart(data)
    }
  }
  useEffect(()=>{
    getLoggedCart()
  },[])
  return <>
 {/* {console.log(cart.data.products.length)}
 {cart.data?.products.length>0?  */}
    <h2 className='alert alert-warning text-center my-5'>No products in your cart</h2>
  <div className='my-5'>
      <button onClick={clearCart} className='btn btn-outline-danger d-block ms-auto'>Clear Cart</button>
      
      {cart.data?.products.map((product)=>{
        return <div className="cart-product shadow rounded-2 my-3">
        <div className="row align-items-center">
          <div className="col-md-2">
            <img className='w-100' src={product.product.imageCover} alt="" />
          </div>
          <div className="col-md-8">
            <h2>{product.product.title}</h2>
            <h5>{product.product.category.name}</h5>
            <p className='d-flex justify-content-between'>
              <span>{product.price} EGP</span>
              <span><i className=' fas fa-star rating-color me-1'></i> {product.product.ratingsAverage}</span>
            </p>
            <p><span className='fw-bolder'>Total Price:</span> {product.count * product.price} EGP</p>
          </div>
          <div className="col-md-2">
            <button onClick={()=>{removeProductFromCart(product.product._id)}} className='btn text-danger' >Remove</button>
            <div className="d-flex align-items-center">
              <button onClick={()=>{updateCart(product.product._id,product.count - 1)}}  className='btn bg-main text-white mx-2'>-</button>
              <span>{product.count}</span>
              <button onClick={()=>{updateCart(product.product._id,product.count + 1)}}  className='btn bg-main text-white mx-2'>+</button>
            </div>
          </div>
        </div>
      </div>

      })}

      

      <div className='d-flex justify-content-between'>
        <Link to={'/address/'+cartId} className='btn bg-main text-white'>CheckOut</Link>
        <p>Total cart Price: {cart.data?.totalCartPrice} EGP</p>
      </div>

    </div> 
 
 
  
 
  
  
  
   
    
  </>
    
   

}
