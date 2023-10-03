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
      <div className="home half-half-image-text ">
        <div className="container">
          <Header />
          {/* Navigation */}
          <BreadCrub siteMapPath={siteMapPath} />
          <img src="/ui/Images/Rectangle.svg" className="about-rect"></img>
          <div className="row First">
            <div className="col-12 col-lg-6">
              <div className="content Mob-Margin" style={{ display: "block" }}>
                <h3>{formData[0]?.abNamePanelF}</h3>
                <p>{formData[0]?.abDetailPanelF}</p>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="img faq-illus1" />
            </div>
          </div>
          <div className="row my-5 Second">
            <img className="grp-14" src="/ui/Images/3rect.svg" alt="" />
            <img className="dots-24" src="/ui/Images/24.svg" alt="" />
            <div className="col-12 col-lg-6">
              <div className="content" style={{ display: "block" }}>
                <h3>{formData[0]?.abNamepanelS}</h3>
                <p className="About-Fly-Text">
                  {formData[0]?.abDetailpanelS}</p>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              {/* <div
                className="img second-image"
                style={{
                  background:
                    'url("/ui/Images/Layer_2.svg") no-repeat center',
                  backgroundSize: "cover",
                }}
              /> */}
              {/* <img src="/ui/Images/Layer_2.svg"></img> */}
              <div className="img  faq-illus2" />
              {/* <img src="/ui/Images/About us vectors-02.svg"></img> */}
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
              <div className="img faq-illus3" />
            </div>
          </div>
          <p className="text-center" style={{ marginTop: "5rem" }}>
            <span className="b1">{formData[0]?.abMainTitle}</span>
            <br />
            <span className="b2">{formData[0]?.abMainDetail}</span>
          </p>
          <div>
          {/* style={{ backgroundImage: 'url("/ui/Images/wave-lines.svg")' }}> */}
            <img className="LineBg" src="/ui/Images/wave-lines.svg"></img>
            <RatingsAndReviews ishideGrowfasterPanel={true} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
