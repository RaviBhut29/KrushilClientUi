import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import BreadCrub from "../../Layout/BreadCrub";
import { REACT_APP, setLoadingStatus } from "../../FlysesApi";
import { toastError, toastWarning } from "../../FlysesApi/FlysesApi";
import { getCategory } from "../../FlysesApi/Category";
import "./Category.css";
import { useNavigate } from "react-router-dom";
import RatingsAndReviews from "../../Layout/RatingsAndReviews";
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
        {/* <div
          className="row lead text-lg-start justify-content-center"
          style={{ background: "#ffffff" }}
        > Date:09/08/2023. */}
        <div
          className="row lead text-lg-start containerT"
          >
            {/* style={{ background: "#ffffff" }} */}
          {categoriesList &&
            categoriesList.map((item) => {
              return (
                <div
                  className=""
                  onClick={() => handleCategoryClick(item.ctId)}
                  style={{ cursor: "pointer"}}
                >
                  <div className="card">
                    <div className="card-body" style={{padding:"0px"}}>
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
      {/* <RatingsAndReviews /> */}
      <RatingsAndReviews ishideGrowfasterPanel={true} />
      {/* Footer */}
      <Footer />
    </div>
  );
};
