import React, { useState } from "react";
import { watchlist } from "../data/data";
import BuyActionWindow from "./BuyActionWindow";
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz } from "@mui/icons-material";
import { Tooltip, Grow } from "@mui/material";

const WatchList = () => {
  const [popup, setPopup] = useState({ type: null, uid: null });

  const showPopup = (type, uid) => {
    setPopup({ type, uid });
  };

  const closePopup = () => {
    setPopup({ type: null, uid: null });
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search eg: infy, bse, gold mcx"
          className="search"
        />
        <span className="counts" style={{
          fontSize: "0.75rem",
          color: "#6c757d",
          fontWeight: "600",
          whiteSpace: "nowrap",
          background: "#ffffff",
          padding: "6px 12px",
          borderRadius: "8px",
          border: "1px solid #e9ecef"
        }}>
          {watchlist.length} / 50
        </span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => (
          <li key={index}>
            <div className="item">
              <p style={{ 
                color: stock.isDown ? "#dc3545" : "#28a745",
                fontWeight: "700",
                fontSize: "0.95rem"
              }}>
                {stock.name}
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <Tooltip title="Buy" placement="top" arrow TransitionComponent={Grow}>
                  <button
                    onClick={() => showPopup("buy", stock.name)}
                    style={{ 
                      background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                      color: "white",
                      padding: "8px 18px",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #218838 0%, #1aa179 100%)";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(40, 167, 69, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #28a745 0%, #20c997 100%)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    Buy
                  </button>
                </Tooltip>
                <Tooltip title="Sell" placement="top" arrow TransitionComponent={Grow}>
                  <button
                    onClick={() => showPopup("sell", stock.name)}
                    style={{ 
                      background: "linear-gradient(135deg, #dc3545 0%, #e83e8c 100%)",
                      color: "white",
                      padding: "8px 18px",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #c82333 0%, #d91a72 100%)";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(220, 53, 69, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #dc3545 0%, #e83e8c 100%)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    Sell
                  </button>
                </Tooltip>
              </div>
            </div>

            {popup.uid === stock.name && popup.type && (
              <BuyActionWindow type={popup.type} uid={popup.uid} onClose={closePopup} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
