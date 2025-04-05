import React from 'react';


function Education() {
    return (  
        <div className="container mt-5">
        <div className="row">
          <div className="col-6 p-6">
          <img src="images\education.svg" style={{ width: "80%" }} ></img>
          </div>
          <div className="col-6 p-6 mt-5">
          <h2 className="mt-7" style={{ color: "#424242" }}>Free and open market education</h2>
            <p className='mt-3'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
            <a href=""style={{textDecoration:"none"}}>Varsity
            <i class="fa-solid fa-arrow-right"></i>
            </a>
            <p className='mt-5'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
            <a href=""style={{textDecoration:"none"}}>TrandingQ&A
            <i class="fa-solid fa-arrow-right"></i>
            </a>
             </div>
        </div>
      </div>
    );
}

export default Education;