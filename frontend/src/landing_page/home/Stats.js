import React from "react";

function Stats() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-5 p-6">
          <h2 className="mt-5" style={{ color: "#424242" }}>
            Trust with confidence
          </h2>
          <h4 className="mt-5" style={{ color: "#424242" }}>
            Customer-first always
          </h4>
          <p style={{ color: "gray" }}>
            That's why 1.5+ crore customers trust Zerodha with ₹4.5+ lakh crores
            of equity investments and contribute to 15% of daily retail exchange
            volumes in India.
          </p>
          <h4 style={{ color: "#424242" }}>No spam or gimmicks</h4>
          <p style={{ color: "gray" }}>
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
          </p>
          <h4 style={{ color: "#424242" }}>The Zerodha universe</h4>
          <p style={{ color: "gray" }}>
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>
          <h4 style={{ color: "#424242" }}>Do better with money</h4>
          <p style={{ color: "gray" }}>
            With initiatives like Nudge and Kill Switch, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>
        <div className="col-7 p-6  mt-5">
          <img src="/images/ecosystem.png" style={{ width: "90%" }} ></img>
          <div className="text-center">
            <a href="" className="mx-5" style={{textDecoration:"none"}}> Explore our products
            <i class="fa-solid fa-arrow-right"></i>
            </a>
            <a href=""style={{textDecoration:"none"}}>Try Kite demo
            <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
