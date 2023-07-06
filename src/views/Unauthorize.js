import React from "react";

const Unauthorize = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="notfound">
        <div className="notfound-404">
          <h1>401</h1>
        </div>
        <h2>We are sorry, <br />You are not authorized!</h2>
        <p>The page you are looking for might have been blocked by server.</p>
      </div>
    </div>
  );
}

export default Unauthorize