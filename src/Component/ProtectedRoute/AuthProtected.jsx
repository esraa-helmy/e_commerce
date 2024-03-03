import React, { useContext } from 'react'
import Home from '../Home/Home';
import { authContext } from '../../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthProtected({children}) {
    const navigate =useNavigate()
    let {setUserIsLoggedIn, userIsLoggedIn} = useContext(authContext);
  return <>
        {userIsLoggedIn? navigate('/home') :children}

  </>
}
