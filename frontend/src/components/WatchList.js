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
    <div className="watchlist-container" style={{ padding: "1rem" }}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search eg: infy, bse, gold mcx"
          className="search"
          style={{ padding: "8px", width: "300px" }}
        />
        <span className="counts">{watchlist.length} / 50</span>
      </div>

      <ul className="list" style={{ listStyle: "none", padding: 0 }}>
        {watchlist.map((stock, index) => (
          <li key={index} style={{ marginBottom: "1rem" }}>
            <div className="item" style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: stock.isDown ? "red" : "green" }}>{stock.name}</p>
              <div>
                <Tooltip title="Buy" placement="top" arrow TransitionComponent={Grow}>
                  <button
                    onClick={() => showPopup("buy", stock.name)}
                    style={{ marginRight: "10px", background: "green", color: "white", padding: "5px 10px" }}
                  >
                    Buy
                  </button>
                </Tooltip>
                <Tooltip title="Sell" placement="top" arrow TransitionComponent={Grow}>
                  <button
                    onClick={() => showPopup("sell", stock.name)}
                    style={{ background: "crimson", color: "white", padding: "5px 10px" }}
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
