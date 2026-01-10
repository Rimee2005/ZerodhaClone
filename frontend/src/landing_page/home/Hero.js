import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (  
      <div className='container p-5 text-center mb-5'>
          <div className='row'>
          <img src="/images/homeHero.png" alt="Hero"  className='mb-3' />
          <h1 className='mt-1.5'>Invest in everything</h1>
          <p1>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p1>
          <Link to="/signup" style={{ textDecoration: 'none', display: 'inline-block', width: '20%', margin: '10px auto 0' }}>
            <button className="p-1 btn btn-primary fs-5 mb-3 mt-4" style={{width:"100%" , backgroundColor:"#387ED1" }}>Signup for free</button>
          </Link>
          </div>
      </div>
    );
}

export default Hero;