import React from 'react'

const MainFooter = () => {
  return (
    <div className="footer-sec">
        <div className="mailing-section">
          <div className="container">
            <div className="mailing-col">
              <h3 className="text-gradient">Ready to get started hey?</h3>
              <p className="grey-text text-center">
                Products on online services or over the Internet. Electronic
                commerce draws on technologies such as mobile commerce
                application
              </p>
              <div className="mailing-input">
                <input type="text" placeholder="Enter mail address" />
                <button className="blue-btn btn btn-secondary mt-3">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
            <div className="logo cursor-pointer">
              <img src="../assets/ui/Images/logo.svg" alt="main logo" />
            </div>
            <div className="row mt-1 mb-2">
              <div className="col">
                <div className="footer-col">
                  <ul>
                    <li>
                      <a>Services</a>
                    </li>
                    <li>
                      <a>Portfolio</a>
                    </li>
                    <li>
                      <a>How it work</a>
                    </li>
                    <li>
                      <a>FAQs</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <ul>
                  <li>
                    <a>About us</a>
                  </li>
                  <li>
                    <a>Contact us</a>
                  </li>
                  <li>
                    <a>Privacy &amp; Policy</a>
                  </li>
                  <li>
                    <a>Trust &amp; Safety</a>
                  </li>
                </ul>
              </div>
              <div className="col">
                <ul>
                  <li>
                    <a>Logo Design</a>
                  </li>
                  <li>
                    <a>Brand Design</a>
                  </li>
                  <li>
                    <a>Stationery Design</a>
                  </li>
                  <li>
                    <a>Social Media</a>
                  </li>
                </ul>
              </div>
              <div className="col">
                <ul>
                  <li>
                    <a>Business Card Design</a>
                  </li>
                  <li>
                    <a>Lable Design</a>
                  </li>
                  <li>
                    <a>Banner Design</a>
                  </li>
                  <li>
                    <a>Hoardings Design</a>
                  </li>
                </ul>
              </div>
              <div className="col">
                <ul>
                  <li>
                    <a>Billboard Design</a>
                  </li>
                  <li>
                    <a>Brochure Design</a>
                  </li>
                  <li>
                    <a>Catalogue Design</a>
                  </li>
                  <li>
                    <a>Flayer Design</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bottom-col d-flex align-items-center justify-content-between">
              <p className="cursor-pointer grey-text">
                © 2023 Flyses. All rights reserved. Terms &amp; Condition.
              </p>
              <div className="d-flex align-items-center">
                <div className="footer-link-icon">
                  <twitter>
                    <i className="fa-brands fa-twitter" />
                  </twitter>
                </div>
                <div className="footer-link-icon">
                  <instagram>
                    <i className="fa-brands fa-instagram" />
                  </instagram>
                </div>
                <div className="footer-link-icon">
                  <facebook>
                    <i className="fa-brands fa-facebook-f" />
                  </facebook>
                </div>
                <div className="footer-link-icon">
                  <linkedin>
                    <i className="fa-brands fa-linkedin-in" />
                  </linkedin>
                </div>
                <div className="footer-ddl me-3">
                  <select>
                    <option
                      style={{
                        backgroundImage: "url(../assets/ui/Images/VISA.png)",
                      }}
                    >
                      INR
                    </option>
                  </select>
                </div>
                <div className="footer-ddl">
                  <select>
                    <option>Eng</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MainFooter
