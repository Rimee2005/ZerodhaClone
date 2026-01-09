import React from "react";

import Menu from "./Menu";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty" style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          border: "none",
          boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)"
        }}>
          <p className="index" style={{ color: "rgba(255, 255, 255, 0.9)" }}>NIFTY 50</p>
          <p className="index-points" style={{ color: "white", fontSize: "1.1rem", fontWeight: "700" }}>24,141.80</p>
          <p className="percent" style={{ color: "#4ade80", fontSize: "0.85rem", fontWeight: "600" }}>+0.45% ↑</p>
        </div>
        <div className="sensex" style={{
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          color: "white",
          border: "none",
          boxShadow: "0 2px 8px rgba(245, 87, 108, 0.3)"
        }}>
          <p className="index" style={{ color: "rgba(255, 255, 255, 0.9)" }}>SENSEX</p>
          <p className="index-points" style={{ color: "white", fontSize: "1.1rem", fontWeight: "700" }}>79,243.45</p>
          <p className="percent" style={{ color: "#4ade80", fontSize: "0.85rem", fontWeight: "600" }}>+0.38% ↑</p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;