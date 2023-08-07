import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setLoadingStatus } from "../FlysesApi";
import { getService } from "../FlysesApi/Services";
import { toastError } from "../FlysesApi/FlysesApi";

const Header = () => {
  const navigate = useNavigate();

  let path = window.location.pathname;
  let splitdata = path.split("/");

  const location = useLocation();
  const [profile, setProfile] = useState(false);
  const [servicesNameList, setServicesNameList] = useState([]);
  const [servicesNameListBCK, setServicesNameListBCK] = useState([]);

  const handleProfileClick = () => {
    setProfile(!profile);
  };

  const handleLogOutClick = () => {
    sessionStorage.setItem("FlysesUserPass", "");
    sessionStorage.setItem("FlysesUserEmail", "");
    sessionStorage.setItem("userSortName", "");
    sessionStorage.setItem("userId", 0);
    sessionStorage.setItem("isGoogleUser", false);
    navigate("/login");
  };

  useEffect(() => {
    setLoadingStatus(true);
    getAllServices();
  }, []);

  const getAllServices = () => {
    getService("null")
      .then((response) => {
        if (response.length > 0) {
          setServicesNameList(response);
          setServicesNameListBCK(JSON.stringify(response));
        } else {
          setServicesNameList([]);
          setServicesNameListBCK([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const [searchShow, setSearchShow] = useState(false);
  const handleSearchFocusClick = () => {
    setSearchShow(true);
  };

  const panelRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      setSearchShow(false);
    }
  };

  const handleSearchText = (text) => {
    const array = JSON.parse(servicesNameListBCK).filter((item) =>
      item?.srName.toLowerCase().includes(text.toLowerCase())
    );
    setServicesNameList(array);
  };

  return (
    <header style={{ marginTop: "1.1rem" }}>
      <div className="menu-btn">
        <img src="../ui/Images/menu-icon.png" alt="bell" />
      </div>
      <a href="#" className="logo">
        <img className="logo_img" src="../ui/Images/logo.svg" alt="Main Logo" />
      </a>
      <nav className="navbar">
        <div className="btn">
          <span className="fa fa-close close-btn" />
        </div>
        {!searchShow && (
          <>
            <Link
              className={
                location.pathname === "/" || location.pathname.includes("/home")
                  ? "active"
                  : ""
              }
              to={"/home"}
            >
              Home
            </Link>
            <Link
              className={
                location.pathname.includes("/protfolio") ? "active" : ""
              }
              to={"/portfolio"}
            >
              Portfolio
            </Link>
            <div className="s_hide">
              <Link
                className={
                  location.pathname.includes("/services") ||
                  location.pathname.includes("/category") ||
                  location.pathname.includes("/product")
                    ? "active"
                    : ""
                }
                to={"/services"}
              >
                Services
              </Link>
              <div className="ddl">
                <div className="first-ddl">
                  {servicesNameList.length > 0 &&
                    servicesNameList.map((item, index) => {
                      if (index < 5) {
                        return (
                          <Link
                            key={item?.srId}
                            to={
                              splitdata[1] === "category"
                                ? `/services/${item?.srId}`
                                : `/category/${item?.srId}`
                            }
                          >
                            {item.srName}
                          </Link>
                        );
                      }
                    })}
                </div>
                <div className="Second-ddl">
                  {servicesNameList.length > 0 &&
                    servicesNameList.map((item, index) => {
                      if (index < 10 && index > 4) {
                        return (
                          <Link
                            key={item?.srId}
                            to={
                              splitdata[1] === "category"
                                ? `/services/${item?.srId}`
                                : `/category/${item?.srId}`
                            }
                          >
                            {item.srName}
                          </Link>
                        );
                      }
                    })}
                </div>
              </div>
            </div>
            <Link
              className={
                location.pathname.includes("/howitwork") ? "active" : ""
              }
              to={"/howitwork"}
            >
              How It work
            </Link>
            <Link
              className={
                location.pathname.includes("/about") ? "active" : ""
              }
              to={"/about"}
            >
              About Flyses
            </Link>
          </>
        )}

        <div className="search" ref={panelRef} onClick={handleSearchFocusClick}>
          <img
            className="nav-search-img"
            src="../ui/Images/search.svg"
            alt="Search icon"
            style={{
              cursor: "pointer",
              display: !searchShow ? "block" : "none",
            }}
          />

          <input
            className={`form-control nav-search ${
              searchShow ? "nav-search-class" : ""
            }`}
            placeholder="Search"
            onChange={(e) => handleSearchText(e.target.value)}
          />
          <div
            className={`ddl_search ${searchShow ? "ddl_search_active" : ""}`}
          >
            <div className="row">
              {servicesNameList.length > 0 ? (
                servicesNameList.map((item) => {
                  return (
                    <div key={item?.srId}>
                      <Link
                        to={
                          splitdata[1] === "category"
                            ? `/services/${item?.srId}`
                            : `/category/${item?.srId}`
                        }
                      >
                        {item?.srName}
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div>
                  <a>Not found.</a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="notifications d-flex justify-content-center align-items-center mb-2">
          <div className="general-notification">
            <span className="badge-yellow" />
            <img src="../ui/Images/bell.svg" alt="bell" />
          </div>
          <div className="mail-notification">
            <span className="badge-green" />
            <img src="../ui/Images/mail.svg" alt="mail" />
          </div>
          {(sessionStorage.getItem("userSortName") || "") === "" && (
            <div className="language">
              <img
                src="../ui/Images/world.svg"
                style={{ marginRight: 7 }}
                alt="world"
              />
              <Link className="Login" to="/login">
                Login
              </Link>
            </div>
          )}
          {(sessionStorage.getItem("userSortName") || "") !== "" && (
            <div className="userProfile" onClick={handleProfileClick}>
              <div className="LoginProfile img_profile" alt="userProfile" />
              <label className="profileLabel" style={{ cursor: "pointer" }}>
                {sessionStorage.getItem("userSortName").toUpperCase() || ""}
              </label>
              <div
                className="userDropdown"
                style={{ display: profile ? "block" : "none" }}
              >
                <Link to="/profile">
                  <img
                    className="img_profile"
                    src="../ui/Images/user-icon.png"
                    alt="userProfile"
                  />
                  Profile
                </Link>
                <Link to="/order">
                  <img
                    className="img_profile"
                    src="../ui/Images/orders-icon.png"
                    alt="userProfile"
                  />
                  Orders
                </Link>
                <hr />
                <a href="#">Help and Support</a>
                <hr />
                <a onClick={handleLogOutClick}>
                  <img
                    className="img_profile"
                    src="../ui/Images/logout-icon.png"
                    alt="userProfile"
                  />
                  <span style={{ color: "#dd3d4c" }}>Logout</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="mobile-noti general-notification">
        <img src="../ui/Images/bell.svg" alt="bell" />
      </div>
      <div className="on-mobile-navbar">
        <img src="../ui/Images/logo.svg" style={{ height: 40 }} />
        <div className="btn">
          <span className="fa fa-close close-btn" />
        </div>
        <div>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <div className="nav_s_hide">
              <li className="Nav-Services">
                <a href="#">Services new</a>
              </li>
              <div className="ddl">
                <div className="first-ddl">
                  <a href="#">Logo Design</a>
                  <a href="#">Brand Identity</a>
                  <a href="#">Label design</a>
                  <a href="#">Stationery Design</a>
                  <a href="#">Social media</a>
                </div>
                <div className="Second-ddl">
                  <a href="#">Business Card Design</a>
                  <a href="#">Products Packaging Design</a>
                  <a href="#">Banner/Hoardings/Billboard</a>
                  <a href="#">Brochure/catalogue/Flayr</a>
                  <a href="#">WordPress Website Development</a>
                </div>
              </div>
            </div>
            <li>
              <a href="#">How it Work</a>
            </li>
            <li>
              <a href="#">Portfolio</a>
            </li>
          </ul>
          <hr style={{ margin: "20px 0" }} />
          <ul>
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <a href="#">Message</a>
            </li>
            <li>
              <a href="#">Orders</a>
            </li>
            <li>
              <a href="#">English</a>
            </li>
            <li>
              <a href="#">INR</a>
            </li>
            <li>
              <a href="#">Help &amp; Support</a>
            </li>
          </ul>
          <hr style={{ margin: "20px 0" }} />
          <div className="log-out">
            <a href="#">Log out</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
