import React from "react";
import {Link} from "react-router-dom"

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg w-100 border-bottom fixed-top"
      style={{ backgroundColor: "white", height: "70px" }}
    >
      <div className="container p-2">
        <Link className="navbar-brand " to = "/" style={{ marginLeft: "20px" }}>
          <img src="/images/logo.svg" alt="Zerodha" height="17" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end "
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link"  to= "/signup">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link"  to= "/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product" >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to = "/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link"  to = "/support">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
