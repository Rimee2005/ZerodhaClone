import React, { useState } from "react";
import axios from "axios";

const BuyActionWindow = ({ type, uid, onClose }) => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0.0);

  const handleBuy = async () => {
    try {
      const response = await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: parseFloat(qty),
        price: parseFloat(price),
        mode: type.toUpperCase(), // either BUY or SELL
      });

      console.log("✅ Order placed:", response.data);
      onClose(); // closes popup
    } catch (error) {
      console.error("❌ Order failed:", error);
      alert("Something went wrong! Check console.");
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
