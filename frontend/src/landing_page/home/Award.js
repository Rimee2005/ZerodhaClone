import React from 'react';


function Awards() {
    return (  
       <div className='container mt-5'>
           <div className='row'>
            <div className='col-6 p-6'>
                <img src='/images/largestBroker.svg'></img>
            </div>
            <div className='col-6 p-6 mt-4'>
                <h1>Largest Stock broker in India</h1>
                <p className='mb-5'>2+ million zerodha clients contribute to over 15% of all 
                    Volumes in India by trading and investing in :
                    </p>
                    <div className='row'>
                    <div className='col-6'>
                        <ul>
                            <li><p>Future and Options</p></li>
                            <li><p>Commodity derivatives</p></li>
                            <li><p> Currency derivatives</p></li>
                        </ul>
                        </div>
                        <div className='col-6'>
                        <ul>
                            <li><p>Stop and IPOs</p></li>
                            <li><p>Direct mutual funds</p></li>
                            <li><p>Bonds and Goverment security</p></li>
                        </ul>
                        </div>
                        </div>
                       <img src='\images\pressLogos.png' className='mt-4' style={{width: "90%"}}></img>
            </div>
           </div>
       </div>
    );
}

export default Awards;