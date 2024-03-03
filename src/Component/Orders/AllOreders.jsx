import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'

export default function AllOreders() {
    const [orders,setOrders]= useState([])
    
    async function getAllOrders(id){
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/'+id)
        console.log(data);
        setOrders(data)
    }
    useEffect(()=>{
        const {id} = jwtDecode(localStorage.getItem('token'))
        console.log(id);
        getAllOrders(id)
    },[])
  return (
    <>
    <h1>Your Orders</h1>
    {orders.map((order)=>{
        return<div key={order.id} className="row">
        <div className="order shadow py-4 my-5 rounded">
            <div className="d-flex align-items-center">
                <h2 className='fw-border h1'>#{order.id}</h2>
                <h4 className='fw-bolder text-primary mx-4'>Processing</h4>

            </div>
            <p>You have ordered {order.cartItems.length}</p>
            <div className="d-flex">
                {order.cartItems.map((item)=>{
                    return <img src={item.product.imageCover}  style={{width:150}} />
                })}
            </div>
            <hr />
            <p> <strong>Total amount : </strong>{order.totalOrderPrice} EGP</p>

        </div>
    </div>
    })}
    
    </>
  )
}
