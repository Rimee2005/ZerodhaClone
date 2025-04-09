import React, { useState } from "react";
import BuyActionWindow from "../components/BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, mode) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [tradeMode, setTradeMode] = useState("buy");

  const handleOpenBuyWindow = (uid, mode) => {
    setSelectedStockUID(uid);
    setTradeMode(mode);
    setIsBuyWindowOpen(true);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setTradeMode("buy");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow
          uid={selectedStockUID}
          type={tradeMode}
          onClose={handleCloseBuyWindow} // ✅ Pass close function
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
