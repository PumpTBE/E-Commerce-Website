import { useState } from "react";
import { useEffect } from "react"
import { Link } from "react-router-dom";
import http from "../http"

export default function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const id = userInfo._id;

    async function getMyOrders() {
        const { data } = await http.get(`/orders/order-history/${id}`);
        setOrders(data);
    }

    useEffect(() => {
        getMyOrders();
    }, [])

    return <>
    {orders.length === 0 ? <h2 className="text-white">No Orders Yet</h2> :
        <table className="table text-white">
            <tr>
                <th>SN.</th> <th>Email</th> <th>Price ($)</th> <th>Status</th> 
            </tr>
            {orders.map((order, i) => {
                return <tr style={{fontSize : "1.4rem"}}>
                    <td className="py-5">{i + 1}.</td>
                    <td>{order.user && order.user.email}</td>
                    <td>{order.totalPrice && order.totalPrice.toLocaleString()}</td>
                    <td>{order.status}</td>
                    
                </tr>
            })}

        </table>

    }

</>
}