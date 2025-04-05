import React from "react";

function Pricing() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-6">
          <h1 className="mt-7" style={{ color: "#424242" }}>
            Unbeatable pricing
          </h1>
          <p>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            See pricing
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <div className="col-6 p-6">
          <img src="/images/pricing-real.jpg" style={{ width: "99%" }}></img>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
