import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../http";



export default function Sidebar({close}){
const [category, setCategory] = useState([]);

async function getCategory(){
  const {data} = await http.get("/category");
  setCategory(data);
  // console.log(category);
}

useEffect(() =>{
  getCategory();
}, []);
  return <div className="sidebar">
      <span onClick={close} >X</span>
   {category.map (category => {
    return <div> <Link to={`/category-search/${category._id}`} className="sidebar-item">{category.title}</Link></div>
   })}

  </div>
  }