import axios from 'axios'
import { useFormik, yupToFormErrors } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'


export default function Register() {
  let [errorMsg,setErrorMag] = useState('');
  let [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  const userData= {
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
  }

  const validate = Yup.object({
    name:Yup.string().required("Name Is Required").min(3,"Minim length must be 3 characters").max(20,"Max length must be 20 characters"),
    email:Yup.string().required("Email Is Required").matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,"Enter Valid Email"),
    password:Yup.string().required("Password Is Required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,"Minimum eight characters, at least one letter, one number and one special character"),
    rePassword:Yup.string().required("rePassword Is Required").oneOf([Yup.ref('password')]),
    phone:Yup.string().required("Phone Is Required").matches(/^01[0125][0-9]{8}$/,"Enter Valid Phone Number"),
   
  })
  async function onSubmit (values) {
    setErrorMag('')
    try {
      setIsLoading(true)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
      console.log(data)
      if (data.message=='success') {
        
      }
      navigate('/logIn')
      
    } catch (error) {
      console.log(error.response.data.message)
      setErrorMag(error.response.data.message)
      console.log(errorMsg);
      
    }
    setIsLoading(false)
   
    
  }
  const registerFormik = useFormik({
    initialValues:userData,
    onSubmit:onSubmit,
    validationSchema: validate
 
  })
  return (
    <div className="container mt-5">
      <div className="col-md-9 m-auto">
        <h1>Register Now:</h1>
      <form onSubmit={registerFormik.handleSubmit}>
      <label htmlFor="name">Name : </label>
      <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.name} className='form-control mb-2' type="text" name="name" id="name" />
      {registerFormik.errors.name && registerFormik.touched.name?  <div className='alert alert-danger'>{registerFormik.errors.name}</div> : ""}

      <label htmlFor="email">Email : </label>
      <input onBlur={registerFormik.handleBlur}  onChange={registerFormik.handleChange} value={registerFormik.values.email} className='form-control mb-2' type="email" name="email" id="email" />
      {registerFormik.errors.email && registerFormik.touched.email?  <div className='alert alert-danger'>{registerFormik.errors.email}</div> : ""}
      <label htmlFor="phone">Phone : </label>
      <input onBlur={registerFormik.handleBlur}  onChange={registerFormik.handleChange} value={registerFormik.values.phone} className='form-control mb-2' type="text" name="phone" id="phone" />
      {registerFormik.errors.phone && registerFormik.touched.phone?  <div className='alert alert-danger'>{registerFormik.errors.phone}</div> : ""}
      <label htmlFor="password">Password : </label>
      <input onBlur={registerFormik.handleBlur}  onChange={registerFormik.handleChange} value={registerFormik.values.password} className='form-control mb-2' type="password" name="password" id="password" />
      {registerFormik.errors.password && registerFormik.touched.password?  <div className='alert alert-danger'>{registerFormik.errors.password}</div> : ""}
      <label  htmlFor="rePassword">RePassword : </label>
      <input onBlur={registerFormik.handleBlur}  onChange={registerFormik.handleChange} value={registerFormik.values.rePassword} className='form-control mb-2' type="password" name="rePassword" id="rePassword" />
      {registerFormik.errors.rePassword && registerFormik.touched.rePassword?  <div className='alert alert-danger'>{registerFormik.errors.rePassword}</div> : ""}
     { errorMsg && <div className='alert alert-danger'>{errorMsg}</div>}
      {isLoading? <button disabled type='button' className='btn bg-main px-3 mb-4 text-white ms-auto d-block'> <i className='px-3 fas fa-spin fa-spinner'></i> </button>:
      <button type='submit'disabled = {!registerFormik.isValid || isLoading } className='btn mb-4 bg-main px-3 text-white ms-auto d-block'>Register</button>}
      
   
      </form>

      </div>
      
      
    </div>
  )
}
