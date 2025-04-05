import React from 'react';

function notFound() {
    return ( 
        <div className='container p-5 text-center mb-5 mt-5'>
        <div className='row'>
        <h1 className='mt-1.5'> 404 Not Found</h1>
        <p1>Sorry! The page you are looking for does not exist </p1>
        <button  className= "p-1 btn btn-primary fs-5 mb-3 mt-4" 
        style={{width:"20%" ,  margin: "10px auto 0", backgroundColor:"#387ED1" }}>
            </button>
        </div>
    </div>
     );
}

export default notFound;