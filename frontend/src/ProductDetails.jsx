import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function ProductDetails(){

  const {id} = useParams();
     const [productDetails,setProductDetails] = useState(null);

  const fetchProductDetails = async () => {
    const res = await fetch(`http://localhost:3000/product/listsingle/${id}`);
    const data = await res.json();

    setProductDetails(data);

  }

  useEffect(() => {
    fetchProductDetails();
  },[]);

  if(!productDetails){
    return <h2>Loading...</h2>
  }
  return(
    <>
    <div>
      <Navbar />
      <div>
      <h2>{productDetails.productName}</h2>
      <p>price:{productDetails.price}</p>
      <p>{productDetails.description}</p>
      <img src={productDetails.image}></img>
    </div>

    </div>
    
    
    </>
  )
}