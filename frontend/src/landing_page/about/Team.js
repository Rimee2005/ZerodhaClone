import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row mt-5 " style={{ color: "#424242" }}>
        <h1 className=" text-center mt-3">People</h1>
      </div>
      <div className="row text-muted">
        <div className="col-6 text-center">
          <img
            src="\images\nithinKamath.jpg"
            style={{ borderRadius: "100%", width: "70%" }}
            className="p-5  "
          ></img>
          <h5> Nithin Kamath</h5>
          <p> Founder , CEO</p>
        </div>
        <div
          className="col-6 p-5 tex-center"
          style={{ color: "#424242", fontSize: "18px", lineHeight: "1.8" }}
        >
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <br></br>
          <p>
            Connect on {" "}
            <a style={{ textDecoration: "none" }} href="">
              Homepage
            </a>{" "}
            /
            <a href="" style={{ textDecoration: "none" }}>
            {" "} Trading QnA
            </a>{" "} 
            /
            <a href="" style={{ textDecoration: "none" }}>
            {" "} Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
