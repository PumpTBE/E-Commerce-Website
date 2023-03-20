import { useState } from "react";
import http from "../http";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



export default function AddCategoriesPage() {
  
  
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  async function submitHandler(e){
    e.preventDefault();
    //check for empty fields
    if (!title){
      setError("No Category Added !!!")
      return;
    }

    //send a post request to the server with the category information
    const {data} = await http.post("/category", {title});
    if (data, error){
      setError(data.error)
      return;
    }
    if (data.success){
      Swal.fire("Saved", "Category saved successfully", "success")
      navigate("/category")
    }
  }
return <>
  
  <h1 className="text-center text-white m-5">Add Category</h1>;
  <form onSubmit={submitHandler} action="" style={{ maxWidth: "750px", margin: "auto" }} className="form">
    {error && <div className="alert alert-danger p-2">{error}</div>}
    <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className="py-2 form-control mb-3" placeholder="Category"/>
    <button className="btn btn-success w-100">Submit</button>
  </form>

</>

}
