import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product';
import Slider from "react-slick";
import slider1 from '../../images/slider-image-1.jpeg';
import slider2 from '../../images/slider-image-2.jpeg';
import slider3 from '../../images/slider-image-3.jpeg'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';


export default function Home() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  const[products , setProduct]=useState([])
 async function getAllProduct () {
  const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  console.log(data.data);
  setProduct(data.data)
  }
  useEffect(()=>{
    getAllProduct () 
  },[])

  return <>
    <div className="row g-0">
      <div className="col-md-9">
        <Slider {...settings}>

          <img src={slider2} height={500} alt="slider1" className='w-100'/>
          <img src={slider1} height={500} alt="slider2" className='w-100'/>
          <img src={slider3} height={500} alt="slider3" className='w-100'/>
                
        </Slider>
      </div>
      <div className="col-md-3">
      <img src={slider1} height={250} alt="slider2" className='w-100'/>
      <img src={slider3} height={250} alt="slider3" className='w-100'/>
      </div>
    </div>
    <CategoriesSlider/>
    <div className="row">
      {products.map((product)=>{
        return <>
            <div key={product.id} className="col-md-3" >
            <Product product={product}/>

            </div>
        
        </>
      })}
      
    </div>
  </>
}
