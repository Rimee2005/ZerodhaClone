import React from 'react';

function CreateTicket() {
    return (  
        <div className="container">
        <div className="row pt-5">
          <h5 className="fs-4 mb-5 pb-5 text-muted">
            To create a ticket, select a relevant topic
          </h5>
  
          {/* First row: 3 columns */}
          <div className="row mb-4">
            <div className="col-4">
              <h4 className="fs-20 text-small">  
                <i className="fa-solid fa-circle-plus"></i> Account Opening
              </h4>
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Getting Started
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Online
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Offline
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Charges
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Company , Partnership
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Non Residen Indian(NRI)
              </a>
              <br />
            </div>
  
            <div className="col-4">
              <h4 className="fs-20 text-small">
                <i class="fa-solid fa-user"></i>
                Your Zerodha Account
              </h4>
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Login credentials
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Your Profile
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Account modification and segment addition
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                CMR & DP ID
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Nomination
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Transfer and conversion of sares
              </a>
            </div>
  
            <div className="col-4">
              <h4 className="fs-20 text-small">
                <i class="fa-solid fa-align-right"></i>
                Trading and Markets
              </h4>
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Trading FAQs
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Kite
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Margins
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Product and Order types
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Corporate action
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Key features
              </a>
            </div>
          </div>
  
          {/* Second row: 3 columns */}
          <div className="row mb-4">
            <div className="col-4">
              <h4 className="fs-20 text-small">
                <i class="fa-solid fa-square"></i>
                Funds
              </h4>
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Fund Withdrawal
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Adding funds
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Adding bank accounts
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                eMandates
              </a>
            </div>
  
            <div className="col-4">
              <h4 className="fs-20 text-small">
                <i class="fa-solid fa-circle-dot"></i>
                Console
              </h4>
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                IPO
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Portfolio
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Funds statement
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Profile
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Reports
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Referral program
              </a>
            </div>
  
            <div className="col-4">
              <h4 className="fs-20 text-small">
                <i class="fa-regular fa-circle-dot"></i>
                Coin
              </h4>
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Understanding Mutual Funds and Coins
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Coin app
              </a>
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                coin web
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                Transactions and reports
              </a>
              <br />
              <a href="#" style={{ textDecoration: "none", lineHeight: "2" }}>
                National Pensions Scheme(NPS)
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}

export default CreateTicket;