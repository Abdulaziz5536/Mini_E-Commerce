import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './admin-style.css';

export default function AddProduct() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/product/list");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const handleAddProduct = async (e) => {
    e.preventDefault();

    
   

    const user = JSON.parse(localStorage.getItem("userInfo"));
    const res = await fetch("http://localhost:3000/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ productName, price, description, image, stock }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message);
      setProducts((prev) => [...prev, data.product]); 

      
      setProductName("");
      setPrice("");
      setDescription("");
      setImage("");
      setStock("");
    } else {
      setMessage(data.error);
    }
  };

  
  const removeProduct = async (id) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const res = await fetch(`http://localhost:3000/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } else {
      console.error("Delete failed:", data);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem("userInfo"); 
          navigate("/login");
        }}
      >
        Sign Out
      </button>

      <div className="form-container">
        <form onSubmit={handleAddProduct} className="product-form">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <br />
          <h2>{message}</h2>
          <br />
          <button type="submit">Add Product</button>
          <hr />
          <h1>Products List</h1>

          {products.map((p) => (
            <div key={p._id} className="product-item">
              <h3>{p.productName}</h3>
              <p>Price: {p.price}</p>
              {p.image && <img src={p.image} alt={p.productName} width="100" />}
              <button onClick={() => removeProduct(p._id)}>Delete</button>
            </div>
          ))}
        </form>
      </div>
    </>
  );
}