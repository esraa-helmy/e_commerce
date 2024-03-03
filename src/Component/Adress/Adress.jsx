
import axios from 'axios'
import { useFormik, yupToFormErrors } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup'
import { authContext } from '../../AuthContext/AuthContext';


export default function Adress() {
  let [errorMsg,setErrorMag] = useState('');
  let [isLoading,setIsLoading] = useState(false)
  let {cartId} = useParams()
  console.log(cartId);
  const userData= {
    details:"",
    phone:"",
    city:""
    
  }

  const validate = Yup.object({
  
    details:Yup.string().required("Details Is Required"),
    city:Yup.string().required("City Is Required"),
    phone:Yup.string().required("Phone Is Required").matches(/^01[0125][0-9]{8}$/,"Enter Valid Phone Number"),
    
  })
  async function onSubmit (values) {
    console.log(values);
    setIsLoading(true)
    setErrorMag('')
    try {
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
            shippingAddress:values
        },{
            headers:{
                token:localStorage.getItem('token')
            },
            params:{
                url:'http://localhost:3000'
            }
        })
        console.log(data);
        console.log(data.session.url);
        window.open(data.session.url,'_self')
      
      
    } catch (error) {
    
      setErrorMag(error.response.data.message)
     
    }
    setIsLoading(false)
   
    
  }
  const registerFormik = useFormik({
    initialValues:userData,
    onSubmit:onSubmit,
    validationSchema: validate
 
  })
  return <>
    <div className="container mt-5">
        <div className="col-md-9 m-auto">
          <h1>Address:</h1>
        <form onSubmit={registerFormik.handleSubmit}>
        
        <label htmlFor="details">Details : </label>
        <input onBlur={registerFormik.handleBlur}  onChange={registerFormik.handleChange} value={registerFormik.values.details} className='form-control mb-2' type="text" name="details" id="details" />
        {registerFormik.errors.details && registerFormik.touched.details?  <div className='alert alert-danger'>{registerFormik.errors.details}</div> : ""}
        
        <label htmlFor="city">City : </label>
        <input onBlur={registerFormik.handleBlur}  onChange={registerFormik.handleChange} value={registerFormik.values.city} className='form-control mb-2' type="text" name="city" id="city" />
        {registerFormik.errors.city && registerFormik.touched.city?  <div className='alert alert-danger'>{registerFormik.errors.city}</div> : ""}
        
        <label htmlFor="phone">Phone : </label>
        <input onBlur={registerFormik.handleBlur}  onChange={registerFormik.handleChange} value={registerFormik.values.phone} className='form-control mb-2' type="text" name="phone" id="phone" />
        {registerFormik.errors.phone && registerFormik.touched.phone?  <div className='alert alert-danger'>{registerFormik.errors.phone}</div> : ""}
        
      { errorMsg && <div className='alert alert-danger'>{errorMsg}</div>}
        {isLoading? <button disabled type='button' className='btn bg-main px-3 mb-4 text-white ms-auto d-block'> <i className='px-3 fas fa-spin fa-spinner'></i> </button>:
        <button type='submit'disabled = {!registerFormik.isValid || isLoading } className='btn mb-4 bg-main px-3 text-white ms-auto d-block'>Register</button>}
        
    
        </form>

        </div>
        
        
    </div>
    </>
    
  
}

