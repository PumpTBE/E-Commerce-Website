import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";


export default function Header() {
  
  const [text, setText] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  
  useEffect(()=>{
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")))
    return ()=>{
      setUserInfo(null);
    }
  },[]);
  
  
  const submitHandler =(e) => {
    e.preventDefault();
    navigate(`/search/${text}`);
  }

  function closeSidebar(){
    setShow(false)
  }
  // userInfo = JSON.parse(userInfo);
  function logoutHandler() {
    localStorage.removeItem("userInfo");
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark "><div class="container-fluid">
       <div>
        <span onClick={() =>setShow(true)} style={{cursor : "pointer"}} className="fa fa-bars fs-4 text-white me-3 m-2"></span>
       <a class="navbar-brand" href="/">SwiftRides </a>
       </div>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false" aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/cart">
                  Cart
                </a>
              </li>
              <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#"
                  id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">

                  {userInfo ? (userInfo.username) : (<i className="fa fa-user"></i>)}</a>
                {!userInfo && ( <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li><a class="dropdown-item" href="/login">Login</a></li>
                <li><hr class="dropdown-divider" /></li> 
                <li><a class="dropdown-item" href="/register">Register</a></li>
                </ul>
                )}

                {userInfo && ( <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                {userInfo.isAdmin && <li><a class="dropdown-item" href="/admin-products">Admin Product</a></li>}
                <li><hr class="dropdown-divider" /></li>
                {userInfo.isAdmin &&  <li><a class="dropdown-item" href="/admin-orders">Admin Orders</a></li>}
                <li><hr class="dropdown-divider" /></li> 
                {userInfo.isAdmin &&  <li><a class="dropdown-item" href="/category">Product Category</a></li>}
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="/order-history">Order History</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a onClick={logoutHandler} class="dropdown-item" href="/">Logout</a></li>
                  </ul>
                )}
              </li>
            </ul>

            <form onSubmit={submitHandler} class="d-flex">
              <input value={text} onChange= {e => setText(e.target.value)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-info" type="submit">Search</button>
            </form>
          </div>
        </div>
        {show && <Sidebar close={closeSidebar} /> } 
      </nav>
      
    </>
  );
}
