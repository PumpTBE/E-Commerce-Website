import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../http";

export default function OrderDetailsPage() {
  const {id} = useParams();
  async function updateStatus(status){
    const {data} = await http.put(`/orders/${id}`, {status});
    if(data.error){
      Swal.fire("Error", data.error, "error");
      return;
    }
    if(data.success){
      Swal.fire("Done", "Order Updated Successfully", "Success");
      getOrder();
    }
  }
  
  const [order, setOrder] = useState("");
  const [loadingOrder, setLoadingOrder]= useState(true);
  const [error, setError] = useState("");
  // const {id} = useParams();
  

  async function getOrder (){
    const {data} = await http.get(`/orders/${id}`);
    console.log(data);
    if(data.error){
      setError(data.error);
      setLoadingOrder(false);
      return;
    }
    setOrder(data);
    setLoadingOrder(false);
  }
  
    useEffect (() =>{
      getOrder();
    },[])


  return <>  {loadingOrder ? <div style={{fontSize: "1.6rem", marginLeft: "1rem", color:"white"}}>Loading . . .</div> : 
  error ? <div className="alert alert-danger">{error}</div> : 
  <div className="order-details">
      <div className="order-details-info">
          <div className="order-details-items">
              <h2>Order Items</h2>
              <table className="table w-100">
              {order.orderItems.map ((item) => {
          return  <tr>
            <td><img style={{ height: "5rem", width: "5rem" }} src={item.image} alt="" /></td>
            <td>{item.title}</td>
            <td>{item.qty.toLocaleString()} x ${item.price.toLocaleString()} = ${(item.qty * item.price).toLocaleString()}</td>
            </tr>
              })}
                  
                  <tr><td></td> <td></td>  <td>Total = ${order.totalPrice.toLocaleString()}</td></tr>
              </table>
          </div>
          <div className="order-details-delivery-info">
              <h2>Delivery Information </h2>
            <table className="table w-100">
              <tr> <td>Full Name : {order.deliveryInfo.fullName}</td> </tr>
              <tr> <td>Email : {order.user.email}</td></tr>
              <tr><td>Username : {order.user.username}</td> </tr>
              <tr><td>Address : {order.deliveryInfo.address}</td></tr>
              <tr><td>City : {order.deliveryInfo.city}</td></tr>
              <tr><td>Phone Number : {order.deliveryInfo.phoneNumber}</td></tr>
            </table>
          </div>
      </div>
      <div className="order-details-actions">
        <form action="" className="form">
          <h4>Total Price : {order.totalPrice}</h4>
          <h4>Status : {order.status}</h4>
          
             <label htmlFor="">Change Status</label>
          <select name=""onChange={e => updateStatus(e.target.value)} className="form-control" id="">
              <option value="Pending">Pending</option>
              <option value="Enroute">Enroute</option>
              <option value="Delivered">Delivered</option>
          </select>
         
         
        </form>
      </div>
  </div>
}
  </>
}