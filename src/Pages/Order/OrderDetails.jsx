import React, { useEffect, useMemo } from "react";
import Header from "../../Layout/Header";
import BreadCrub from "../../Layout/BreadCrub";
import { useState } from "react";
import {
  ReviewAlreadyExists,
  getOrderDelivery,
  getOrderFeature,
  submitReview,
  updateOrderStatus,
} from "../../FlysesApi/PlanOrderDetailApi";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../FlysesApi/FlysesApi";
import { REACT_APP, setLoadingStatus } from "../../FlysesApi";
import { Link } from "react-router-dom";
import { MdPendingActions } from "react-icons/md";

const OrderDetails = ({
  orderDetailsList,
  setOrderDetailsShow,
  setOrderDetailsList,
}) => {
  const [featurePanelShow, setFeaturePanelShow] = useState(true);
  const [siteMapPath, setSiteMapPath] = useState([
    {
      name: "Home",
      clickable: true,
      isHome: true,
      path: "/home",
    },
    {
      name: "Orders",
      clickable: true,
      isHome: false,
      path: "/order",
      onClick: true,
    },
    {
      name: "#" + orderDetailsList?.orNumber,
      clickable: false,
      isHome: false,
      path: "/orders",
    },
  ]);
  const userId = sessionStorage.getItem("userId");

  const handlePathClick = (name) => {
    setOrderDetailsShow(false);
  };

  const [servicesList, setServicesList] = useState([]);
  const [orderDeliveryList, setOrderDeliveryList] = useState([]);
  const [orderDeliveryNotes, setOrderDeliveryNotes] = useState("");
  const [isReview, setIsReview] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllOrderFeature();
  }, []);

  const checkReviewAlreadyExists = () => {
    ReviewAlreadyExists(orderDetailsList?.orNumber)
      .then((response) => {
        if (response !== null) {
          setIsReview(response);
        }
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const getAllOrderFeature = () => {
    getOrderFeature(userId, orderDetailsList?.orId)
      .then((response) => {
        if (response.length > 0) {
          setServicesList(response);
          if (response[0]?.orStatus === "Delivered" || response[0]?.orStatus === "Completed" || response[0]?.orStatus === "Revision") {
            getOrderDeliveryFun();
          }
          if (response[0]?.orStatus === "Completed") {
            checkReviewAlreadyExists();
          }
        } else {
          setServicesList([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const getOrderDeliveryFun = () => {
    getOrderDelivery(orderDetailsList?.orNumber)
      .then((response) => {
        setOrderDeliveryNotes(response?.odDesc);
        if (response?.orderDeliveryMultiFile.length > 0) {
          setOrderDeliveryList(response?.orderDeliveryMultiFile);
        } else {
          setOrderDeliveryList([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const downloadService = (id) => {
    setLoadingStatus(true);
    var url = String(
      REACT_APP + "orderdelivery/DownloadOrderDeliveryFile/" + id
    );
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.click();
    setLoadingStatus(false);
  };

  const handleConfirmClick = (status) => {
    updateOrderStatus(orderDetailsList?.orId, status)
      .then((response) => {
        setOrderDetailsList({
          ...orderDetailsList,
          orStatus: status === 6 ? "Completed" : "Revision",
        });
        getAllOrderFeature();
        toastSuccess("Your order has been confirmed!");
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const [ratingNumberList, setRatingNumberList] = useState({
    Service: 0,
    Communication: 0,
    BuyAgain: 0,
    txtRating: "",
  });

  const submitUserRating = (name, ratingNumber) => {
    setRatingNumberList({
      ...ratingNumberList,
      [name]: ratingNumber,
    });
  };

  const reviewSubmit = () => {
    setLoadingStatus(true);
    if (
      ratingNumberList.BuyAgain !== 0 &&
      ratingNumberList.Service !== 0 &&
      ratingNumberList.Communication !== 0
    ) {
      submitReview({
        rvUserId: userId,
        rvUserName: "",
        rvOrderId: orderDetailsList?.orNumber,
        rvServiceRating: ratingNumberList.Service,
        rvCommunicationRating: ratingNumberList.Communication,
        rvBuyAgainRating: ratingNumberList.BuyAgain,
        rvDesc: ratingNumberList.txtRating,
      })
        .then((response) => {
          setLoadingStatus(false);
          setIsReview(true);
          toastSuccess("Thank you for submitting your review!");
        })
        .catch(() => {
          toastError("Bad response from server");
          setLoadingStatus(false);
        });
    } else {
      setLoadingStatus(false);
      toastWarning("Please provide all retnings !!");
    }
  };

  return (
    <>
      <div className="container Order-status">
        {/* Navigation */}

        <Header />
        {/* Navigation */}
        <BreadCrub
          siteMapPath={siteMapPath}
          handleSiteMapClick={handlePathClick}
        />

        <p className="order-id my-3">
          Order ID :<span> #{orderDetailsList?.orNumber}</span>
        </p>

        <div className="row gy-5">
          {featurePanelShow && (
            <div className="col-8 card1">
              <div className="card">
                <div className="card-header py-3">
                  <div className="card1-info d-flex">
                    <span className="info">{orderDetailsList?.ctTitle}</span>
                    <span className="info-date ms-2">
                      {orderDetailsList?.orDate}
                    </span>

                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      style={{ position: "absolute", right: "15px" }}
                      onClick={() => setFeaturePanelShow(false)}
                    />
                  </div>
                </div>
                <div className="card-body">
                  <p>
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="me-2"
                      style={{ marginTop: "-4px" }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.94165 19.4136C15.1583 19.4136 19.3872 15.1847 19.3872 9.96802C19.3872 4.75138 15.1583 0.522461 9.94165 0.522461C4.72501 0.522461 0.496094 4.75138 0.496094 9.96802C0.496094 15.1847 4.72501 19.4136 9.94165 19.4136ZM14.3186 8.44151C14.7797 7.98042 14.7797 7.23284 14.3186 6.77175C13.8575 6.31066 13.1099 6.31066 12.6489 6.77175L8.76096 10.6597L7.23445 9.13314C6.77336 8.67205 6.02578 8.67205 5.56469 9.13314C5.1036 9.59423 5.1036 10.3418 5.56469 10.8029L7.92608 13.1643C8.38717 13.6254 9.13474 13.6254 9.59583 13.1643L14.3186 8.44151Z"
                        fill="#198754"
                      />
                    </svg>
                    <span className="card1-title ">
                      {orderDetailsList?.pnName}
                    </span>
                  </p>
                  {servicesList.length > 0 && (
                    <>
                      <p className="card-text mx-2 card1-Features">
                        Included Features
                      </p>
                      <ul
                        className="mx-2 card1-Features-li"
                        style={{ height: "fit-content" }}
                      >
                        {servicesList.length > 0 &&
                          servicesList.map((item, index) => {
                            return <li key={index}>{item?.osServiceName}</li>;
                          })}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {!featurePanelShow && (
            <div className="col-8 card3 ">
              <div className="card">
                <div className="card-header py-3">
                  <div className="card1-info d-flex">
                    <span className="info">Your Delivery</span>
                  </div>
                </div>
                <div className="card-body">
                  {orderDeliveryList.length <= 0 && (
                    <div className="row no-order">
                      <div className="col-2">
                        <img
                          height={150}
                          width={150}
                          src="https://img.freepik.com/free-vector/messenger-concept-illustration_114360-1394.jpg?size=626&ext=jpg&ga=GA1.2.1238397793.1685471528&semt=ais"
                        />
                      </div>
                      <div className="col-auto pt-4 ps-5">
                        <span className="info">Nothing here to see yet</span>
                        <p className="mt-1" style={{ width: 450 }}>
                          Your delivery will appear here. your delivery date
                          will be determined once you submit the requirements.
                        </p>
                      </div>
                    </div>
                  )}

                  {orderDeliveryList.length > 0 && (
                    <div className="row pending-order">
                      {orderDeliveryNotes !== "" && (
                        <>
                          <div>
                            <h6 className="mt-1" style={{ fontWeight: 600 }}>
                              Comment Admin Notifier :
                            </h6>
                            <p className="mt-1">{orderDeliveryNotes}</p>
                          </div>
                          <br />
                        </>
                      )}

                      {orderDeliveryList.map((item, index) => {
                        return (
                          <div className="col-5" key={index}>
                            <div className="info-box">
                              <span
                                className="info-box-icon"
                                style={{
                                  backgroundImage:
                                    "url(../ui/Images/upload-list-image-card.png)",
                                  backgroundSize: "cover",
                                }}
                              ></span>
                              <div className="info-box-content">
                                <span className="info-box-text">
                                  {item?.name}
                                </span>
                                <span className="info-box-number"></span>
                              </div>
                              <div
                                className="info-box-icon"
                                onClick={() => downloadService(item?.uid)}
                              >
                                <img src="../ui/Images/Vector.png" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Right First Card */}
          <div className="col-4 card2">
            <div className="card">
              <div className="card-header py-3">
                <div className="card1-info d-flex">
                  <span className="info">Order Details</span>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6 details">Order Status</div>
                  <div className="col-6" style={{ textAlign: "end" }}>
                    {servicesList[0]?.orStatus !== "Requirment pending" && (
                      <svg
                        width={19}
                        height={18}
                        viewBox="0 0 19 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.275 10.575L6.39375 8.69375C6.23333 8.53333 6.02917 8.45312 5.78125 8.45312C5.53333 8.45312 5.32917 8.53333 5.16875 8.69375C5.00833 8.85417 4.92812 9.05833 4.92812 9.30625C4.92812 9.55417 5.00833 9.75833 5.16875 9.91875L7.6625 12.4125C7.8375 12.5875 8.04167 12.675 8.275 12.675C8.50833 12.675 8.7125 12.5875 8.8875 12.4125L13.8313 7.46875C13.9917 7.30833 14.0719 7.10417 14.0719 6.85625C14.0719 6.60833 13.9917 6.40417 13.8313 6.24375C13.6708 6.08333 13.4667 6.00312 13.2188 6.00312C12.9708 6.00312 12.7667 6.08333 12.6062 6.24375L8.275 10.575ZM9.5 17.75C8.28958 17.75 7.15208 17.5202 6.0875 17.0605C5.02292 16.6008 4.09688 15.9775 3.30938 15.1906C2.52188 14.4031 1.89858 13.4771 1.4395 12.4125C0.980417 11.3479 0.750583 10.2104 0.75 9C0.75 7.78958 0.979833 6.65208 1.4395 5.5875C1.89917 4.52292 2.52246 3.59688 3.30938 2.80938C4.09688 2.02188 5.02292 1.39858 6.0875 0.9395C7.15208 0.480417 8.28958 0.250583 9.5 0.25C10.7104 0.25 11.8479 0.479833 12.9125 0.9395C13.9771 1.39917 14.9031 2.02246 15.6906 2.80938C16.4781 3.59688 17.1017 4.52292 17.5614 5.5875C18.021 6.65208 18.2506 7.78958 18.25 9C18.25 10.2104 18.0202 11.3479 17.5605 12.4125C17.1008 13.4771 16.4775 14.4031 15.6906 15.1906C14.9031 15.9781 13.9771 16.6017 12.9125 17.0614C11.8479 17.521 10.7104 17.7506 9.5 17.75Z"
                          fill="#198754"
                        />
                      </svg>
                    )}

                    <span
                      className="info"
                      style={{ color: "#198754", marginLeft: "5px" }}
                    >
                      {servicesList[0]?.orStatus === "Requirment pending" && (
                        <Link to={`/requirement/${orderDetailsList?.ctId}`}>
                          {" "}
                          <MdPendingActions style={{ fontSize: "22px" }} />{" "}
                          Requirment pending
                        </Link>
                      )}
                      {servicesList[0]?.orStatus !== "Requirment pending" &&
                        servicesList[0]?.orStatus}
                    </span>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6 details">Order created</div>
                  <div className="col-6" style={{ textAlign: "end" }}>
                    <span className="info" style={{ color: "#000" }}>
                      {orderDetailsList?.orDate}
                    </span>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6 details">Order number</div>
                  <div className="col-6" style={{ textAlign: "end" }}>
                    <span className="info" style={{ color: "#000" }}>
                      #{orderDetailsList?.orNumber}
                    </span>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6 details">Delivery date &amp; time</div>
                  <div className="col-6" style={{ textAlign: "end" }}>
                    <span className="info" style={{ color: "#000" }}>
                      {servicesList[0]?.deliveryDate}
                    </span>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6 details">Total</div>
                  <div className="col-6" style={{ textAlign: "end" }}>
                    <span className="info" style={{ color: "#000" }}>
                      ${orderDetailsList?.orPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right First Card */}
          {/* Left Second Card */}
          {featurePanelShow && (
            <div className="col-8 card3 mt-3">
              <div className="card">
                <div className="card-header py-3">
                  <div className="card1-info d-flex">
                    <span className="info">Your Delivery</span>
                  </div>
                </div>
                <div className="card-body">
                  {orderDeliveryList.length <= 0 && (
                    <div className="row no-order">
                      <div className="col-2">
                        <img
                          height={150}
                          width={150}
                          src="https://img.freepik.com/free-vector/messenger-concept-illustration_114360-1394.jpg?size=626&ext=jpg&ga=GA1.2.1238397793.1685471528&semt=ais"
                        />
                      </div>
                      <div className="col-auto pt-4 ps-5">
                        <span className="info">Nothing here to see yet</span>
                        <p className="mt-1" style={{ width: 450 }}>
                          Your delivery will appear here. your delivery date
                          will be determined once you submit the requirements.
                        </p>
                      </div>
                    </div>
                  )}

                  {orderDeliveryList.length > 0 && (
                    <div className="row pending-order">
                      {orderDeliveryNotes !== "" && (
                        <>
                          <div>
                            <h6 className="mt-1" style={{ fontWeight: 600 }}>
                              Comment Admin Notifier :
                            </h6>
                            <p className="mt-1">{orderDeliveryNotes}</p>
                          </div>
                          <br />
                        </>
                      )}
                      {orderDeliveryList.map((item, index) => {
                        return (
                          <div className="col-5" key={index}>
                            <div className="info-box">
                              <span
                                className="info-box-icon"
                                style={{
                                  backgroundImage:
                                    "url(../ui/Images/upload-list-image-card.png)",
                                  backgroundSize: "cover",
                                }}
                              ></span>
                              <div className="info-box-content">
                                <span className="info-box-text">
                                  {item?.name}
                                </span>
                                <span className="info-box-number"></span>
                              </div>
                              <div
                                className="info-box-icon"
                                onClick={() => downloadService(item?.uid)}
                              >
                                <img src="../ui/Images/Vector.png" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Left Second Card */}
          {/* Right Second Card */}
          <div className="col-4 card4 mt-3">
            <div className="card">
              <div className="card-header py-3">
                <div className="card1-info d-flex">
                  <span className="info">Flyses Support</span>
                </div>
              </div>
              <div className="card-body">
                <div
                  className="info-box support"
                  style={{ boxShadow: "none", minHeight: "auto" }}
                >
                  <div className="info-box-content">
                    <span className="info-box-text">FAQs</span>
                  </div>
                  <span
                    className="info-box-icon"
                    style={{ transition: "0.5s" }}
                  >
                    <img src="../ui/Images/arrow-right.png" />
                  </span>
                </div>
                <div
                  className="info-box support"
                  style={{ boxShadow: "none", minHeight: "auto" }}
                >
                  <div className="info-box-content">
                    <span className="info-box-text">Message to our team</span>
                  </div>
                  <span
                    className="info-box-icon"
                    style={{ transition: "0.5s" }}
                  >
                    <img src="../ui/Images/arrow-right.png" />
                  </span>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="col card3">
              <div className="py-3">
                <div className="card1-info d-flex">
                  <span className="info">Do you want to do it faster?</span>
                </div>
              </div>
              <div className="card-body p-0">
                <p>
                  You can <Link style={{ fontWeight: "bold" }}>contact</Link>{" "}
                  our team if you want to finish your assignment quickly.
                </p>
              </div>
            </div>
            {/*  */}
          </div>
          {/* Review */}
          {servicesList[0]?.orStatus === "Completed" && !isReview && (
            <div className="col-12 card5">
              <div className="card">
                <div className="card-body">
                  <div className="border-bottom row justify-content-between pending-order">
                    <div className="col-8">
                      <div
                        className="info-box"
                        style={{ border: "none", boxShadow: "none" }}
                      >
                        <div className="info-box-content">
                          <span className="info-box-number">
                            Service as Described
                          </span>
                          <span className="info-box-text">
                            Please give us a review, Your review should be about
                            your experience with the product.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div
                        className="info-box"
                        style={{ border: "none", boxShadow: "none" }}
                      >
                        <div className="info-box-content">
                          <div className="rate">
                            <label
                              htmlFor="star5"
                              title="text"
                              onClick={() => submitUserRating("Service", 5)}
                              style={{
                                color:
                                  ratingNumberList.Service !== 5
                                    ? "#e8e8e8"
                                    : "#deb217",
                              }}
                            />

                            <label
                              htmlFor="star4"
                              title="text"
                              onClick={(e) => submitUserRating("Service", 4)}
                              style={{
                                color:
                                  ratingNumberList.Service >= 4
                                    ? "#deb217"
                                    : "#e8e8e8",
                              }}
                            />

                            <label
                              htmlFor="star3"
                              title="text"
                              onClick={(e) => submitUserRating("Service", 3)}
                              style={{
                                color:
                                  ratingNumberList.Service >= 3
                                    ? "#deb217"
                                    : "#e8e8e8",
                              }}
                            />

                            <label
                              htmlFor="star2"
                              title="text"
                              onClick={(e) => submitUserRating("Service", 2)}
                              style={{
                                color:
                                  ratingNumberList.Service >= 2
                                    ? "#deb217"
                                    : "#e8e8e8",
                              }}
                            />

                            <label
                              htmlFor="star1"
                              title="text"
                              onClick={(e) => submitUserRating("Service", 1)}
                              style={{
                                color:
                                  ratingNumberList.Service >= 1
                                    ? "#deb217"
                                    : "#e8e8e8",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-bottom row justify-content-between pending-order">
                    <div className="col-8">
                      <div
                        className="info-box"
                        style={{ border: "none", boxShadow: "none" }}
                      >
                        <div className="info-box-content">
                          <span className="info-box-number">
                            Communication with us
                          </span>
                          <span className="info-box-text">
                            Please give us a review, Your review should be about
                            your experience with the product.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div
                        className="info-box"
                        style={{ border: "none", boxShadow: "none" }}
                      >
                        <div className="info-box-content">
                          <div className="rate">
                            <label
                              htmlFor="star6"
                              title="text"
                              onClick={(e) =>
                                submitUserRating("Communication", 5)
                              }
                              style={{
                                color:
                                  ratingNumberList.Communication >= 5
                                    ? "#deb217"
                                    : "#e8e8e8",
                              }}
                            />

                            <label
                              htmlFor="star7"
                              title="text"
                              onClick={(e) =>
                                submitUserRating("Communication", 4)
                              }
                              style={{
                                color:
                                  ratingNumberList.Communication >= 4
                                    ? "#deb217"
                                    : "#e8e8e8",
                              }}
                            />

                            <label
                              htmlFor="star8"
                              title="text"
                              onClick={(e) =>
                                submitUserRating("Communication", 3)
                              }
                              style={{
                                color:
                                  ratingNumberList.Communication >= 3
                                    ? "#deb217"
                                    : "#e8e8e8",
                              }}
                            />

                            <label
                              htmlFor="star9"
                              title="text"
                              onClick={(e) =>
                                submitUserRating("Communication", 2)
                              }
                              style={{
                                color:
                                  ratingNumberList.Communication >= 2
                                    ? "#deb217"
                                    : "#e8e8e8",
                              }}
                            />

                            <label
                              htmlFor="star10"
                              title="text"
                              onClick={(e) =>
                                submitUserRating("Communication", 1)
                              }
                              style={{
                                color:
                                  ratingNumberList.Communication >= 1
                                    ? "#deb217"
                                    : "#e8e8e8",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-bottom row justify-content-between pending-order">
                    <div className="col-8">
                      <div
                        className="info-box"
                        style={{ border: "none", boxShadow: "none" }}
                      >
                        <div className="info-box-content">
                          <span className="info-box-number">
                            Buy again or Recommend
                          </span>
                          <span className="info-box-text">
                            Please give us a review, Your review should be about
                            your experience with the product.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div
                        className="info-box"
                        style={{ border: "none", boxShadow: "none" }}
                      >
                        <div className="info-box-content">
                          <div className="rate">
                            <label
                              htmlFor="star15"
                              title="text"
                              onClick={(e) => submitUserRating("BuyAgain", 5)}
                              style={{
                                color:
                                  ratingNumberList.BuyAgain >= 5
                                    ? "#deb217"
                                    : "#e8e8e8",
                              }}
                            />

                            <label
                              htmlFor="star14"
                              title="text"
                              onClick={(e) => submitUserRating("BuyAgain", 4)}
                              style={{
                                color:
                                  ratingNumberList.BuyAgain >= 4
                                    ? "#deb217"
                                    : "#e8e8e8",
                              }}
                            />

                            <label
                              htmlFor="star13"
                              title="text"
                              onClick={(e) => submitUserRating("BuyAgain", 3)}
                              style={{
                                color:
                                  ratingNumberList.BuyAgain >= 3
                                    ? "#deb217"
                                    : "#e8e8e8",
                              }}
                            />

                            <label
                              htmlFor="star12"
                              title="text"
                              onClick={(e) => submitUserRating("BuyAgain", 2)}
                              style={{
                                color:
                                  ratingNumberList.BuyAgain >= 2
                                    ? "#deb217"
                                    : "#e8e8e8",
                              }}
                            />

                            <label
                              htmlFor="star11"
                              title="text"
                              onClick={(e) => submitUserRating("BuyAgain", 1)}
                              style={{
                                color:
                                  ratingNumberList.BuyAgain >= 1
                                    ? "#deb217"
                                    : "#e8e8e8",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row my-3 input-g">
                    <div className="col-12">
                      <div className="row justify-content-between pending-order">
                        <div className="col-12">
                          <div
                            className="info-box"
                            style={{
                              alignItems: "center",
                              minHeight: 60,
                              background: "#f8f9fa",
                            }}
                          >
                            <span
                              className="info-box-icon"
                              style={{
                                height: "fit-content",
                                borderRight: "1px solid #c8c8c8",
                                borderRadius: 0,
                              }}
                            >
                              <img src="../ui/Images/Smile-group-24.png" />
                            </span>

                            <div className="ms-3 input-g">
                              <input
                                className="form-control"
                                style={{ border: "none" }}
                                onChange={(e) =>
                                  setRatingNumberList({
                                    ...ratingNumberList,
                                    txtRating: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="info-box-icon download-triangle">
                              <img
                                src="../ui/Images/download-tri.png"
                                onClick={reviewSubmit}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {(servicesList[0]?.orStatus === "Delivered" ||
        servicesList[0]?.orStatus === "Completed" ||
        servicesList[0]?.orStatus === "Revision") && (
        <footer className="Order-status-footer">
          <div className="container">
            <div className="footer">
              <div className="row">
                <div className="col confirm-ord">
                  <p>Do you want to revisions this order?</p>
                </div>
                <div className="col d-flex">
                  {servicesList[0]?.orStatus !== "Revision" && (
                    <button
                      className="btn btn-outline-dark"
                      style={{ color: "white" }}
                      onClick={() => handleConfirmClick(5)}
                    >
                      Request Revisions
                    </button>
                  )}

                  {(servicesList[0]?.orStatus === "Delivered" ||
                    servicesList[0]?.orStatus === "Revision") && (
                    <button
                      className="btn btn-dark"
                      onClick={() => handleConfirmClick(6)}
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default OrderDetails;
