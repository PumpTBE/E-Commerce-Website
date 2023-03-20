import { useEffect, useState } from "react";
import http from "../http";
import Swal from "sweetalert2";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";


export default function CategorySearchPage() {
  

  const [products, setProducts] = useState([]);
  const cartItems = JSON.parse( localStorage.getItem("cartItems") || "[]");
  const navigate = useNavigate();
  const {id} = useParams();

 async function getProducts(){
  const { data } = await http.get("/products");
  setProducts(data.filter(x => x.category === id));
 }
 
async function addToCart(id){
  const existingProduct = cartItems.find(x => x._id === id);
  if(existingProduct){
     Swal.fire("Product Already Added To Cart");
     return;
  }


 const {data} = await http.get(`/products/${id}`);
 data.qty = 1;
 localStorage.setItem("cartItems", JSON.stringify([...cartItems, data]));
 Swal.fire("Product Has Been Added To Cart");  
  
}


useEffect(() => {getProducts()},
[id]);


  return (
    <>
      
   
       <center class="w">
        <h2 class="m-5">{products.length} result(s) found </h2>
      </center>
      <div class="container">
        <div class="row d-flex justify-content-center">
        {products.length > 0 && products.map(product => {
            return <div className="col" key ={product._id}>
            <div className="card" style={{ width: "18rem" }}>
              <Link to={`/product/${product._id}`}>
            <img src={product.image} alt="" className="card-img-top" style={{width: "18rem"}} />
             </Link>
              <div className="card-body">
              <Link to={`/product/${product._id}`}>
                <h3 className="card-title">{product.title}</h3>
                </Link>
                
            </div>
            <div className="admin-product-price">${product.price}</div>
            <div onClick={() => addToCart(product._id)} className="btn btn-dark">Add To Cart</div>
            </div> 
            </div> 
        })
        }
        </div>
      </div>
    </>
  );

      
      }
