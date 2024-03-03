import React, { useContext } from 'react';
import logo from '../../images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../AuthContext/AuthContext';
import { CartContext } from '../../AuthContext/CartContext';


export default function Navbar() {
    const navigate = useNavigate()

    let {setUserIsLoggedIn, userIsLoggedIn} = useContext(authContext);
    const {cart} = useContext(CartContext)
    function SignOut(){
        setUserIsLoggedIn(false)
        localStorage.removeItem('token');
        navigate('/LogIn')

    }
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container">
        
        <Link className="navbar-brand" to="#">
            <img src={logo} alt="Fresh Cart Logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {userIsLoggedIn && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="home">Home</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="cart">Cart</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="product">Products</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="categories">Categories</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="brand">Brands</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="allorders">Orders</Link>
            </li>
            
            
        </ul>}
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
        <li className="nav-item">
            <ul className='navbar-nav'>
            <li className='me-2' ><i class="fa-solid fa-cart-shopping position-relative fs-3">
                <span style={{fontSize:12}} className='p-1 position-absolute top-0 start-100 translate-middle bg-success  text-white rounded-circle'>{cart?.numOfCartItems}</span>
                </i></li>
                <li className='me-2' ><i className="fa-brands fa-instagram"></i></li>
                <li className='me-2' ><i className="fa-brands fa-facebook"></i></li>
                <li className='me-2' ><i className="fa-brands fa-tiktok"></i></li>
                <li className='me-2' ><i className="fa-brands fa-twitter"></i></li>
                <li className='me-2' ><i className="fa-brands fa-linkedin"></i></li>
                <li className='me-2' ><i className="fa-brands fa-youtube"></i></li>
            </ul>
            </li>
            {
                userIsLoggedIn? <li className="nav-item">
                <div onClick = {SignOut} className="nav-link" >SignOut</div>
                </li> :  <>
            <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/logIn">Login</Link>
            </li>
            
            </>
            }
           
            
            
            
            
        </ul>
        </div>
    </div>
    </nav>
  </>
}
