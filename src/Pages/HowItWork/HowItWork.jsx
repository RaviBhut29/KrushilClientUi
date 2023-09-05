import React from "react";
import Header from "../../Layout/Header";
import BreadCrub from "../../Layout/BreadCrub";
import Footer from "../../Layout/Footer";

export const HowItWork = () => {
  const siteMapPath = [
    {
      name: "Home",
      clickable: true,
      isHome: true,
      path: "/home",
    },
    {
      name: "How it work",
      clickable: false,
      isHome: false,
      path: "/howitwork",
    },
  ];
  return (
    <>
      <div className="home half-half-image-text-How">
        <div className="container">
          <Header />

          <BreadCrub siteMapPath={siteMapPath} />
          <img src="../ui/Images/Rectangle.svg" className="about-rect"></img>
          {/* <img className="curlLine" src="../ui/Images/line-curl.svg" alt="" /> */}
          <div style={{ width: "80%", marginRight: "auto", marginLeft: "auto" }}>
            <div className="form-row">
              <img className="grp-14" src="../ui/Images/3rect.svg" alt="" />
              <img
                className="Ellipse-131"
                src="../ui/Images/Ellipse 131.png"
                alt=""
              />
              <div
                className="col-md-12 Mob-Margin"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h3>How does this work?</h3>
                <p className="p-desc">
                  Lorem ipsum dolor sit amet consectetur. Lacus dolor netus amet
                  neque id sed quis tellus fames. Massa ornare amet in senectus
                  arcu orci fames. Cras consequat gravida.
                </p>
              </div>
            </div>
            <div className="form-row First">
              <img
                className="Ellipse-621"
                src="../ui/Images/Ellipse 621.png"
                alt=""
              />
              <div className="col-md-12 col-lg-6">
                <div className="content text-1-responsive">
                  <h3>Create Account</h3>
                  <p>
                    we know your home is more than just a place to live, that’s
                    why we’re committed to providing the best home loan.
                  </p>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <img src="../ui/Images/card-1.svg" className="card-1-responsive" style={{ float: "right", width: 429.73, height: 276.38 }} />
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-12 col-lg-6">
                <div
                  className="content text-2-responsive" style={{ width: 429, float: "right", paddingLeft: 30 }}
                >
                  <h3>Search for Services</h3>
                  <p>
                    It’s the fast, easy way to apply for your mortgage and access
                    your application anytime, anywhere. With our mortgage access
                    center.
                  </p>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                {/* <div
                  className="img card-2-responsive"
                  style={{
                    // background: 'url("../ui/Images/card-2.svg") no-repeat center',
                    background: 'url("../ui/Images/card-2.svg") no-repeat',
                    backgroundSize: "cover",
                    height: 225.94,
                    width: 492.02
                  }}
                /> */}
                <img src="../ui/Images/card-2.svg" style={{ width: 492.02, height: 225.94 }} className="img card-2-responsive"></img>
              </div>
            </div>
            <div className="form-row First">
              <div className="col-md-12 col-lg-6">
                <div className="content text-3-responsive">
                  <h3>Select Packages</h3>
                  <p>
                    we know your home is more than just a place to live, that’s
                    why we’re committed to providing the best home loan.
                  </p>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <img src="../ui/Images/card-3.svg" className="card-3-responsive" style={{ float: "right", width: 469.73, height: 276.38 }} />
              </div>
            </div>
            <img src="../ui/Images/wave-lines.svg" className="img-wave" style={{ position: "absolute", margin: "-60px -220px" }}></img>
            <div className="form-row">
              <div className="col-md-12 col-lg-6">
                <div
                  className="content text-4-responsive" style={{ width: 429, float: "right", paddingLeft: 30 }}
                >
                  <h3>Payment</h3>
                  <p>
                    It’s the fast, easy way to apply for your mortgage and access
                    your application anytime, anywhere. With our mortgage access
                    center.
                  </p>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div
                  className="img card-4-responsive"
                  style={{
                    background: 'url("../ui/Images/card-4.svg") no-repeat',
                    // background: 'url("../ui/Images/card-4.svg") no-repeat center',
                    backgroundSize: "cover",
                    height: 225.94,
                    width: 492.03
                  }}
                />
              </div>
            </div>
            <div className="form-row First">
              <div className="col-md-12 col-lg-6">
                <div className="content text-5-responsive">
                  <h3>Submit your Requirements</h3>
                  <p>
                    we know your home is more than just a place to live, that’s
                    why we’re committed to providing the best home loan.
                  </p>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <img src="../ui/Images/card-5.svg" className="card-5-responsive" style={{ float: "right", width: 429.73, height: 276.38 }} />
              </div>
            </div>
            <div className="form-row">
              <img className="polygon" src="../ui/Images/Polygon 1.png" alt="" />
              <div className="col-md-12 col-lg-6">
                <div
                  className="content text-6-responsive" style={{ width: 429, float: "right", paddingLeft: 30 }}
                >
                  <h3>Get delivery</h3>
                  <p>
                    It’s the fast, easy way to apply for your mortgage and access
                    your application anytime, anywhere. With our mortgage access
                    center.
                  </p>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div
                  className="img card-6-responsive"
                  style={{
                    // background: 'url("../ui/Images/card-6.svg") no-repeat center',
                    background: 'url("../ui/Images/card-6.svg") no-repeat',
                    backgroundSize: "cover",
                    height: 275,
                    width: 441.19
                  }} />
              </div>
            </div>
            <div className="form-row First">
              <div className="col-md-12 col-lg-6">
                <div className="content text-7-responsive">
                  <h3>Revision Request (if any)</h3>
                  <p>
                    we know your home is more than just a place to live, that’s
                    why we’re committed to providing the best home loan.
                  </p>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <img src="../ui/Images/card-7.svg" className="card-7-responsive" style={{ float: "right", width: 429.73, height: 276.38 }} />
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-12 col-lg-6">
                <div
                  className="content text-8-responsive" style={{ width: 429, float: "right", paddingLeft: 30 }}
                >
                  <h3>Get Final delivery</h3>
                  <p>
                    It’s the fast, easy way to apply for your mortgage and access
                    your application anytime, anywhere. With our mortgage access
                    center.
                  </p>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div
                  className="img card-8-responsive"
                  style={{
                    // background: 'url("../ui/Images/card-8.svg") no-repeat center',
                    background: 'url("../ui/Images/card-8.svg") no-repeat',
                    backgroundSize: "cover",
                    height: 275,
                    width: 441.19
                  }} />
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};