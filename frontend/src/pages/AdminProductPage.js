import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../http";
import Swal from "sweetalert2";

export default function AdminProductPage() {
const [products, setProducts] = useState ([]);
const [loadingProducts, setLoadingProducts] = useState ([true]);
const userInfo = JSON.parse(localStorage.getItem("userInfo"))

const navigate = useNavigate();

 async function getProducts(){
 const {data} = await http.get("/products")
 setProducts(data);
 setLoadingProducts(false);
 }

async function deleteHandler(id){
    if(!window.confirm("Are you sure you want to delete this product")){
        return;
    }

    const {data} = await http.delete(`/products/${id}`); //=  / products/wejjejjjejjdjdj
    if(data.error){
        Swal.fire(data.error);
        return;
    }
    if(data.success){
        Swal.fire("Done", "Product Deleted Successfully", "success");
        getProducts();
    }
}

 useEffect(() => {getProducts();
!userInfo.isAdmin && navigate("/");
},
 []);

  return <>
    <div className="d-flex justify-content-between p-3">
        <h3 className="text-white text-center text-uppercase m-3">Admin Products</h3>
        <div>
         <Link className="btn btn-info" to="/add-product">Add Product</Link>
        </div>
    </div>

      <div className="admin-products">
        { loadingProducts ? 
         <div style={{fontSize : "1.6rem", marginLeft : "1rem"}}>Loading Products ...</div>:
         products.length === 0 ? <div className="alert alert-info">No Products Found</div> :
        products.map(product => {
            return <div className="admin-product">
            <img src={product.image} alt="" className="admin-product-image" />
            <div className="admin-product-details">
                <h3 className="admin-product-title">{product.title}</h3>
                <h6 className="admin-product-description">{product.description}</h6>
            </div>
            <div className="admin-product-price">${product.price && product.price.toLocaleString()}</div>
            <div className="admin-product-actions">
                <Link to={`/edit-product/${product._id}`}> {/** /edit-product/hfsdjdfdfhjdfjhdfh **/}
                <button className="btn btn-success"><i className="fa fa-edit"></i></button>
                </Link>
               
                <button onClick={() => deleteHandler(product._id)}className="btn btn-danger"><i className="fa fa-trash-alt"></i></button>
            </div>
        </div>
        })
        }
          
      </div>
  </>
}