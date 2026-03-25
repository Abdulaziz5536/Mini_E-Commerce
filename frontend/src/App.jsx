import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AddProduct from "./pages/admin/AddProducts"
import PrivateRoute from "./PrivateRoute"
import ProductDetails from "./ProductDetails"
import Cart from "./pages/Cart"



export default function App(){
  return (

    <>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/home" element={<Home />}> </Route>
      <Route path="/admin" element={<PrivateRoute><AddProduct /></PrivateRoute>}></Route>
      <Route path="/product/:id" element={<ProductDetails></ProductDetails>}></Route>
      <Route path="/cart" element={<Cart />}></Route>

      
    </Routes>
    </>
    
    
    
  )
}
