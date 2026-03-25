import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/home-style.css';
import Navbar from "../Navbar";

export default function Home(){

  const [products,setProducts] = useState([]);
  const [cart,setCart] = useState([]);
  const [message,setMessage] = useState("");  
  
  
  
  
  const navigate = useNavigate();

  useEffect(() => {

    const fetchProducts = async () => {
      const res = await fetch("http://localhost:3000/product/list");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  },[]);

  const addToCart = async (e,product) => {
    e.stopPropagation();

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = ([...existingCart,product]);
    
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    

  }

 


  return(
  <div className="container">
    <Navbar />
    
  

<div className="products-grid">
  {products.map((product) => (<div key={product._id} className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
    <img src={product.image} width="200"></img>
    <h3>{product.productName}</h3>
    <p className="price">price: {product.price} tl</p>
    <button className="add-to-cart" onClick={(e) => addToCart(e,product)}>ADD TO CART</button>
    
   </div>))}
   
   
</div>
  
  

  </div>
  )

}
