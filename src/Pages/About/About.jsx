import React, { useEffect, useState } from "react";
import { getAboutApi } from "../../FlysesApi/About";
import { setLoadingStatus } from "../../FlysesApi";
import { toastError } from "../../FlysesApi/FlysesApi";
import RatingsAndReviews from "../../Layout/RatingsAndReviews";
import Footer from "../../Layout/Footer";
import Header from "../../Layout/Header";
import BreadCrub from "../../Layout/BreadCrub";

export const About = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    getAbout();
  }, []);

  const getAbout = () => {
    getAboutApi()
      .then((response) => {
        if (response.length > 0) {
          setFormData(response);
        } else {
          setFormData([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const siteMapPath = [
    {
      name: "Home",
      clickable: true,
      isHome: true,
      path: "/home",
    },
    {
      name: "About",
      clickable: false,
      isHome: false,
      path: "/about",
    },
  ];

  return (
    <>
      <div className="half-half-image-text">
        <div className="container">
          <Header />
          {/* Navigation */}
          <BreadCrub siteMapPath={siteMapPath} />

          <div className="row First">
            <div className="col-12 col-lg-6">
              <div className="content" style={{ display: "block" }}>
                <h3>{formData[0]?.abNamePanelF}</h3>
                <p>{formData[0]?.abDetailPanelF}</p>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div
                className="img"
                style={{
                  background:
                    'url("../ui/Images/Layer_1.svg") no-repeat center',
                  backgroundSize: "cover",
                }}
              />
            </div>
          </div>
          <div className="row my-5">
            <img className="grp-14" src="../ui/Images/Group 14.png" alt="" />
            <img className="dots-24" src="../ui/Images/24.png" alt="" />
            <div className="col-12 col-lg-6">
              <div className="content" style={{ display: "block" }}>
                <h3>{formData[0]?.abNamepanelS}</h3>
                <p>{formData[0]?.abDetailpanelS}</p>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div
                className="img second-image"
                style={{
                  background:
                    'url("../ui/Images/Layer_2.svg") no-repeat center',
                  backgroundSize: "cover",
                }}
              />
            </div>
          </div>
          <div className="row First">
            <div className="col-12 col-lg-6">
              <div className="content" style={{ display: "block" }}>
                <h3> {formData[0]?.abNamePanelT}</h3>
                <p>{formData[0]?.abDetailPanelT}</p>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div
                className="img"
                style={{
                  background:
                    'url("../ui/Images/Layer_3.svg") no-repeat center',
                  backgroundSize: "cover",
                }}
              />
            </div>
          </div>
          <p className="text-center my-5">
            <span className="b1">{formData[0]?.abMainTitle}</span>
            <br />
            <span className="b2">{formData[0]?.abMainDetail}</span>
          </p>

          <RatingsAndReviews ishideGrowfasterPanel={true}/>
        </div>
      </div>

      <Footer />
    </>
  );
};
