import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import BreadCrub from "../../Layout/BreadCrub";
import RatingsAndReviews from "../../Layout/RatingsAndReviews";
import { useNavigate } from "react-router-dom";
import { getService } from "../../FlysesApi/Services";
import { REACT_APP, setLoadingStatus } from "../../FlysesApi";
import { toastError } from "../../FlysesApi/FlysesApi";

export const Services = () => {
  const [servicesList, setServicesList] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    let path = window.location.pathname;
    let splitdata = path.split("/");

    if(splitdata.length > 2)
    {
      history(`/category/${splitdata[splitdata.length - 1]}`);
    }

    window.scrollTo(0,0);
    getAllServices();
  }, []);

  const getAllServices = () => {
    getService("null")
      .then((response) => {
        if (response.length > 0) {
          setServicesList(response);
        } else {
          setServicesList([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const getServiceIcon = (id) => {
    return (
      <img
        src={`${REACT_APP}service/getServiceFile/${id}`}
        style={{ width: "2.6em" }}
        alt="star"
      />
    );
  };

  const handleServiceClick = (id) => {
    history(`/category/${id}`);
  };

  const siteMapPath = [
    {
      name: "Home",
      clickable: true,
      isHome: true,
      path: "/home",
    },
    {
      name: "Services",
      clickable: false,
      isHome: false,
      path: "/services",
    },
  ];
  
  return (
    <div className="home">
      <div className="container Services" style={{ position: "relative" }}>
        {/* Navigation */}
        <Header />
        {/* Navigation */}
        <BreadCrub siteMapPath={siteMapPath} />
        <div className="my-5">
          <p className="h1 title1">
            Quality digital
            <br />
            services you really want !
          </p>
          <p className="title2">
            We are delivering top level digital services with our best
            experienced designer team, just get started with us.
          </p>
        </div>

        {/* Home Card */}
        <div className="exploreCategories-serv">
          <div className="container">
            <div className="brandingCards row">
              {servicesList &&
                servicesList.map((item) => {
                  return (
                    <div
                      className="col-lg-4 servicesCard"
                      key={item?.srId}
                      onClick={() => handleServiceClick(item.srId)}
                    >
                      <div className="brands-card me-0">
                        {getServiceIcon(item.srId)}
                        <h3>{item?.srName}</h3>
                        <p>{item?.srDescription}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {/* Home Card */}
        <RatingsAndReviews />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};
