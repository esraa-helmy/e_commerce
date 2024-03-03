import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import Register from './Component/Register/Register';
import LogIn from './Component/LogIn/LogIn';
import NotFound from './Component/NotFound/NotFound';
import Home from './Component/Home/Home';
import Cart from './Component/Cart/Cart';
import Product from './Component/Product/Product';
import Categories from './Component/Categories/Categories';
import Brand from './Component/Brand/Brand';
import AuthContextProvider from './AuthContext/AuthContext';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import AuthProtected from './Component/ProtectedRoute/AuthProtected';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import Adress from './Component/Adress/Adress';
import AllOreders from './Component/Orders/AllOreders';
import CartContextProvider from './AuthContext/CartContext';

function App() {
  const router = createBrowserRouter([
    {path:"", element:<Layout/> , children:[
      {path:"register", element:<AuthProtected><Register/></AuthProtected>},
      {path:"logIn", element:<AuthProtected><LogIn/></AuthProtected>},
      {path:"home", element: <ProtectedRoute><Home/></ProtectedRoute> },
      {path:"/", element: <ProtectedRoute><Home/></ProtectedRoute> },
      {path:"cart", element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"product", element:<ProtectedRoute><Product/></ProtectedRoute>},
      {path:"categories", element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:"brand", element:<ProtectedRoute><Brand/></ProtectedRoute>},
      {path:"allorders", element:<ProtectedRoute><AllOreders/></ProtectedRoute>},
      {path:"address/:cartId", element:<ProtectedRoute><Adress/></ProtectedRoute>},
      {path:"productdetails/:id", element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:"*", element:<NotFound/>},
    ]}
  ])
  return <>
  
  <AuthContextProvider>
  <CartContextProvider>
  <RouterProvider router={router}/>

  </CartContextProvider>
    

  </AuthContextProvider>
  <ToastContainer/>
 
  </>
}

export default App;
