import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-sec">
      <div className="mailing-section">
        <div className="container">
          <div className="mailing-col">
            <h3 className="text-gradient">Ready to get started?</h3>
            <p className="grey-text text-center">
              Products on online services or over the Internet. Electronic
              commerce draws on technologies such as mobile commerce application
            </p>
            <div className="mailing-input">
              <input type="text" placeholder="Enter mail address" />
              <button className="blue-btn btn btn-secondary mt-3">Send</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="container">
          <div className="logo cursor-pointer">
            <img src="../ui/Images/logo.svg" alt="main logo" />
          </div>
          
          <div className="bottom-col d-flex align-items-center justify-content-between">
            <p className="cursor-pointer grey-text">
              © 2023 Flyses. All rights reserved. {" "}
              <Link to="">Terms &amp; Condition.</Link>
            </p>
            <div className="d-flex align-items-center">
              <div className="footer-link-icon">
                {/* <twitter> </twitter> */}
                <i className="fa-brands fa-twitter" />
              </div>
              <div className="footer-link-icon">
                {/* <instagram> </instagram> */}
                <i className="fa-brands fa-instagram" />
              </div>
              <div className="footer-link-icon">
                {/* <facebook> </facebook> */}
                <i className="fa-brands fa-facebook-f" />
              </div>
              <div className="footer-link-icon">
                {/* <linkedin> </linkedin> */}
                <i className="fa-brands fa-linkedin-in" />
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
