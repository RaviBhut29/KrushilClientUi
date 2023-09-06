import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setLoadingStatus } from "../FlysesApi";
import { getService } from "../FlysesApi/Services";
import { toastError } from "../FlysesApi/FlysesApi";
import { Radio } from "react-feather";
import { Switch } from 'antd';

const Header = () => {
  const navigate = useNavigate();

  let path = window.location.pathname;
  let splitdata = path.split("/");

  const location = useLocation();
  const [profile, setProfile] = useState(false);
  const [MobileMenu, setMobileMenu] = useState(false);
  const [NotificationPopup, setNotificationPopup] = useState(false);
  const [servicesNameList, setServicesNameList] = useState([]);
  const [servicesNameListBCK, setServicesNameListBCK] = useState([]);

  const handleProfileClick = () => {
    setProfile(!profile);
  };

  const MobileMenuClick = () => {
    setMobileMenu(!MobileMenu);
  };

  const NotificationClick = () => {
    setNotificationPopup(!NotificationPopup);
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
    const userProfile = document.getElementsByClassName("userProfile")[0];
    const MenuButton = document.getElementsByClassName("menu-btn")[0];
    const onMobileNavbar = document.getElementsByClassName("on-mobile-navbar")[0];
    const Notification = document.getElementsByClassName("general-notification")[0];
    const NotificationPopup = document.getElementsByClassName("Notification_Popup")[0];

    if (panelRef.current && !panelRef.current.contains(event.target)) {
      setSearchShow(false);
    }

    if (userProfile != undefined) {
      if (!userProfile.contains(event.target)) {
        setProfile(false);
      }
    }

    if (onMobileNavbar != undefined) {
      if (!onMobileNavbar.contains(event.target) && !MenuButton.contains(event.target)) {
        setMobileMenu(false);
      }
    }

    if (Notification != undefined) {
      if (!Notification.contains(event.target) && !NotificationPopup.contains(event.target)) {
        setNotificationPopup(false);
      }
    }
  };

  const handleSearchText = (text) => {
    const array = JSON.parse(servicesNameListBCK).filter((item) =>
      item?.srName.toLowerCase().includes(text.toLowerCase())
    );
    setServicesNameList(array);
  };

  const NotificationAlertClick = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    // <header style={{ marginTop: "1.1rem" }}>
    <header>
      <div className="menu-btn" onClick={MobileMenuClick} style={{ cursor: "pointer" }}>
        <img src="../ui/Images/menu-icon.svg" alt="bell" />
      </div>
      <a href="#" className="logo">
        <img className="logo_img" src="../ui/Images/NewLogo.svg" alt="Main Logo" />
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
                  ? "navActive"
                  : ""
              }
              to={"/home"}
            >
              Home
            </Link>
            <Link
              className={
                location.pathname === "/portfolio" ? "navActive" : ""
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
                    ? "navActive"
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
                location.pathname.includes("/howitwork") ? "navActive" : ""
              }
              to={"/howitwork"}
            >
              How It work
            </Link>
            <Link
              className={
                location.pathname.includes("/about") ? "navActive" : ""
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
            className={`form-control nav-search ${searchShow ? "nav-search-class" : ""
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
          <div className="general-notification" onClick={NotificationClick}>
            <span className="badge-yellow" />
            <img src="../ui/Images/bell.svg" alt="bell" />
          </div>
          <div className="Notification_Popup" style={{ display: NotificationPopup ? "block" : "none" }}>
            <div className="form-row">
              <div className="col-md-12 px-4 mt-3 border-bottom">
                <p className="Notification_Title">Notification <span>6 New</span></p>
              </div>
              {/* <hr style={{ border: "2px solid #CED4DA" }} /> */}
              <div className="col-md-12 px-4 py-2 border-bottom">
                <p className="NotificationLabel">Reminder: please provide details for..</p>
                <p className="NotificationDate">Mar 15 12:50pm</p>
              </div>
              {/* <hr style={{ border: "2px solid #CED4DA" }} /> */}
              <div className="col-md-12 px-4 py-2 border-bottom">
                <p className="NotificationLabel">Get 50% Offer with flyses</p>
                <p className="NotificationDate">You have 5+ offer in this account</p>
              </div>
              {/* <hr style={{ border: "2px solid #CED4DA" }} /> */}
              <div className="col-md-12 px-4 py-2 border-bottom">
                <p className="NotificationLabel">Thanks for filling out form-19.</p>
                <p className="NotificationDate">Update Sketch to 69</p>
              </div>
              {/* <hr style={{ border: "2px solid #CED4DA" }} /> */}
              <div className="col-md-12 px-4 py-2 border-bottom">
                <p className="NotificationLabel">New Customer is registered 👏🏻</p>
                <p className="NotificationDate">an hour ago</p>
              </div>
              <div className="col-md-12 px-4 py-2 border-bottom">
                <p className="NotificationAlert">Notification Alert
                  <Switch defaultChecked onChange={NotificationAlertClick} style={{ float: "right", background: '#0C0D48', height: "24px" }} />
                  {/* <input type="checkbox" style={{ float: "right" }} /> */}
                </p>
              </div>
              <div className="col-md-12 px-4 py-2 border-bottom">
                <p className="NotificationLabel">Your order has been create successfully</p>
                <p className="NotificationDate">8 hours ago</p>
              </div>
              <div className="col-md-12 px-4 py-3 border-bottom">
                <button className="me-2 btn-navigation">Read All Notifications</button>
              </div>

            </div>
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
              <div className="LoginProfile img_profile text-center" alt="userProfile" style={{ paddingTop: "10px" }} >
                <label className="profileLabel" style={{ cursor: "pointer" }}>
                  {sessionStorage.getItem("userSortName").toUpperCase() || ""}
                </label>
              </div>
              <div
                className="userDropdown"
                style={{ display: profile ? "block" : "none" }}
              >
                <Link to="/profile">
                  <img
                    className="img_profile"
                    src="../ui/Images/user-icon.svg"
                    alt="userProfile"
                  />
                  Profile
                </Link>
                <Link to="/order">
                  <img
                    className="img_profile"
                    src="../ui/Images/All-Order.svg"
                    alt="userProfile"
                  />
                  Orders
                </Link>
                <hr style={{ border: "2px solid #CED4DA" }} />
                <a href="#">Help and Support</a>
                <hr style={{ border: "2px solid #CED4DA" }} />
                <a onClick={handleLogOutClick}>
                  <img
                    className="img_profile"
                    src="../ui/Images/Log-Out.svg"
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
      <div className="on-mobile-navbar" style={{ display: MobileMenu ? "block" : "none" }}>
        <img src="../ui/Images/NewLogo.svg" style={{ height: 40 }} />
        <div className="btn" onClick={MobileMenuClick}>
          <span className="fa fa-close close-btn" onClick={MobileMenuClick} />
        </div>
        <div>
          <ul>
            <li>
              {/* <a href="#">Home</a> */}
              <Link
                className={location.pathname === "/" || location.pathname.includes("/home")
                  ? "navActive"
                  : ""
                }
                to={"/home"}
              >
                Home
              </Link>
            </li>

            <div className="nav_s_hide">
              <li className="Nav-Services">
                {/* <a href="#">Services</a> */}
                <Link
                  className={
                    location.pathname.includes("/services") ||
                      location.pathname.includes("/category") ||
                      location.pathname.includes("/product")
                      ? "navActive"
                      : ""
                  }
                  to={"/services"}
                >
                  Services
                </Link>
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
              {/* <a href="#">Portfolio</a> */}
              <Link
                className={
                  location.pathname === "/portfolio" ? "navActive" : ""
                }
                to={"/portfolio"}
              >
                Portfolio
              </Link>
            </li>
            <li>
              {/* <a href="#">How it Work</a> */}
              <Link
                className={
                  location.pathname.includes("/howitwork") ? "navActive" : ""
                }
                to={"/howitwork"}
              >
                How It work
              </Link>
            </li>
            <li>
              {/* <a href="#">About Us</a> */}
              <Link
                className={
                  location.pathname.includes("/about") ? "navActive" : ""
                }
                to={"/about"}
              >
                About Flyses
              </Link>
            </li>
          </ul>
          <hr style={{ margin: "20px 0" }} />
          <ul>
            <li>
              {/* <a href="#">Profile</a> */}
              <Link to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/chat">
                Message
              </Link>
              {/* <a href="#">Message</a> */}
            </li>
            <li>
              <Link to="/order">
                Orders
              </Link>
              {/* <a href="#">Orders</a> */}
            </li>
            {/* <li>
              <a href="#">English</a>
            </li>
            <li>
              <a href="#">INR</a>
            </li> */}
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
