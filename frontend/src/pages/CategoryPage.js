import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../http";
import { useNavigate } from "react-router-dom";

export default function CategoryPage() {
  const [category, setCategory] = useState ([]);
 
 
  
  const navigate = useNavigate();
  
   async function getCategorys(){
   const {data} = await http.get("/category")
   setCategory(data);

   }
  
  async function deleteHandler(id){
      if(!window.confirm("Are you sure you want to delete this product")){
          return;
      }
  
      const {data} = await http.delete(`/category/${id}`); //=  / products/wejjejjjejjdjdj
      if(data.error){
          Swal.fire(data.error);
          return;
      }
      if(data.success){
          Swal.fire("Done", "Category Deleted Successfully", "success");
          getCategorys();
      }
  }
  
   useEffect(() => {getCategorys();
  },
   []);
  
    return <>
      <div className="d-flex justify-content-between p-3">
          <h3 className="text-white text-center text-uppercase m-3">Admin Category</h3>
          <div>
           <Link className="btn btn-info" to="/add-category">Add Category</Link>
          </div>
      </div>
  
        
        

          
           <table className="table text-white">
            <tr>
              <th>SN.</th><th></th><th>Category</th><th></th><th>Actions</th>
            </tr>

            {category.map((category, i) => {
              return <tr>
                <td>{i + 1}.</td>
                <td></td>
                <td>{category.title}</td>
                <td></td>
                
                <td>  <button onClick={() => deleteHandler(category._id)}className="btn btn-danger">
                  <i className="fa fa-trash-alt"></i></button>
                </td>
              </tr> })}
           </table>
       
          
            
        
    </>
  }