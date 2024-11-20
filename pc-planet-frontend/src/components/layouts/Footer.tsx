import React from "react";

const Footer = () => {
  return (
    <div className="app-main-color text-white py-3 mt-2 footer">
      <footer className="container ">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column">
            <span>&#169; Computer Planet, Inc</span>
            <span>SUPPORT</span>
          </div>
          <div>
            <h6>ABOUT US</h6>
            <ul className="">
              <li className="nav-item">Online Delivery</li>
              <li className="nav-item">EMI Terms</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
