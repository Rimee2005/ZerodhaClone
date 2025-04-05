import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row  mt-5 border-bottom text-center">
        <h1 className="mt-5">Pricing</h1>
        <h5 className="text-muted mt-3 fs-5 ">
          Free equity investments and flat ₹20 trading and F&O trades
        </h5>
        
      </div>

      <div className="row m-5  text-center">
        <div className="col-4 p-4">
           <img src="/images/pricingEquity.svg"></img>
           <h1 className="fs-5"> Free equity delivery</h1>
           <p className="text-muted"> All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
        </div>
          
        <div className="col-4 p-4">
           <img src="/images/intradayTrades.svg"></img>
           <img src=""></img>
           <h1 className="fs-5">Intraday and F&O trades</h1>
           <p className="text-muted">Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
        </div>
          
        <div className="col-4 p-4">
           <img src="/images/pricingEquity.svg"></img>
           <h1 className="fs-5">Free direct MF</h1>
           <p className="text-muted" >All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
        </div>
           
      </div>
    </div>
  );
}

export default Hero;
