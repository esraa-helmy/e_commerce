import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Categories() {
  const [categories,setCategories] = useState([])
    async function getAllCategory () {
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        console.log(data.data);
        setCategories(data.data)
        
    }
    useEffect(()=>{
        getAllCategory()
    },[])
  return (
   <>
   <div className="row g-4 my-3">
   {categories.map((category,index)=>{
                        return <>
                          <div className="col-md-4">
                            <div className="card">
                              <div className="card-img">
                              <img key={index} height={300} src={category.image} alt="" className='w-100'/>

                              </div>
                            
                            <h2 className='text-success h3 text-center my-3' style={{fontWeight:'bold'}}>{category.name}</h2>
                            </div>
                         
                          </div>
                       
                        
                        </>              
    })}
    
   </div>
   </>
  )
}
