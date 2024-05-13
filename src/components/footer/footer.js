import React from "react";

const Footer = () => {
    return (
      <footer className="bg-dark text-light p-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>All rights reserved</h5>
              <p>Pulse Of The Underground 2024 .</p>
            </div>
            <div className="col-md-4">
              <h5>Developed by </h5>
              <p>Vaggelis tzimas .</p>
            </div>
            <div className="col-md-4">
              <h5>Help us to grow </h5>
              <a href="https://www.buymeacoffee.com/tzimasvagg7" className="btn btn-primary w-50">Donate</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;