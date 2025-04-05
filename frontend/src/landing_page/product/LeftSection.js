import React from "react";

function LeftSection({
  imageUrl,
  productName,
  productDescription,
  tryDemo,
  leranMore,
  googlePlay,
  appStore,
}) {
  return (
    
    <div className="container">
      <div className="row mt-5 p-5">
        <div className="col-6 p-3">
          <img src={imageUrl} 
          style={{width:"90%"}}></img>
        </div>
        <div className="col-6 p-3">
          <h1
           style={{color:"#424242"}}
          >{productName} </h1>
          <p>{productDescription}</p>
          <div>
            <a href={tryDemo} style={{textDecoration:"none"}}>
              Try Demo <i class="fa-solid fa-arrow-right"></i>
            </a>
            <a href={leranMore} style={{marginLeft:"2rem" , textDecoration:"none"}}>
              Learn More <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <div className="mt-4">
          <a href={googlePlay}>
            <img src="/images/googlePlayBadge.svg"></img>
          </a>
          <a href={appStore}  style={{marginLeft:"2rem"}}>
            <img src="/images/appstoreBadge.svg"></img>
          </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LeftSection;
