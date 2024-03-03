import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
export default function CategoriesSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        arrows:false
      };
    const [categories,setCategories] = useState([])
    async function getAllCategories () {
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        console.log(data.data);
        setCategories(data.data)
        
    }
    useEffect(()=>{
        getAllCategories()
    },[])
  return <>
  <div className='my-4'>
    <Slider {...settings}> 
    {categories.map((category,index)=>{
                        return <>
                        <img key={index} height={200} src={category.image} alt="" className='w-100'/>
                        <h6>{category.name}</h6>
                        </>              
    })}
    
    </Slider>

  </div>
  
  </>
}
