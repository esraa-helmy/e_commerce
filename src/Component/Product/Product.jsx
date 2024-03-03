import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { CartContext } from '../../AuthContext/CartContext';


function Product({ product }) {
    const {setCart} = useContext(CartContext)
    async function addProductToCart (productId) {
        const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            productId
        },
        {
            headers:{
                token: localStorage.getItem('token')

            }
        }
        )
        console.log(data);
        setCart(data)
        toast.success(data.message)
        
    }


    return (
    
            <div className="product overflow-hidden px-2 py-3 cursor-pointer">
                <Link to={'/productdetails/'+product.id} className='a'>
                    <img className='w-100' src={product.imageCover} alt="" />
                    <h5 className='font-sm text-main'>{product.category.name}</h5>
                    <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                    <p className='d-flex justify-content-between'>
                        <span >{product.price} EGP</span>
                        <span>
                            <i className='fas fa-star rating-color me-1'></i>
                            {product.ratingsAverage}
                        </span>
                    </p>
                </Link>
                <button onClick={function(){addProductToCart (product.id)}} className='btn bg-main text-white w-100 '>+Add To Cart</button>
            </div>
 
    )
}

export default Product