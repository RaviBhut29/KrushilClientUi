import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  encrptWithRk,
  getChatList,
  getIsNewNotification,
  setChatList,
  setIsNewNotification,
  setLoadingStatus,
} from "../FlysesApi";
import {
  CreateUserWiseReadNotification,
  getService,
  getUserWiseReadNotification,
} from "../FlysesApi/Services";
import { toastError, toastSuccess } from "../FlysesApi/FlysesApi";
import { Radio } from "react-feather";
import { Switch } from "antd";
import { useAtom } from "@dbeining/react-atom";
import { getChatDetail, getNotification } from "../FlysesApi/Chat";

const Header = () => {
  const navigate = useNavigate();
  const loginUserId = sessionStorage.getItem("userId") || 0;

  let path = window.location.pathname;
  let splitdata = path.split("/");

  const location = useLocation();
  const [profile, setProfile] = useState(false);
  const [MobileMenu, setMobileMenu] = useState(false);
  const [NotificationPopup, setNotificationPopup] = useState(false);
  const [servicesNameList, setServicesNameList] = useState([]);
  const [servicesNameListBCK, setServicesNameListBCK] = useState([]);
  const [MessagePopup, setMessagePopup] = useState(false);
  const { chatList } = useAtom(getChatList);
  const { userNotification, localNotification } = useAtom(getIsNewNotification);

  const handleProfileClick = () => {
    setProfile(!profile);
  };

  const MobileMenuClick = () => {
    setMobileMenu(!MobileMenu);
  };

  const handleLogOutClick = () => {
    sessionStorage.setItem("FlysesUserPass", "");
    sessionStorage.setItem("FlysesUserEmail", "");
    sessionStorage.setItem("userSortName", "");
    sessionStorage.setItem("userId", 0);
    sessionStorage.setItem("isGoogleUser", false);
    toastSuccess("Logout successfully.");
    navigate("/Login");
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
    const onMobileNavbar =
      document.getElementsByClassName("on-mobile-navbar")[0];
    const Notification = document.getElementsByClassName(
      "general-notification"
    )[0];
    const NotificationPopup =
      document.getElementsByClassName("Notification_Popup")[0];

    if (panelRef.current && !panelRef.current.contains(event.target)) {
      setSearchShow(false);
    }

    if (userProfile != undefined) {
      if (!userProfile.contains(event.target)) {
        setProfile(false);
      }
    }

    if (onMobileNavbar != undefined) {
      if (
        !onMobileNavbar.contains(event.target) &&
        !MenuButton.contains(event.target)
      ) {
        setMobileMenu(false);
      }
    }

    if (Notification != undefined) {
      if (
        !Notification.contains(event.target) &&
        !NotificationPopup.contains(event.target)
      ) {
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

  const getChatMessageList = () => {
    if (chatList.length > 0) {
      const array = JSON.stringify(chatList);
      const data = JSON.parse(array);
      return data
        .sort((a, b) => (a?.ctId < b?.ctId ? 1 : -1))
        ?.filter((x) => Number(x?.ctIsRead) !== 1 && Number(x?.userRole) === 1);
    } else {
      return [];
    }
  };

  const getNotificationList = () => {
    if (notificationList.length > 0) {
      const array = JSON.stringify(notificationList);
      const data = JSON.parse(array);
      return data.sort((a, b) => (a?.ntid < b?.ntid ? 1 : -1));
    } else {
      return [];
    }
  };

  useEffect(() => {
    bindChatListFunction();
    getAllNotification();
  }, []);

  const [notificationList, setNotificationList] = useState([]);

  const getAllNotification = () => {
    try {
      setLoadingStatus(true);
      if (notificationList.length === 0) {
        getNotification()
          .then((response) => {
            if (response.length > 0) {
              setNotificationList(response);
              getReadNotification(response[response.length - 1]);
            } else {
              setNotificationList([]);
            }
            setLoadingStatus(false);
          })
          .catch(() => {
            toastError("Bad response from server");
          });
      }
    } catch {
      toastError("Bad response from server");
    }
  };

  const bindChatListFunction = () => {
    setLoadingStatus(true);
    const loginUserId = sessionStorage.getItem("userId") || 0;
    getChatDetail(loginUserId, 0)
      .then((response) => {
        if (response.length > 0) {
          setChatList(response);
        } else {
          setChatList([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const handleMessageReadClick = () => {
    navigate("/chat");
  };

  const handleAnchorClick = async (id, name) => {
    let url = "";
    const key = await encrptWithRk(id);
    if (splitdata[1] === "service") {
      url = `/services/${name.replace(/ /g, "-").toLowerCase()}/${key}`;
    } else {
      url = `/service/${name.replace(/ /g, "-").toLowerCase()}/${key}`;
    }
    navigate(url);
  };

  const getReadNotification = (notificationArray) => {
    const UserId = sessionStorage.getItem("userId") || 0;
    if (Number(UserId) !== 0) {
      setLoadingStatus(true);
      getUserWiseReadNotification(Number(UserId), notificationArray?.ntid)
        .then((response) => {
          if (Number(response) !== 0) {
            setIsNewNotification(false, localNotification);
          } else {
            setIsNewNotification(true, localNotification);
          }
        })
        .catch(() => {
          toastError("Bad response from server");
        })
        .finally(() => setLoadingStatus(false));
    }
  };

  const NotificationClick = () => {
    setNotificationPopup(!NotificationPopup);
    if (userNotification) {
      readNotification();
    }

    if (Number(loginUserId) === 0) {
      setIsNewNotification(userNotification, false);
    }
  };

  const readNotification = () => {
    const UserId = sessionStorage.getItem("userId") || 0;
    if (Number(UserId) !== 0) {
      const obj = {
        uwUserId: UserId,
        uwNotificationId: notificationList[notificationList.length - 1]?.ntid,
      };
      CreateUserWiseReadNotification(obj)
        .then((response) => {
          setIsNewNotification(false, localNotification);
        })
        .catch(() => {
          toastError("Bad response from server");
        })
        .finally(() => setLoadingStatus(false));
    }
  };

  useMemo(() => {
    console.warn("userNotification", userNotification);
  }, [userNotification]);

  return (
    // <header style={{ marginTop: "1.1rem" }}>
    <header>
      <div
        className="menu-btn"
        onClick={MobileMenuClick}
        style={{ cursor: "pointer" }}
      >
        <img src="/ui/Images/menu-icon.svg" alt="bell" />
      </div>
      <a href="#" className="logo">
        <img
          className="logo_img"
          src="/ui/Images/NewLogo.svg"
          alt="Main Logo"
        />
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
              className={location.pathname === "/portfolio" ? "navActive" : ""}
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
                          // <Link
                          //   key={item?.srId}
                          //   to={
                          //     splitdata[1] === "category"
                          //       ? `/services/${item?.srId}`
                          //       : `/category/${item?.srId}`
                          //   }
                          // >
                          //   {item.srName}
                          // </Link>
                          <a
                            key={item?.srId}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleAnchorClick(item?.srId, item?.srName)
                            }
                          >
                            {item.srName}
                          </a>
                        );
                      }
                    })}
                </div>
                <div className="Second-ddl">
                  {servicesNameList.length > 0 &&
                    servicesNameList.map((item, index) => {
                      if (index < 10 && index > 4) {
                        return (
                          <a
                            key={item?.srId}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleAnchorClick(item?.srId, item?.srName)
                            }
                          >
                            {item.srName}
                          </a>
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
            src="/ui/Images/search.svg"
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
                      {/* <Link
                        to={
                          splitdata[1] === "Category"
                            ? `/Services/${item?.srId}`
                            : `/Category/${item?.srId}`
                        }
                      >
                        {item?.srName}
                      
                      </Link> */}
                      <a
                        key={item?.srId}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleAnchorClick(item?.srId, item?.srName)
                        }
                      >
                        {item.srName}
                      </a>
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
          {Number(loginUserId) !== 0 && (
            <div
              className="general-notification"
              style={{ cursor: "pointer" }}
              onClick={NotificationClick}
            >
              {notificationList.length > 0 && true === userNotification && (
                <span className="badge-yellow" />
              )}
              <img src="/ui/Images/bell.svg" alt="bell" />
            </div>
          )}

          {Number(loginUserId) !== 0 && (
            <div
              className="Notification_Popup"
              style={{ display: NotificationPopup ? "block" : "none" }}
            >
              <div className="form-row">
                <div className="col-md-12 px-4 mt-3 border-bottom">
                  <p className="Notification_Title">Notification</p>
                </div>

                {notificationList.length > 0 &&
                  getNotificationList().map((item, index) => {
                    if (index < 5) {
                      return (
                        <div
                          className="col-md-12 px-4 py-2 border-bottom"
                          key={index}
                        >
                          <p className="NotificationLabel">{item?.ntTitle}</p>
                          <p className="NotificationDate">{item?.ntDesc}</p>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          )}

          {Number(loginUserId) !== 0 && (
            <div
              className="mail-notification"
              style={{ cursor: "pointer" }}
              onClick={() => setMessagePopup(!MessagePopup)}
            >
              {getChatMessageList().length > 0 && (
                <span className="badge-green" />
              )}
              <img src="/ui/Images/mail.svg" alt="mail" />
            </div>
          )}

          <div
            className="Notification_Popup"
            style={{ display: MessagePopup ? "block" : "none" }}
          >
            <div className="form-row">
              <div className="col-md-12 px-4 mt-3 border-bottom">
                <p className="Notification_Title">
                  New messages from Team Flyses
                  {getChatMessageList().length > 0 && (
                    <span>{getChatMessageList().length} New</span>
                  )}
                </p>
              </div>

              {getChatMessageList().length > 0 &&
                getChatMessageList().map((item, index) => {
                  if (index < 5) {
                    return (
                      <div
                        className="col-md-12 px-4 py-2 border-bottom adminMessagePanel"
                        key={index}
                        onClick={handleMessageReadClick}
                      >
                        <p className="NotificationLabel">
                          {item.ctOriginalDocument === null
                            ? item.ctMessage
                            : item.ctOriginalDocument}
                        </p>
                        <p className="NotificationDate">
                          {item.messageTime} {item.sendDateStatus}
                        </p>
                      </div>
                    );
                  }
                })}

              {getChatMessageList().length > 5 && (
                <div className="col-md-12 px-4 py-3 border-bottom">
                  <button
                    className="me-2 btn-navigation"
                    onClick={handleMessageReadClick}
                  >
                    Read All Messages
                  </button>
                </div>
              )}
              {getChatMessageList().length <= 0 && (
                <div className="col-md-12 px-4 py-3 border-bottom">
                  No New Messages Found
                </div>
              )}
            </div>
          </div>

          {(sessionStorage.getItem("userSortName") || "") === "" && (
            <div className="language" style={{marginLeft:"10px"}}>
              <Link className="Login" to="/Login">
                Login
              </Link>
            </div>
          )}
          {(sessionStorage.getItem("userSortName") || "") !== "" && (
            <div className="userProfile" onClick={handleProfileClick}>
              <div
                className="LoginProfile img_profile text-center"
                alt="userProfile"
                style={{ paddingTop: "10px" }}
              >
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
                    src="/ui/Images/user-icon.svg"
                    alt="userProfile"
                  />
                  Profile
                </Link>
                <Link to="/order">
                  <img
                    className="img_profile"
                    src="/ui/Images/All-Order.svg"
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
                    src="/ui/Images/Log-Out.svg"
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
        <img src="/ui/Images/bell.svg" alt="bell" />
      </div>
      <div
        className="on-mobile-navbar"
        style={{ display: MobileMenu ? "block" : "none" }}
      >
        <img src="/ui/Images/NewLogo.svg" style={{ height: 40 }} />
        <div className="btn" onClick={MobileMenuClick}>
          <span className="fa fa-close close-btn" onClick={MobileMenuClick} />
        </div>
        <div>
          <ul>
            <li>
              {/* <a href="#">Home</a> */}
              <Link
                className={
                  location.pathname === "/" ||
                  location.pathname.includes("/home")
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
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/chat">Message</Link>
              {/* <a href="#">Message</a> */}
            </li>
            <li>
              <Link to="/order">Orders</Link>
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
