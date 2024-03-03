import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Brands() {
  const [brands,setBrands] = useState([])
  const [specificBrand,setSpecificBrand] = useState([])
    async function getAllBrand () {
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
        console.log(data.data);
        setBrands(data.data)
        
    }
    async function getSpecificBrand(brandId){
      console.log(brandId);
      const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands/'+brandId)
        console.log(data.data);
        setSpecificBrand(data.data)
        
        
    }
    useEffect(()=>{
        getAllBrand()
    },[])
  return (
   <>
   <div className="row g-4 my-3">
   {brands.map((brand,index)=>{
                        return <>
                          <div key={index} className="col-md-3 ">
                            <div key={index} onClick={()=>{getSpecificBrand(brand._id)}} className="card"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                              <div className="card-img">
                              <img key={index}  src={brand.image} alt="" className='w-100'/>

                              </div>
                            
                            <p className=' text-center my-3' >{brand.name}</p>
                            </div>
                         
                          </div>



                         
                       
                        
                        </>              
    })}
    
   </div>
   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <div className="row ">
              <div className="container d-flex align-items-center justify-content-between">
              <div className='title'>
                <h2 className='text-success  text-center mb-3 fw-bolder'><b className='text-success  text-center mb-3 fw-bolder'>{specificBrand.name}</b></h2>
                <p>{specificBrand.slug}</p>

              </div>
              <div className="brand-image">
                <img src={specificBrand.image} className='w-100' />
              </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            {/* <button type="button" class="btn btn-primary">Save changes</button> */}
          </div>
        </div>
      </div>
    </div>
   </>
  )
}
