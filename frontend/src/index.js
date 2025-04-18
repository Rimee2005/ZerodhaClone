import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./landing_page/home/HomePage";
import AboutPage from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/product/ProductPage";
import SupportPage from "./landing_page/support/SupportPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";
import NotFound from "./landing_page/NotFound";
import SignupPage from "./landing_page/signup/SignupPage";
import Dashboard from "./components/Dashboard";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/" element={<HomePage/>} /> 
    <Route path="/signup/*" element={<SignupPage/>}/>
    <Route path="/about" element={<AboutPage/>}/>
    <Route path="/product" element={<ProductPage/>}/>
    <Route path="/pricing" element={<PricingPage/>}/>
    <Route path="/support" element={<SupportPage/>}/>
    <Route path="/*" element={<NotFound/>}/>
    <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
