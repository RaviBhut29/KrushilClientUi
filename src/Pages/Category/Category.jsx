import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import BreadCrub from "../../Layout/BreadCrub";
import { REACT_APP, setLoadingStatus } from "../../FlysesApi";
import { toastError, toastWarning } from "../../FlysesApi/FlysesApi";
import { getCategory } from "../../FlysesApi/Category";
import "./Category.css";
import { useNavigate } from "react-router-dom";

export const Category = () => {
  const history = useNavigate();
  const [serviceName,setServiceName] = useState("");

  const siteMapPath = [
    {
      name: "Home",
      clickable: true,
      isHome: true,
      path: "/home",
    },
    {
      name: "Services",
      clickable: true,
      isHome: false,
      path: "/services",
    },
    {
      name: serviceName,
      clickable: false,
      isHome: false,
      path: "",
    },
  ];

  const [categoriesList, setCategoriesList] = useState([]);

  let path = window.location.pathname;
  let splitdata = path.split("/");

  useEffect(() => {
    window.scrollTo(0,0);
    setLoadingStatus(true);
    // setTimeout(() => {
    getAllCategories();
    // }, 1000);

  }, []);

  const getAllCategories = () => {
    try {
      getCategory(splitdata[splitdata.length - 1])
        .then((response) => {
          if (response.length > 0) {
            setServiceName(response[0]?.ctServiceName)
            setCategoriesList(response);
          } else {
            setCategoriesList([]);
            toastWarning("Category not found.");
            history(`/services`);
          }
          setLoadingStatus(false);
        })
        .catch(() => {
          toastError("Bad response from server");
        });
    } catch {
      toastError("Bad response from server");
    }
  };

  const replaceDescription = (htmlString) => {
    return (
      <div
        className="cardDescText"
        dangerouslySetInnerHTML={{ __html: htmlString }}
      ></div>
    );
  };

  const getCategoryIcon = (id) => {
    console.warn(id);
    return (
      <img src={`${REACT_APP}category/getCategoryFile/${id}`} alt="star" />
    );
  };

  const handleCategoryClick = (id) => {
    history(`/product/${id}`);
  };

  return (
    <div className="home">
      <div className="container logo-design" style={{ position: "relative" }}>
        {/* Navigation */}
        <Header />
        {/* Navigation */}
        <BreadCrub siteMapPath={siteMapPath} />
        <div className="my-5">
          <p className="h1 title1">
            Many Types of Logos to Inspire Your Next Design
          </p>
          <p className="title2">
            There are many different types of logos, and we’re going to provide
            all of them in this plate-form. we’ll pinpoint the pros and cons, so
            you can make the best decision when creating a logo design.
          </p>
        </div>
      </div>
      <div className="container text-center justify-content-center pb-5 Product-cards logo-design">
        <div
          className="row lead text-lg-start justify-content-center"
          style={{ background: "#ffffff" }}
        >
          {categoriesList &&
            categoriesList.map((item) => {
              return (
                <div
                  className="col-3 d-flex justify-content-center mb-3"
                  onClick={() => handleCategoryClick(item.ctId)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card">
                    <div className="card-body">
                      {getCategoryIcon(item.ctImageId)}
                      <h5 className="card-title my-3 px-3">{item?.ctName}</h5>
                      <p className="card-text mx-3">
                        <span className="amount">₹{item?.ctPrice}</span>
                        <span className="mx-2">from Starting</span>
                      </p>
                      {replaceDescription(item?.ctTitle)}
                      <p className="card-text discount mx-3 my-3">
                        <span>Save up to {item?.ctDiscount}%</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <p className="text-center mb-5 logo-design">
        <span className="b1">Grow faster with help your customers</span>
        <br />
        <span className="b2 mt-3">
          Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
          consectetur.Lorem ipsum dolor sit amet consectetur.
        </span>
      </p>
      <section>
        <div className="container logo-design">
          <div className="row justify-content-center">
            <div className="col-3 d-flex justify-content-center">
              <div
                className="card icon-link"
                style={{ width: "18rem", border: "none", boxShadow: "none" }}
              >
                <img
                  className="my-3"
                  src="../ui/Images/rating-review.svg"
                  alt="Card image cap"
                />
                <div
                  className="rhead"
                  style={{ backgroundColor: "#ffffff", border: "none" }}
                >
                  <p>Ratings &amp; Reviews</p>
                </div>
                <div className="rbody">
                  <p>
                    Collect reviews, Q&amp;A and other content from your
                    customers started.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3 d-flex justify-content-center">
              <div
                className="card icon-link"
                style={{ width: "18rem", border: "none", boxShadow: "none" }}
              >
                <img
                  className="my-3"
                  src="../ui/Images/rating-review.svg"
                  alt="Card image cap"
                />
                <div
                  className="rhead"
                  style={{ backgroundColor: "#ffffff", border: "none" }}
                >
                  <p>Ratings &amp; Reviews</p>
                </div>
                <div className="rbody">
                  <p>
                    Collect reviews, Q&amp;A and other content from your
                    customers started.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3 d-flex justify-content-center">
              <div
                className="card icon-link"
                style={{ width: "18rem", border: "none", boxShadow: "none" }}
              >
                <img
                  className="my-3"
                  src="../ui/Images/rating-review.svg"
                  alt="Card image cap"
                />
                <div
                  className="rhead"
                  style={{ backgroundColor: "#ffffff", border: "none" }}
                >
                  <p>Ratings &amp; Reviews</p>
                </div>
                <div className="rbody">
                  <p>
                    Collect reviews, Q&amp;A and other content from your
                    customers started.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <div className="footer-sec">
        <div className="mailing-section">
          <div className="container">
            <div className="mailing-col">
              <h3 className="text-gradient">Ready to get started?</h3>
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
              <img src="../ui/Images/logo.svg" alt="main logo" />
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
                © 2023 Flyses. All rights reserved. Terms &amp; Condition
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
                <div className="footer-ddl me-3">
                  <select>
                    <option
                      style={{ backgroundImage: "url(../ui/Images/VISA.png)" }}
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
    </div>
  );
};
