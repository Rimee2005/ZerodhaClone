import React, { useState, useEffect } from "react";
import apiClient from "../config/axios";
import { watchlist } from "../data/data";

const BuyActionWindow = ({ type, uid, onClose }) => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0.0);
  
  // Set default price from watchlist data
  useEffect(() => {
    const stock = watchlist.find(s => s.name === uid);
    if (stock && stock.price) {
      setPrice(stock.price);
    }
  }, [uid]);

  const handleBuy = async () => {
    // Validation
    if (!qty || qty <= 0) {
      alert("Please enter a valid quantity (greater than 0)");
      return;
    }
    
    if (!price || price <= 0) {
      alert("Please enter a valid price (greater than 0)");
      return;
    }

    try {
      console.log("📤 Placing order:", { name: uid, qty, price, mode: type.toUpperCase() });
      const response = await apiClient.post("/api/newOrder", {
        name: uid,
        qty: parseFloat(qty),
        price: parseFloat(price),
        mode: type.toUpperCase(), // either BUY or SELL
      });

      console.log("✅ Order placed:", response.data);
      alert(`${type === "buy" ? "Buy" : "Sell"} order placed successfully!`);
      onClose(); // closes popup
      // Reload the page to refresh orders and holdings
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("❌ Order failed:", error);
      console.error("❌ Error response:", error.response?.data);
      console.error("❌ Error status:", error.response?.status);
      
      let errorMessage = "Something went wrong! Please try again.";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      if (error.response?.status === 401) {
        errorMessage = "Session expired. Please login again.";
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      alert(errorMessage);
    }
  };

  const margin =
    qty && price ? (parseFloat(qty) * parseFloat(price)).toFixed(2) : "0.00";

  return (
    <div
      style={{
        position: "absolute",
        right: "0px",
        top: "100%",
        backgroundColor: "white",
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "10px",
        zIndex: 100,
        boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
        width: "300px",
      }}
    >
      <h4 style={{ marginBottom: "10px" }}>
        {type === "buy" ? "Buy" : "Sell"} - {uid}
      </h4>

      <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
        <input
          type="number"
          placeholder="Qty."
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          style={{
            flex: 1,
            minWidth: 0,
            padding: "6px 8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            flex: 1,
            minWidth: 0,
            padding: "6px 8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>

      <p style={{ marginBottom: "12px", fontSize: "14px" }}>
        Margin required ₹{margin}
      </p>

      <div>
        <button
          onClick={handleBuy}
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "6px 12px",
            marginRight: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {type === "buy" ? "Buy" : "Sell"}
        </button>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "#aaa",
            color: "white",
            padding: "6px 12px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyActionWindow;
