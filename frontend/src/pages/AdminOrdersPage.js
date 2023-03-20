import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../http";




export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  

  async function getOrders(){
    const {data} = await http.get("/orders");
    setOrders(data);
  }
   
  async function deleteOrderHandler(id){
    if(!window.confirm("Are you sure you want to delete this Order")){
        return;
    }

    const {data} = await http.delete(`/orders/${id}`); 
    if(data.error){
        Swal.fire(data.error);
        return;
    }
    if(data.success){
        Swal.fire("Done", "Order Deleted Successfully", "success");
        getOrders();
    }
}


  useEffect(()=>{
    getOrders()
  },[]);

  return <>
  {orders.length === 0 ? <h2 className="text-white"> No Orders Yet</h2> :
  <table className="table text-white">
    <tr>
      <th>SN.</th> <th>Email</th><th>Price ($)</th><th>Actions</th>
    </tr>
    {orders.map((order, i) =>{
     return <tr style={{fontSize : "1.4rem"}}>
      <td className="py-5">{i+1}.</td>
      <td>{order.user && order.user.email}</td>
      <td>{order.totalPrice && order.totalPrice.toLocaleString()}</td>
      <td>{order.status}</td>
      <td>
        <Link to={`/order/${order._id}`}>
   <button className="btn btn-primary me-2"><i className="fas fa-eye"></i></button>
   </Link>
   <button className="btn btn-danger"><i onClick= {() => deleteOrderHandler(order._id)} className="fa fa-trash-alt"></i></button>
      </td>
  </tr>
    })}
   
  </table>
}

  </>
}
