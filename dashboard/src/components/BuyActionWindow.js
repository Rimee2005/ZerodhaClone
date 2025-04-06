import React, { useEffect, useRef, useState } from "react";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ type, uid, onClose }) => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const popupRef = useRef(null);

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConfirm = () => {
    console.log(`${type.toUpperCase()} ${uid} - Qty: ${qty}, Price: ₹${price}`);
    onClose();
  };

  return (
    <div className="popup-container" ref={popupRef}>
      <h4>{type === "buy" ? "Buy" : "Sell"}: {uid}</h4>
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        placeholder="Quantity"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <div className="popup-buttons">
        <button className="confirm" onClick={handleConfirm}>Confirm</button>
        <button className="cancel" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default BuyActionWindow;
