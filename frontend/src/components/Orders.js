import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
  
    fetchOrders();
  }, []);  
  

  const tableStyle = {
    width: "90%",
    margin: "20px auto",
    borderCollapse: "collapse",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
    borderRadius: "8px",
    overflow: "hidden"
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "center"
  };

  const headingStyle = {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "24px",
    color: "#333"
  };

  const noOrderStyle = {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
    color: "#777"
  };

  const btnStyle = {
    padding: "10px 20px",
    marginTop: "20px",
    display: "inline-block",
    backgroundColor: "#4CAF50",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px"
  };

  return (
    <div className="orders">
      {orders.length === 0 ? (
        <div style={noOrderStyle}>
          <p>You haven't placed any orders yet.</p>
          <Link to={"/"} style={btnStyle}>
            Get started
          </Link>
        </div>
      ) : (
        <>
          <h2 style={headingStyle}>Your Orders ({orders.length})</h2>
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={thTdStyle}>#</th>
                <th style={thTdStyle}>Mode</th>
                <th style={thTdStyle}>Instrument</th>
                <th style={thTdStyle}>Qty</th>
                <th style={thTdStyle}>Price (₹)</th>
                <th style={thTdStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td style={thTdStyle}>{index + 1}</td>
                  <td style={{ ...thTdStyle, color: order.mode === "BUY" ? "green" : "red", fontWeight: "bold" }}>
                    {order.mode}
                  </td>
                  <td style={thTdStyle}>{order.name}</td>
                  <td style={thTdStyle}>{order.qty}</td>
                  <td style={thTdStyle}>₹{order.price.toFixed(2)}</td>
                  <td style={thTdStyle}>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Orders;
