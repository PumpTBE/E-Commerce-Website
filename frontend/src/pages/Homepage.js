import { useEffect, useState } from "react";
import http from "../http";
import Swal from "sweetalert2";
import { Link, Navigate } from "react-router-dom";

export default function Homepage(){
  const [products, setProducts] = useState([]);
  const cartItems = JSON.parse( localStorage.getItem("cartItems") || "[]");

 async function getProducts(){
  const { data } = await http.get("/products");
  setProducts(data)
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
 Navigate("/cart");      
}


useEffect(() => {getProducts();},
[]);


  return (
    <>
       <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://www.topgear.com/sites/default/files/news-listicle/image/2017/03/ae21698a-153c-43b6-8990-ba7e7fb44e5f.jpg"
              class="d-block w-100"
              alt="..."
            />
            <p>Muscles & Imports</p>
          </div>
          <div class="carousel-item">
            <img
              src="https://media.istockphoto.com/photos/new-generic-cars-picture-id1224039863?b=1&k=20&m=1224039863&s=170667a&w=0&h=kUtPJ1O4SVr0UexYaqxkMMJiilu2JQAAYyKjA00BkpM="
              class="d-block w-100"
              alt="..."
            />
            <p>New Generic Cars</p>
          </div>
          <div class="carousel-item">
            <img
              src="https://lexus-cms-media.s3.us-east-2.amazonaws.com/wp-content/uploads/2019/04/2005_ES_330_10-1500x900.jpg"
              class="d-block w-100"
              alt="..."
            />
            <p>Under $10000</p>
          </div>
          <div class="carousel-item">
            <img
              src="https://media.istockphoto.com/photos/new-auto-parts-picture-id499178422?k=20&m=499178422&s=612x612&w=0&h=Y9Ek-qkjA3Eh1Pv2AcRSRVDUVYP8TVngcvXB-Abs7lo="
              class="d-block w-100"
              alt="..."
            />
            <p>New Auto Parts</p>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <center class="w">
        <h1>Our Services</h1>
      </center>
      <div class="services">
        <div class="service">
          <i class="fa fa-shopping-cart"></i>
          <h3>Auctions</h3>
          <p>
            We Have Auctions Once Every Four(4) Year On Exotic Cars <br /> Keep
            in Touch With Our Dealers So YOU Don't <br />
            MIss The Opportunity Of Adding Our Cars To Your Gallery{" "}
          </p>
        </div>
        <div class="service">
          <i class="fa fa-credit-card"></i>
          <h3>Payment Methods</h3>
          <p>
            Cash <br /> Debit/credit cars <br />
            Bank Trasnfer
          </p>
        </div>
        <div class="service">
          <i class="fa fa-truck"></i>
          <h3>Qucik delivery</h3>
          <p>
            All We Need Is A Home Address <br />& <br /> We Deliver As Fast As
            Possible
          </p>
        </div>
      </div>

      <center class="w">
        <h1 class="m-5">FEATURED VEHICLES</h1>
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
                <p className="admin-product-description"> {product.description.substring(0,65)}</p>
            
            <div className="product-price">${product.price && product.price.toLocaleString()}</div>
            <div onClick={() => addToCart(product._id)} className="btn btn-dark">Add To Cart</div>
            </div> 
            </div>
            </div> 
        })
        }
        </div>
      </div>
    </>
  );
}
