import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CreateEmailAssociated } from "../FlysesApi/Services";
import { toastError, toastSuccess } from "../FlysesApi/FlysesApi";
import {
  setLoadingStatus,
} from "../FlysesApi";

const Footer = (href) => {
  const twitterAnchorRef = useRef(null);
  const instaAnchorRef = useRef(null);
  const facebookAnchorRef = useRef(null);
  const inAnchorRef = useRef(null);

  const handleClick = (href) => {
    if (twitterAnchorRef.current && href === "t") {
      twitterAnchorRef.current.click();
    }
    if (instaAnchorRef.current && href === "i") {
      instaAnchorRef.current.click();
    }
    if (facebookAnchorRef.current && href === "f") {
      facebookAnchorRef.current.click();
    }
    if (inAnchorRef.current && href === "in") {
      inAnchorRef.current.click();
    }
  };

  const [mailText, setMailText] = useState("");

  const handleSendEmailClick = () => {
    setLoadingStatus(true)
    CreateEmailAssociated({ email: mailText })
      .then((response) => {
        setMailText("");
        toastSuccess("Email address submit successfully.");
      })
      .catch(() => {
        toastError("Bad response from server");
      })
      .finally(() => setLoadingStatus(false));
  };

  return (
    <div className="footer-sec">
      <div className="mailing-section">
        <div className="container position-relative">
          <div className="mailing-col">
            <h3 className="text-gradient">Ready to get started?</h3>
            <p className="grey-text text-center">
              Products on online services or over the Internet. Electronic
              commerce draws on technologies such as mobile commerce application
            </p>
            <div className="mailing-input">
              <input
                type="text"
                placeholder="Enter mail address"
                value={mailText}
                onChange={(e) => setMailText(e.target.value)}
              />
              <button
                className="blue-btn btn btn-secondary mt-3"
                onClick={handleSendEmailClick}
                type="button"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="container">
          <div className="logo cursor-pointer">
            <img src="/ui/Images/NewLogo.svg" alt="main logo" />
          </div>

          <div className="bottom-col d-flex align-items-center justify-content-between">
            <p className="cursor-pointer grey-text">
              © 2023 Flyses. All rights reserved.{" "}
              <Link to="/termsandcondition">Terms &amp; Condition.</Link> &{" "}
              <Link to="/privacypolicy">Privacy policy</Link>
            </p>
            <a
              ref={twitterAnchorRef}
              href={"https://www.twitter.com/"}
              target="_blank"
              style={{ display: "none" }}
            >
              Hidden Link
            </a>
            <a
              ref={instaAnchorRef}
              href={"https://www.instagram.com/flyses_in/"}
              target="_blank"
              style={{ display: "none" }}
            >
              Hidden Link
            </a>
            <a
              ref={facebookAnchorRef}
              href={"https://www.facebook.com/profile.php?id=100089973826423"}
              target="_blank"
              style={{ display: "none" }}
            >
              Hidden Link
            </a>
            <a
              ref={inAnchorRef}
              href={"https://www.linkedin.com/company/flyses/"}
              target="_blank"
              style={{ display: "none" }}
            >
              Hidden Link
            </a>

            <div className="d-flex align-items-center">
              <div className="footer-link-icon">
                <i
                  className="fa-brands fa-x-twitter fa-lg"
                  onClick={() => handleClick("t")}
                />
              </div>
              <div className="footer-link-icon">
                <i
                  className="fa-brands fa-instagram fa-lg"
                  onClick={() => handleClick("i")}
                />
              </div>
              <div className="footer-link-icon">
                <i
                  className="fa-brands fa-facebook-f fa-lg"
                  onClick={() => handleClick("f")}
                />
              </div>
              <div className="footer-link-icon">
                <i
                  className="fa-brands fa-linkedin-in fa-lg"
                  onClick={() => handleClick("in")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
