import React from 'react';

function RightSection({ imageUrl, productName, productDescription, tryDemo }) {
    return (  
        <div className="container">
            <div className="row mt-5 p-5 ">
                {/* Description Section on the left */}
                <div className="col-4  mt-5 p-3 ">
                    <h1
                    className='mt-5'
                     style={{ color: "#424242" }}>{productName}</h1>
                    <p>{productDescription}</p>
                    <div>
                        <a 
                            href={tryDemo} 
                            style={{ textDecoration: "none" }}>
                            Learn More <i className="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
                {/* Image Section on the right */}
                <div className="col-8  p-5 ">
                    <img 
                        src={imageUrl} 
                        alt={productName} 
                        style={{ width: "80%" }} 
                    />
                </div>
            </div>
        </div>
    );
}

export default RightSection;
