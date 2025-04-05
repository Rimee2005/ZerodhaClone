import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 text-center border-top">
        <div className="col-8 p-4">
          <a href="#" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">Brokerage calculator</h3>
          </a>
          <ul style={{textAlign:"left" , lineHeight:"2" , fontSize:"14px"}} className="text-muted mt-5">
            <li>
              Additional charges of ₹50 per order for orders placed through a
              dealer at Zerodha including auto square off orders.
            </li>
            <li>
              Stamp charges by the Government of India as per the Indian Stamp
              Act of 1899 for transacting in instruments on the stock exchanges
              and depositories.
            </li>
            <li>
              If the account is in debit balance, any order placed will be
              charged ₹40 per executed order instead of ₹20 per executed order.
            </li>
            <li>
              When trading at Zerodha, STT/CTT can be a lot more than the
              brokerage we charge. Important to keep a tab
            </li>
            <li>
              Charged by exchanges (NSE, BSE, MCX) on the value of your
              transactions.
            </li>
            <li>
              BSE has revised transaction charges in M, MT, TS and MS groups to
              ₹275 per crore of gross turnover.
            </li>
          </ul>
        </div>
        <div className="col-4 p-4">
          <a href="#" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">List of charges</h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
