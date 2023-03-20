import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import http from "../http";

export default function SingleProductPage() {

  const [product, setProduct] = useState("");
  const [loadingProduct, setLoadingProduct]= useState(true);
  const [error, setError] = useState("");
  const {id} = useParams();

async function getProduct (){
  const {data} = await http.get(`/products/${id}`);
  if(data.error){
    setError(data.error);
    setLoadingProduct(false);
    return;
  }
  setProduct(data);
  setLoadingProduct(false);
}

  useEffect (() =>{
    getProduct();
  },[])

  return <> {loadingProduct ? <div style={{fontSize: "1.6rem", marginLeft: "1rem", color:"white"}}>Loading . . .</div> : 
  error ? <div className="alert alert-danger">{error}</div> :
  <div className="single-product">
    <img src={product.image} className="single-product-image"/>
  <div className="single-product-details">
    <div className="single-product-title">{product.title}</div>
    <div className="single-product-price">{product.price && product.price.toLocaleString()}</div>
    <div className="single-product-description">{product.description}</div>
  </div> 
  </div>
  }
  </>
    
  
}
