import React from "react";

function Universe() {
  return (
    <div className="container">
      <div className="row mt-5 p-5 text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-4 p-3">
          <img src="/images/smallcaseLogo.png" alt="Smallcase Logo" />
          <p className="text-10 text-light-grey text-muted">
            Thematic investing platform <br />
            that helps you invest in diversified <br />
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col-4 p-3">
          <img
            style={{ width: "60%" }}
            src="/images/zerodhaFundhouse.png"
            alt={"Partner Logo"}
          />
          <p class="text-12 text-light-grey text-muted">
            Our asset management venture <br />
            that is creating simple and transparent index <br />
            funds to help you save for your goals.
          </p>
        </div>
        <div className="col-4 p-3">
          <img
            style={{ width: "60%" }}
            src="/images/sensibullLogo.svg"
            alt="Logo"
          />
          <p className="text-12 text-light-grey text-muted">
            Options trading platform that lets you <br />
            create strategies, analyze positions, and examine data points like
            open interest, FII/DII, and more.
          </p>
        </div>

        <div className="col-4 p-3">
          <img
            style={{ width: "50%" }}
            src="/images/streakLogo.png"
            alt="Smallcase Logo"
          />
          <p className="text-10 text-light-grey text-muted">
            Systematic trading platform <br />
            that allows you to create and backtest <br />
            strategies without coding.
          </p>
        </div>

        <div className="col-4 p-3">
          <img src="/images/goldenpiLogo.png" alt={"Partner Logo"} />
          <p className="text-12 text-light-grey text-muted">
            Investment research platform <br />
            that offers detailed insights on stocks, <br />
            sectors, supply chains, and more.
          </p>
        </div>
        <div className="col-4 p-3">
          <img
            style={{ width: "30%" }}
            src="/images/dittoLogo.png"
            alt="Another Partner Logo"
          />
          <p className="text-12 text-light-grey text-muted">
            Personalized advice on life <br />
            and health insurance. No spam <br />
            and no mis-selling.
          </p>
        </div>
        <button
          className="p-1 btn btn-primary fs-5 mb-3 mt-4 "
          style={{
            width: "20%",
            margin: "10px auto 0",
            backgroundColor: "#387ED1",
          }}
        >
          Signup for free
        </button>
      </div>
    </div>
  );
}

export default Universe;
