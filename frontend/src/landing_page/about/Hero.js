import React from "react";

function Hero() {
  return (
    <div className="container" >
      <div className="row mt-5 pt-5" style={{ color: "#424242" }}>
        <h1 className="fs-2 text-center mt-5 mb-5  pb-5">
          We pioneered the discount broking model in India.
          <br />
          Now, we are breaking ground with our technology.
        </h1>
        <hr></hr>
      </div>
      <div className="row mt-5 text-muted" >
        <div
          className="col-6 p-5"
          style={{ color: "#424242", fontSize: "18px", lineHeight : "1.8" }}
        >
          <p>
            We kick-started operations on the 15th of August, 2010 with the goal
            of breaking all barriers that traders and investors face in India in
            terms of cost, support, and technology. We named the company
            Zerodha, a combination of Zero and "Rodha", the Sanskrit word for
            barrier
          </p>
          <br />
          <p>
            Today, our disruptive pricing models and in-house technology have
            made us the biggest stock broker in India.
          </p>
          <br />
          <p>
            Over 1+ Crore clients place millions of orders every day through our
            powerful ecosystem of investment platforms, contributing over 15% of
            all Indian retail trading volumes.
          </p>
          <br />
        </div>
        <div
          className="col-6 p-5"
          style={{ color: "#424242", fontSize: "18px" , lineHeight : "1.8" }}
        >
          <p>
            In addition, we run a number of popular open online educational and
            community initiatives to empower retail traders and investors.
          </p>
          <br></br>
          <p>
            <a style={{ textDecoration: "none" }} href="">
              Rainmatter
            </a>
            , our fintech fund and incubator, has invested in several fintech
            startups with the goal of growing the Indian capital markets.
          </p>
          <br></br>
          <p>
            And yet, we are always up to something new every day. Catch up on
            the latest updates on our{" "}
            <a href="" style={{ textDecoration: "none" }}>
              blog
            </a>{" "}
            or see what the media is{" "}
            <a href="" style={{ textDecoration: "none" }}>
              saying about us
            </a>
            .
          </p>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export default Hero;
