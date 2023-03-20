
import { useEffect, useState } from "react";

import http from "../http";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error,setError] = useState("");
  const [uploading, setUploading] =useState(false);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [categorys, setCategorys] = useState([]);

  async function getCategory(){
    const {data} = await http.get("/category");
    setCategorys(data);
    // console.log(category);
  }
useEffect (() =>{
  getCategory();
}, []);

async function handleFileChange(e){
  setUploading(true);
 const file = e.target.files[0];
 const data = new FormData();
 data.append("file", file);
 data.append("upload_preset", "DemonKing");
 data.append("cloud_name", "dmpsnzxfn");

try {
  const result = await axios.post("https://api.cloudinary.com/v1_1/dmpsnzxfn/image/upload", data);
  setImage(result.data.secure_url);
  setUploading(false);

} catch (error) {
  Swal.fire("Error", error.message, "error");
  setUploading(false);
}
}

 async function submitHandler(e){
    e.preventDefault();
    //check for empty fields
    if (!title ||!image || !price || !description){
      setError("No field should be empty")
      return;
    }

    //send a post request to thr server with the product information
    const {data} = await http.post("/products",{title, price, image, category, description});
    if (data, error){
      setError(data.error)
      return;
    }
    if (data.success){
      Swal.fire("Saved", "Product saved successfully", "success")
      navigate("/admin-products")
    }
  }

  return <>
  
  <h1 className="text-center text-white m-5">Add Product</h1>;
  <form onSubmit={submitHandler} action="" style={{ maxWidth: "750px", margin: "auto" }} className="form">
    {error && <div className="alert alert-danger p-2">{error}</div>}
    {uploading && <h3 className="text-white">Uploading. . .</h3>}
    <label  className="form-control mb-3 py-5" htmlFor="imageFile">
      <input type="file" name="" id="imageFile" accept="image/*" onChange={handleFileChange}/>
      {image && <img src={image} alt="" style={{width : "5rem", height : "5rem"}}/>}
    </label>
    <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className="py-2 form-control mb-3" placeholder="Title"/>
    <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" className="py-2 form-control mb-3" placeholder="Price"/>
    <select onChange={(e) => setCategory(e.target.value)} value={category} name="" className="py-2 form-control mb-3" placeholder="Product Category" id="">
     <option value="" selected>Select Category</option>
      {categorys.map (category => {
        return <option value={category._id}>{category.title}</option>
      })}
    </select>
    <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" className="py-2 form-control mb-3" placeholder="Description"/>
    <button disabled={uploading} className="btn btn-success w-100">Submit</button>
  </form>

  </>
}
