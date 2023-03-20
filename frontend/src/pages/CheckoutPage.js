import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../http";


export default function Checkoutpage() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

let totalPrice = 0;
for(let i = 0; i<cartItems.length; i++){
  totalPrice += cartItems[i].price * cartItems[i].qty;
}


  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  // const [error, setError] = useState("");

  async function submitHandler(e){
    e.preventDefault();
    if(!fullName || !address || !phoneNumber || !city ){
      Swal.fire("Error", "Please fill all fields")
      return;
    }

    localStorage.setItem("deliveryInfo", JSON.stringify ({fullName, address, phoneNumber, city}));

    const {data} = await http.post("/orders", {deliveryInfo : {fullName, address, phoneNumber, city}, orderItems : cartItems, user : userInfo._id });
    
    if (data.error) {
      Swal.fire("Error", data.error, "error")
    }
    if (data.success) {
      Swal.fire("Done", fullName + ", Delivery Details Saved", "success");
      // Empty  the cart
      localStorage.setItem("cartItems", "[]");
      // navigate("/order-history");
     
    }

  }

  
useEffect(()=>{
  !userInfo && navigate("/login");
  cartItems.length === 0 && navigate("/");
},[]);

  return <>
<div className="checkout pt-3">
  <div className="checkout-items">
    <h3>Cart Items</h3>
    <table>
        {cartItems.map(item => {
          return  <tr>
            <td><img style={{ height: "5rem", width: "5rem" }} src={item.image} alt="" /></td>
            <td>{item.title}</td>
            <td>{item.qty.toLocaleString()} x ${item.price.toLocaleString()} = ${(item.qty * item.price).toLocaleString()}</td>
            </tr>
              })}
                <tr><td></td> <td></td>  <td>Total = ${(cartItems.reduce((a,c) => a + c.qty * c.price, 0)).toLocaleString()}</td></tr>  
                </table>
  </div>
 <div className="checkout-delivery-info">
 <h3 className="text-center text-white mb-2">Delivery Details</h3>
  <form onSubmit={submitHandler} action="" style={{ maxWidth: "750px", margin: "auto" }} className="form">
    <input onChange={(e) => setFullName(e.target.value)} value={fullName} type="text" className="py-2 form-control mb-3" placeholder="Fullname"/>
    <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" className="py-2 form-control mb-3" placeholder="Address"/>
    <input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} type="text" className="py-2 form-control mb-3" placeholder="Phone Number"/>
    <input onChange={(e) => setCity(e.target.value)} value={city} type="text" className="py-2 form-control mb-3" placeholder="City"/>
    <button className="btn btn-success w-100">Submit</button>
  </form>
  </div>
  </div>
  </>
}



