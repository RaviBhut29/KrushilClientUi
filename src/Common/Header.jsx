import React from "react";

const Header = () => {
  return (
    <header style={{ marginTop: "1.1rem" }}>
      <div className="menu-btn">
        {/* <span class="fa fa-list menu-btn"></span> */}
        <img src="../assets/ui/Images/menu-icon.png" alt="bell" />
      </div>
      <a href="#" className="logo">
        <img
          className="logo_img"
          src="../assets/ui/Images/logo.svg"
          alt="Main Logo"
        />
      </a>
      <nav className="navbar">
        <div className="btn">
          <span className="fa fa-close close-btn" />
        </div>
        <a href="#" className="active">
          Home
        </a>
        <a href="#">Portfolio</a>
        <div className="s_hide">
          <a href="#" className="Services">
            Services
          </a>
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
        <a href="#">How It work</a>
        <a href="#">About Flyese</a>
        <div className="search">
          <img
            className="nav-search-img"
            src="../assets/ui/Images/search.svg"
            alt="Search icon"
          />
          <input className="form-control nav-search" placeholder="Search" />
        </div>
        <div className="notifications d-flex justify-content-center align-items-center mb-2">
          <div className="general-notification">
            <span className="badge-yellow" />
            <img src="../assets/ui/Images/bell.svg" alt="bell" />
          </div>
          <div className="mail-notification">
            <span className="badge-green" />
            <img src="../assets/ui/Images/mail.svg" alt="mail" />
          </div>
          <div className="language">
            <img
              src="../assets/ui/Images/world.svg"
              style={{ marginRight: "7px" }}
              alt="world"
            />
            <a className="Login" href="#">
              Login N
            </a>
          </div>
          <div className="userProfile d-none">
            <img
              className="img_profile"
              src="../assets/ui/Images/userImage.png"
              alt="userProfile"
            />
            <div className="userDropdown">
              <a href="#">
                <img
                  className="img_profile"
                  src="../assets/ui/Images/user-icon.png"
                  alt="userProfile"
                />
                {/* <i class="fa fa-user"></i> */}
                Profile
              </a>
              <a href="#">
                <img
                  className="img_profile"
                  src="../assets/ui/Images/orders-icon.png"
                  alt="userProfile"
                />
                {/* <i class="fa fa-file"></i> */}
                Orders
              </a>
              <hr />
              <a href="#">English</a>
              <a href="#">INR</a>
              <a href="#">Help and Support 11</a>
              <hr />
              <a href="#">
                <img
                  className="img_profile"
                  src="../assets/ui/Images/logout-icon.png"
                  alt="userProfile"
                />
                <span style={{ color: "#dd3d4c" }}>Logout</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="mobile-noti general-notification">
        <img src="../assets/ui/Images/bell.svg" alt="bell" />
      </div>
      <div className="on-mobile-navbar">
        <img src="../assets/ui/Images/logo.svg" style={{ height: "40px" }} />
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
                <a href="#">Services</a>
              </li>
              {/* <a href="#" class="Services">Services</a> */}
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
