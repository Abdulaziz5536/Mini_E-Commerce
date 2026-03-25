import { useState,useEffect } from "react";
import Navbar from "../Navbar";



export default function Cart(){

  const [cart,setCart] = useState([]);

   useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem("cart"));
  
      if(savedCart){
        setCart(savedCart);
      }
    },[]);

    const removeItem = (index) => {
      const updatedCart = cart.filter((item, i) => i !== index);

        setCart(updatedCart);

       localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

     return(
    <div>

      <Navbar />

      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        cart.map((item,index) => (
          <div key={index}>
            <img src={item.image} width="120"/>
            <h3>{item.productName}</h3>
            <p>Price: {item.price} TL</p>
            <button onClick={() => removeItem(index)}>X</button>
            <hr />
          </div>
        ))
      )}

    </div>
  )
}