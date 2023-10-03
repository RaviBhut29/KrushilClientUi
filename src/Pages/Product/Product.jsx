import React, { useEffect, useState } from "react";
import rightTick from "../../Assets/Images/right-tick.png";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import CommanFaq from "../../Common/CommanFaq";
import RatingsAndReviews from "../../Layout/RatingsAndReviews";
import Review from "../../Layout/Review";
import RecommendedForYou from "../../Layout/RecommendedForYou";
import { getCategoryImages } from "../../FlysesApi/Services";
import { useNavigate } from "react-router-dom";
import { decryptWithRk, encrptWithRk, setLoadingStatus } from "../../FlysesApi";
import { toastError, toastSuccess } from "../../FlysesApi/FlysesApi";
import BreadCrub from "../../Layout/BreadCrub";
import ImagePreview from "../Portfolio/ImagePreview";
import PlanPackages from "../PlanPackages/PlanPackages";
import { getProductPlan, getProductReview } from "../../FlysesApi/Plan";
import ProductFaq from "./ProductFaq";
import ProductReview from "./ProductReview";
import { Modal, Rate } from "antd";
import copy from "copy-to-clipboard";
import ProductRecommendedForYou from "./ProductRecommendedForYou";
import ImageSlider from "../Portfolio/ImageSlider";
import "./Product.scss";

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
      path: `/service/${siteMapPathName?.serviceName
        .replace(/ /g, "-")
        .toLowerCase()}/${siteMapPathName.serviceId}`,
    },
    {
      name: siteMapPathName.categoryName,
      clickable: false,
      isHome: false,
      path: `/${splitdata[1]}/${splitdata[2]}/${splitdata[3]}/${splitdata[4]}`,
    },
  ];

  useEffect(() => {
    bindProductAndPlan();
  }, []);

  const bindProductAndPlan = async () => {
    const categoryId = await decryptWithRk(splitdata[splitdata.length - 1]);
    bindProduct(categoryId);
    bindPlan(categoryId);
    bindProductReview(categoryId);
  };

  const [productReviewPercentage, setProductReviewPercentage] = useState(0);
  const bindProductReview = (id) => {
    setLoadingStatus(true);
    getProductReview(id)
      .then((response) => {
        setProductReviewPercentage(response[0]?.totalReview);
      })
      .catch(() => {
        toastError("Bad response from server");
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  };

  const convertPercentageToReview = () => {
    let reviewCount = 0;
    if (productReviewPercentage <= 10) {
      reviewCount = 0.5;
    } else if (productReviewPercentage <= 20) {
      reviewCount = 1;
    } else if (productReviewPercentage <= 30) {
      reviewCount = 1.5;
    } else if (productReviewPercentage <= 40) {
      reviewCount = 2;
    } else if (productReviewPercentage <= 50) {
      reviewCount = 2.5;
    } else if (productReviewPercentage <= 60) {
      reviewCount = 3;
    } else if (productReviewPercentage <= 70) {
      reviewCount = 3.5;
    } else if (productReviewPercentage <= 80) {
      reviewCount = 4;
    } else if (productReviewPercentage <= 90) {
      reviewCount = 4.5;
    } else if (productReviewPercentage <= 100) {
      reviewCount = 5;
    }
    return reviewCount;
  };

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
      .then(async (response) => {
        setCategoryDetails({
          ctName: response?.ctName,
          ctTitle: response?.ctTitle,
          ctDescription: response?.ctDescription,
          ctTags: response?.ctTags,
        });
        const serviceId = await encrptWithRk(response?.ctService);
        setSiteMapPathName({
          serviceName: response?.ctServiceName,
          serviceId: serviceId,
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

  const handlePlanClick = () => {
    history(
      `/${splitdata[1]}/${splitdata[2]}/${splitdata[3]}/pricing/${splitdata[4]}`
    );
  };

  return (
    <div className={"home productPageC"}>
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

        <div className="row on-mobile justify-content-center m-0 d-none">
          <div className="col col-lg-auto row justify-content-center">
            <button type="button" className="con-btn">
              Start Conversation
            </button>
            <button type="button" className="link-btn">
              <img src="/ui/Images/share-icon.svg" />
            </button>
          </div>
        </div>
        <p className="item">{categoryDetails.ctName}</p>

        <div className="row align-items-end p-0 Rating-Row">
          <div className="col row">
            <div className="col-12" style={{ width: "760px" }}>
              <p className="item_title">{categoryDetails.ctTitle}</p>
            </div>
            <div class="col-12 row">
              <div
                class="col-2 px-0 Mobile-Margin"
                style={{
                  height: "auto",
                  alignSelf: "center",
                  marginTop: "-10px",
                }}
              >
                {productReviewPercentage !== 0 && (
                  <Rate
                    allowHalf
                    defaultValue={convertPercentageToReview()}
                    disabled
                  />
                )}
              </div>
              <div
                className="col-2 mt-2 px-0"
                style={{ alignContent: "center" }}
              >
                {productReviewPercentage !== 0 && (
                  <p className="rating_p">{convertPercentageToReview()} ★</p>
                )}
              </div>
              <div className="col-2 mt-2 px-0">
                <p className="rating_p2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-dot d-none"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  </svg>
                  {/* Avg. response time: Less than 2hr */}
                </p>
              </div>
            </div>
          </div>
          <div className="col row align-self-start">
            <div className="col on-web row">
              <button
                type="button"
                className="con-btn ml-auto mx-4"
                onClick={() => {
                  history("/chat");
                }}
              >
                Start Conversation
              </button>
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  copy(window.location.href);
                  toastSuccess("URL copied to clipboard!");
                }}
              >
                {/* <img src="/ui/Images/share-icon.png" /> */}
                <img src="/ui/Images/share-icon.svg" />
              </button>
            </div>
          </div>
        </div>
        {/* New Date After 16/08/2023  */}

        {/* -----------------Product--------------------- */}
        <div className="row mob-margin">
          <div className="col-3 wrapper">
            <div className="image-gallery mb-3 mt-2">
              {/* <div className="image-gallery my-3 p-3"> */}
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
                  <button onClick={() => setCentredModal(true)}>See All</button>
                )}
              </aside>
              <main
                className="primary"
                style={{
                  backgroundImage: `url(${
                    mainImage !== "" ? mainImage : categoryImages[0]?.url
                  })`,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>

            {/* Date:20/08/2023. */}

            {/* Date:20/08/2023. */}
          </div>
          {/* -----------------Krushi Temp--------------------- */}
          {/* {planFeatureList?.length > 0 && (
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
                    </div>
                  </div>
                </div>
              )} */}
          <div className="service-pricing-card mt-5 mb-5 planCard col">
            <div className="">
              {planFeatureList?.length > 0 && (
                // <div className="col-lg-auto pt-4 Price">
                <div className="col-lg-auto Price">
                  <div className="pricing-card  position-relative">
                    <div className="pricing-inner-col">
                      <div className="d-flex align-items-center justify-content-between mb-1 pricing-plan pb-1">
                        <h4 className="m-0 planTitle">
                          {planFeatureList[0]?.pnName}
                        </h4>
                        <h1 className="m-0 pink-text planPrice">
                          ${planFeatureList[0]?.pnPrice}
                        </h1>
                      </div>
                      <div className="pricing-card-body">
                        {Number(planFeatureList[0]?.pnSaveUpTo) !== 0 && (
                          <p className="green-text">
                            Save up to {planFeatureList[0]?.pnSaveUpTo}%
                          </p>
                        )}
                        {Number(planFeatureList[0]?.pnSaveUpTo) === 0 && (
                          <p className="green-text"> </p>
                        )}
                        <p className="grey-text">
                          {planFeatureList[0]?.pnDesc}
                        </p>

                        <div className="mt-4">
                          {planFeatureList[0]?.planServiceDetailsList?.length >
                            0 &&
                            planFeatureList[0]?.planServiceDetailsList.map(
                              (item) => {
                                if (item?.pnIsVisible === 1) {
                                  return (
                                    <div
                                      className="d-flex align-items-center planInclude"
                                      key={item.srPdId}
                                      style={{
                                        opacity:
                                          item?.pnIsInclude === 1 ? "" : "0.4",
                                      }}
                                    >
                                      <img
                                        src={
                                          item?.pnIsInclude === 1
                                            ? "/ui/Images/wrong right icons-01.svg"
                                            : "/ui/Images/wrong right icons-02.svg"
                                        }
                                        alt=""
                                        className="mb-1 me-1"
                                      />
                                      <p className="bold-content">
                                        {item.pnIncludedService}
                                      </p>
                                    </div>
                                  );
                                }
                              }
                            )}
                        </div>

                        {planFeatureList[0]?.planFeatureDetailsList.filter(
                          (x) => x?.pnIsVisible === 1
                        )?.length > 0 && (
                          <>
                            <p className="capital-text-forplan">
                              Included Features
                            </p>
                            <ul className="pricing-list">
                              {planFeatureList[0]?.planFeatureDetailsList.map(
                                (item, index) => {
                                  if (item?.pnIsVisible === 1) {
                                    return (
                                      <li
                                        key={item?.faPdId}
                                        style={{
                                          opacity:
                                            // item?.pnIsInclude === 1
                                            index == 0
                                              ? ""
                                              : index == 1
                                              ? "0.6"
                                              : "0.3",
                                        }}
                                      >
                                        <a href="#" className="dark-text">
                                          {item?.pnIncludedFeature}{" "}
                                        </a>
                                      </li>
                                    );
                                  }
                                }
                              )}
                            </ul>
                          </>
                        )}

                        <button
                          type="button"
                          className="blue-btn mt-2 w-100"
                          onClick={handlePlanClick}
                        >
                          Explore all Package
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* --------------Tabs-------------------- */}
        <ul className="nav nav-tabs">
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
            <div className="Desc-Text">
              {replaceDescription(categoryDetails?.ctDescription)}
            </div>
            <p className="m-0 F-inc">Format included:</p>
            <div
              className="btn-toolbar mb-3 mt-2"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div className="btn-group" role="group" aria-label="First group">
                {categoryDetails?.ctTags.split("*").map((itemC, index) => {
                  return (
                    <>
                      <button type="button" className="btn formateBtn">
                        {itemC}
                      </button>
                      {index !==
                        categoryDetails?.ctTags.split("*").length - 1 && <hr />}
                    </>
                  );
                })}
              </div>
            </div>
            <ProductRecommendedForYou serviceId={siteMapPathName.serviceId} />
          </div>
        )}
        {tabClick === "Rev" && <ProductReview />}
        {tabClick === "Faq" && <ProductFaq />}
      </div>
      {/* Go Faster */}
      <RatingsAndReviews />
      {/* Footer */}
      <Footer />
    
      <Modal
        title=""
        open={centredModal}
        footer={[]}
        onCancel={() => setCentredModal(false)}
        width={1500}
        style={{
          top: 20,
        }}
      >
        {categoryImages.length > 0 && (
          <ImageSlider data={categoryImages} />
          //<ImagePreview data={categoryImages} />
        )}
      </Modal>
    </div>
  );
};
