import React, { useContext } from 'react'
import { authContext } from '../../AuthContext/AuthContext';
import LogIn from '../LogIn/LogIn';

export default function ProtectedRoute({children}) {
    let {setUserIsLoggedIn, userIsLoggedIn} = useContext(authContext);
  return <>
  {/* {children} */}
  {userIsLoggedIn? children :<LogIn/>}
  
  </>
}
