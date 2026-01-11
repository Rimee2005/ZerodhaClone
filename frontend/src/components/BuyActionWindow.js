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
      onMouseEnter={(e) => {
        // Keep popup visible when hovering over it
        e.stopPropagation();
      }}
      onMouseLeave={(e) => {
        // Don't close on mouse leave - only close on Cancel button
        e.stopPropagation();
      }}
      onMouseMove={(e) => {
        // Prevent hover events from bubbling to list items
        e.stopPropagation();
      }}
      style={{
        position: "absolute",
        right: "0px",
        top: "100%",
        marginTop: "12px",
        backgroundColor: "white",
        border: "1px solid #e0e0e0",
        padding: "16px",
        borderRadius: "10px",
        zIndex: 1000,
        boxShadow: "0px 4px 16px rgba(0,0,0,0.15)",
        width: "300px",
        minWidth: "280px",
        pointerEvents: "auto",
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

      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "12px" }}>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: "600",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#5a6268";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#6c757d";
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleBuy}
          style={{
            backgroundColor: type === "buy" ? "#28a745" : "#dc3545",
            color: "white",
            padding: "8px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: "600",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = type === "buy" ? "#218838" : "#c82333";
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = type === "buy" ? "#28a745" : "#dc3545";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
          }}
        >
          {type === "buy" ? "Buy" : "Sell"}
        </button>
      </div>
    </div>
  );
};

export default BuyActionWindow;
