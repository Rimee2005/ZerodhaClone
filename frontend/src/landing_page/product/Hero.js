import React from "react";

function Hero() {
  return (
    <div className="container text-center mt-5 pt-5 mb-5"
    style={{color:"#424242"}}>
      <h1 className="mt-5">Zerodha Products</h1>
      <h5 className="mt-3"> Sleek, modern, and intuitive trading platforms</h5>
      <p className="mt-4 mb-5">
        {" "}
        Check out our{" "}
        <a  href="" style={{ textDecoration: "none"}}> investment offerings →</a>{" "}
      </p>
      <hr></hr>
    </div>
  );
}

export default Hero;
