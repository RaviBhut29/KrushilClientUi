import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import CommanFaq from "../../Common/CommanFaq";
import RatingsAndReviews from "../../Layout/RatingsAndReviews";
import Review from "../../Layout/Review";
import RecommendedForYou from "../../Layout/RecommendedForYou";
import { getCategoryImages } from "../../FlysesApi/Services";
import { useNavigate } from "react-router-dom";
import { setLoadingStatus } from "../../FlysesApi";
import { toastError } from "../../FlysesApi/FlysesApi";
import BreadCrub from "../../Layout/BreadCrub";
import { Modal } from "reactstrap";
import ImagePreview from "../Portfolio/ImagePreview";
import PlanPackages from "../PlanPackages/PlanPackages";
import { getProductPlan } from "../../FlysesApi/Plan";
//import ImagePreview from "./ImagePreview";

export const Product = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [categoryImages, setCategoryImages] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState({
    ctName: "",
    ctTitle: "",
    ctDescription: "",
    ctTags: "",
  });
  const history = useNavigate();
  let path = window.location.pathname;
  let splitdata = path.split("/");
  const [siteMapPathName, setSiteMapPathName] = useState({
    serviceName: "",
    serviceId: "",
    categoryName: "",
  });

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
      name: siteMapPathName.serviceName,
      clickable: true,
      isHome: false,
      path: `/category/${siteMapPathName.serviceId}`,
    },
    {
      name: siteMapPathName.categoryName,
      clickable: false,
      isHome: false,
      path: `/product/${splitdata[splitdata.length - 1]}`,
    },
  ];

  useEffect(() => {
    bindProduct(splitdata[splitdata.length - 1]);
    bindPlan(splitdata[splitdata.length - 1]);
  }, []);

  const [planFeatureList, setPlanFeatureList] = useState([]);

  const bindPlan = (id) => {
    getProductPlan(id)
      .then((response) => {
        if (response?.length > 0) {
          setPlanFeatureList(response);
        } else {
          setPlanFeatureList([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const bindProduct = (id) => {
    getCategoryImages(id)
      .then((response) => {
        setCategoryDetails({
          ctName: response?.ctName,
          ctTitle: response?.ctTitle,
          ctDescription: response?.ctDescription,
          ctTags: response?.ctTags,
        });
        setSiteMapPathName({
          serviceName: response?.ctServiceName,
          serviceId: response?.ctService,
          categoryName: response?.ctName,
        });
        if (response?.categoryImageList?.length > 0) {
          setCategoryImages(response?.categoryImageList);
        } else {
          setCategoryImages([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const replaceDescription = (htmlString) => {
    return (
      <div
        className="cardDescText"
        dangerouslySetInnerHTML={{ __html: htmlString }}
      ></div>
    );
  };

  const [mainImage, setMainImage] = useState("");
  const [tabClick, setTabClick] = useState("");
  const [centredModal, setCentredModal] = useState(false);

  const toggleModal = () => {
    setCentredModal(!centredModal);
  };

  const [pricePlanPackages, setPricePlanPackages] = useState(false);

  return (
    <>
      {pricePlanPackages && (
        <PlanPackages
          categorySiteMapPath={siteMapPath}
          setPricePlanPackages={setPricePlanPackages}
        />
      )}
      {!pricePlanPackages && (
        <div className="home">
          <div
            className="container minimalist-logo"
            style={{
              position: "relative",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <Header />
            <BreadCrub siteMapPath={siteMapPath} />

            <div className="row on-mobile justify-content-center m-0">
              <div className="col col-lg-auto row justify-content-center">
                <button type="button" className="con-btn">
                  Start Conversation
                </button>
                <button type="button" className="link-btn">
                  <img src="../ui/Images/share-icon.png" />
                </button>
              </div>
            </div>
            <p className="item">{categoryDetails.ctName}</p>
            <p className="item_title">{categoryDetails.ctTitle}</p>
            {/* ------Rating--------- */}
            <div className="container row align-items-end p-0 Rating-Row">
              <div className="col-2 px-0">
                <fieldset
                  className="rating"
                  style={{ display: "inline-table" }}
                >
                  <input
                    type="radio"
                    id="star5"
                    name="rating"
                    defaultValue={5}
                  />
                  <label
                    className="full"
                    htmlFor="star5"
                    title="Awesome - 5 stars"
                  />
                  <input
                    type="radio"
                    id="star4half"
                    name="rating"
                    defaultValue="4 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star4half"
                    title="Pretty good - 4.5 stars"
                  />
                  <input
                    type="radio"
                    id="star4"
                    name="rating"
                    defaultValue={4}
                  />
                  <label
                    className="full"
                    htmlFor="star4"
                    title="Pretty good - 4 stars"
                  />
                  <input
                    type="radio"
                    id="star3half"
                    name="rating"
                    defaultValue="3 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star3half"
                    title="Meh - 3.5 stars"
                  />
                  <input
                    type="radio"
                    id="star3"
                    name="rating"
                    defaultValue={3}
                  />
                  <label
                    className="full"
                    htmlFor="star3"
                    title="Meh - 3 stars"
                  />
                  <input
                    type="radio"
                    id="star2half"
                    name="rating"
                    defaultValue="2 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star2half"
                    title="Kinda bad - 2.5 stars"
                  />
                  <input
                    type="radio"
                    id="star2"
                    name="rating"
                    defaultValue={2}
                  />
                  <label
                    className="full"
                    htmlFor="star2"
                    title="Kinda bad - 2 stars"
                  />
                  <input
                    type="radio"
                    id="star1half"
                    name="rating"
                    defaultValue="1 and a half"
                  />
                  <label
                    className="half"
                    htmlFor="star1half"
                    title="Meh - 1.5 stars"
                  />
                  <input
                    type="radio"
                    id="star1"
                    name="rating"
                    defaultValue={1}
                  />
                  <label
                    className="full"
                    htmlFor="star1"
                    title="Sucks big time - 1 star"
                  />
                  <input
                    type="radio"
                    id="starhalf"
                    name="rating"
                    defaultValue="half"
                  />
                  <label
                    className="half"
                    htmlFor="starhalf"
                    title="Sucks big time - 0.5 stars"
                  />
                </fieldset>
              </div>
              <div className="col-2 px-0">
                <p className="rating_p">4.6 | 45k</p>
              </div>
              <div className="col-2 px-0">
                <p className="rating_p2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-dot"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  </svg>
                  Avg. response time: Less than 2hr
                </p>
              </div>
              <div
                className="col col-lg-auto row on-web"
                style={{ marginLeft: "auto", marginRight: 30 }}
              >
                <button type="button" className="con-btn mx-4">
                  Start Conversation
                </button>
                <button type="button" className="link-btn">
                  <img src="../ui/Images/share-icon.png" />
                </button>
              </div>
            </div>
            {/* ------Rating--------- */}
            {/* -----------------Product--------------------- */}
            <div className="row">
              <div className="col-3 wrapper">
                <div className="image-gallery my-3 p-3">
                  <aside className="thumbnails">
                    {categoryImages.map((item, index) => {
                      if (index < 4) {
                        return (
                          <a
                            className="selected thumbnail"
                            data-big={item?.url}
                            style={{ cursor: "pointer" }}
                            onClick={() => setMainImage(item?.url)}
                          >
                            <div
                              className="thumbnail-image mt-0"
                              style={{
                                backgroundImage: `url(${item?.url})`,
                              }}
                            />
                          </a>
                        );
                      }
                    })}
                    {categoryImages.length > 4 && (
                      <button onClick={() => setCentredModal(true)}>
                        See All
                      </button>
                    )}
                  </aside>
                  <main
                    className="primary"
                    style={{
                      backgroundImage: `url(${
                        mainImage !== "" ? mainImage : categoryImages[0]?.url
                      })`,
                    }}
                  />
                </div>
              </div>
              {/* -------------------------------------- */}
              {planFeatureList?.length > 0 && (
                <div className="col-3 col-lg-auto p-4 Price">
                  <div className="card">
                    <div className="card-body p-4">
                      <h5 className="card-title title1">
                        {planFeatureList[0]?.pnName}
                        <span style={{ marginLeft: "auto" }}>
                          ${planFeatureList[0]?.pnPrice}
                        </span>
                      </h5>
                      <hr className="border border-2 opacity-50" />
                      <h5 className="card-title title-discount">
                        Save up to {planFeatureList[0]?.pnSaveUpTo}%
                      </h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">
                        {planFeatureList[0]?.pnDesc}
                      </h6>
                      <div className="only-web">
                        <h5
                          className="card-title my-3"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {planFeatureList[0]?.planServiceDetailsList?.length > 0 &&
                            planFeatureList[0]?.planServiceDetailsList.map(
                              (item) => {
                                return (
                                  <span key={item.srPdId}>
                                    <svg
                                      width={20}
                                      height={20}
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M9.94165 19.4136C15.1583 19.4136 19.3872 15.1847 19.3872 9.96802C19.3872 4.75138 15.1583 0.522461 9.94165 0.522461C4.72501 0.522461 0.496094 4.75138 0.496094 9.96802C0.496094 15.1847 4.72501 19.4136 9.94165 19.4136ZM14.3186 8.44151C14.7797 7.98042 14.7797 7.23284 14.3186 6.77175C13.8575 6.31066 13.1099 6.31066 12.6489 6.77175L8.76096 10.6597L7.23445 9.13314C6.77336 8.67205 6.02578 8.67205 5.56469 9.13314C5.1036 9.59423 5.1036 10.3418 5.56469 10.8029L7.92608 13.1643C8.38717 13.6254 9.13474 13.6254 9.59583 13.1643L14.3186 8.44151Z"
                                        fill="#198754"
                                      />
                                    </svg>
                                    <span className="del-day">
                                      {item.pnIncludedService}
                                    </span>
                                  </span>
                                );
                              }
                            )}
                        </h5>
                        <h5 className="card-title title-features">
                          Included Features
                        </h5>
                        <div className="div-feact mt-3">
                          <ul className="ul-feact">
                            {planFeatureList[0]?.planFeatureDetailsList?.length > 0 &&
                              planFeatureList[0]?.planFeatureDetailsList.map(
                                (item) => {
                                  return (
                                    <li
                                      className="li-feact opacity-50 my-2"
                                      key={item?.faPdId}
                                    >
                                      {item?.pnIncludedFeature}
                                    </li>
                                  );
                                }
                              )}
                            <li className="li-feact opacity-25">Vector File</li>
                          </ul>
                        </div>
                      </div>
                      <div className="btn-div" style={{ textAlign: "center" }}>
                        <button
                          className="explore-btn1"
                          onClick={() => setPricePlanPackages(true)}
                        >
                          Explore all Package
                        </button>
                      </div>
                      {/* <button type="button" class="explore-btn">
          Start Conversation
        </button> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* --------------Tabs-------------------- */}
            <ul className="nav nav-tabs mt-4">
              <li className="nav-item">
                <a
                  className={`AClick nav-link ${
                    tabClick === "" || tabClick === "Des" ? " active" : ""
                  }`}
                  aria-current="page"
                  onClick={() => setTabClick("Des")}
                >
                  Description
                </a>
              </li>
              <li className="AClick nav-item">
                <a
                  className={`nav-link ${tabClick === "Rev" ? " active" : ""}`}
                  onClick={() => setTabClick("Rev")}
                >
                  Review
                </a>
              </li>
              <li className="AClick nav-item">
                <a
                  className={`nav-link ${tabClick === "Faq" ? " active" : ""}`}
                  onClick={() => setTabClick("Faq")}
                >
                  FAQs
                </a>
              </li>
            </ul>
            {(tabClick === "" || tabClick === "Des") && (
              <div className="my-4 desc">
                {replaceDescription(categoryDetails?.ctDescription)}
                <p className="m-0 F-inc">Format included:</p>
                <div
                  className="btn-toolbar mb-3"
                  role="toolbar"
                  aria-label="Toolbar with button groups"
                >
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="First group"
                  >
                    {categoryDetails?.ctTags.split("*").map((itemC, index) => {
                      return (
                        <>
                          <button type="button" className="btn">
                            {itemC}
                          </button>
                          {index !==
                            categoryDetails?.ctTags.split("*").length - 1 && (
                            <hr />
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
                <RecommendedForYou />
              </div>
            )}
            {tabClick === "Rev" && <Review />}
            {tabClick === "Faq" && <CommanFaq />}
          </div>
          {/* Go Faster */}
          <RatingsAndReviews />
          {/* Footer */}
          <Footer />
          <Modal
            isOpen={centredModal}
            toggle={toggleModal}
            className="modal-dialog-centered image-preview-modals"
          >
            <ImagePreview data={categoryImages} />
          </Modal>
        </div>
      )}
    </>
  );
};
