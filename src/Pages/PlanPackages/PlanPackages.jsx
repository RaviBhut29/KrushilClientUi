import React, { useMemo } from "react";
import rightTick from "../../Assets/Images/right-tick.png";
import "./product.scss";
import Header from "../../Layout/Header";
import BreadCrub from "../../Layout/BreadCrub";
import { getPlan } from "../../FlysesApi/Plan";
import { useState } from "react";
import { setLoadingStatus } from "../../FlysesApi";
import { toastError } from "../../FlysesApi/FlysesApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPlanWiseOrderOptionDetails } from "../../FlysesApi/PlanOrderDetailApi";
import { Button, Drawer, Space } from "antd";
import CouponCode from "./CouponCode";
import PayPal from "../Paypal/Paypal";
import { Checkbox } from 'antd';

const PlanPackages = (props) => {
  const history = useNavigate();
  const { categorySiteMapPath, setPricePlanPackages } = props;
  const [planDetails, setPlanDetails] = useState([]);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isPayPal, setIsPayPal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    planId: "",
    price: "",
    planName: "",
  });
  const [couponCode, setCouponCode] = useState("");
  const [orderModifyDetails, setOrderModifyDetails] = useState([]);

  useEffect(() => {
    setLoadingStatus(true);
    getAllPlan();
  }, []);

  const getAllPlan = () => {
    getPlan(categorySiteMapPath[3]?.path.replace("/product/", ""))
      .then((response) => {
        if (response.length > 0) {
          setPlanDetails(response);
        } else {
          setPlanDetails([]);
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
      name: "Services",
      clickable: true,
      isHome: false,
      path: "/services",
    },
    {
      name: categorySiteMapPath[2]?.name,
      clickable: true,
      isHome: false,
      path: categorySiteMapPath[2]?.path,
    },
    {
      name: categorySiteMapPath[3]?.name,
      clickable: true,
      isHome: false,
      path: categorySiteMapPath[3]?.path,
      onClick: true,
    },
    {
      name: "Pricing",
      clickable: false,
      isHome: false,
      path: "",
    },
  ];

  const handleCategorySiteMap = (name) => {
    setPricePlanPackages(false);
  };

  //////////////////////For Plan Wise Modify Order
  const [open, setOpen] = useState(false);
  const [planPrice, setPlanPrice] = useState(0);

  const handlePlanClick = (id) => {
    const userId = sessionStorage.getItem("userId");
    if (Number(userId) !== 0 && userId !== null && userId !== undefined) {
      setOpen(true);
      bindOrderDetails(id);
      setPaymentDetails({
        ...paymentDetails,
        planId: id,
        planName: orderDetails[0]?.pnName,
      });
    } else {
      history(`/login`);
    }
  };

  const [orderDetails, setOrderDetails] = useState([]);
  const [orderDetailsBCK, setOrderDetailsBCK] = useState([]);

  const bindOrderDetails = (id) => {
    setLoadingStatus(true);
    setOrderDetails([]);
    getPlanWiseOrderOptionDetails(id)
      .then((response) => {
        if (response.length > 0) {
          setOrderDetails(response);
          setOrderDetailsBCK(JSON.stringify(response));
          setPlanPrice(response[0]?.pnPrice);
        } else {
          setOrderDetails([]);
          setOrderDetailsBCK([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const onClose = () => {
    setOpen(false);
    setIsPayPal(false);
    setOrderModifyDetails([]);
  };

  const handlePlusClick = (index, charge, action) => {
    const bckArray = JSON.parse(orderDetailsBCK);

    if (
      (bckArray[index]?.osIncrementerDefaultValue >
        orderDetails[index]?.osIncrementerDefaultValue &&
        Number(action) === 2) ||
      (bckArray[index]?.osIncrementerDefaultValue <=
        orderDetails[index]?.osIncrementerDefaultValue &&
        Number(action) !== 2)
    ) {
      let Array = [];
      Array = orderDetails;
      if (Array.length > 0) {
        if (Number(action) === 2) {
          Array[0]["pnPrice"] =
            Number(orderDetails[0]?.pnPrice) - Number(charge);
        } else {
          Array[0]["pnPrice"] =
            Number(orderDetails[0]?.pnPrice) + Number(charge);
        }
        Array[index]["osIncrementerDefaultValue"] =
          Number(orderDetails[index]?.osIncrementerDefaultValue) + 1;

        if (
          Number(orderDetails[index]?.osIncrementerDefaultValue) ===
          bckArray[index]?.osIncrementerDefaultValue
        ) {
          setOrderModifyDetails(
            orderModifyDetails.filter(
              (x) => x.uoOsId !== orderDetails[index]?.osId
            )
          );
        } else {
          const existsOsId = orderModifyDetails.findIndex(
            (x) => x.uoOsId === orderDetails[index]?.osId
          );
          if (existsOsId < 0) {
            const obj = {
              uoOsId: orderDetails[index]?.osId,
              uoSelectedDefaultValue: Number(
                orderDetails[index]?.osIncrementerDefaultValue
              ),
            };

            setOrderModifyDetails([...orderModifyDetails, obj]);
          } else {
            const obj = {
              uoOsId: orderDetails[index]?.osId,
              uoSelectedDefaultValue: Number(
                orderDetails[index]?.osIncrementerDefaultValue
              ),
            };

            setOrderModifyDetails([
              ...orderModifyDetails.slice(0, existsOsId),
              obj,
              ...orderModifyDetails.slice(existsOsId + 1),
            ]);
          }
        }

        setOrderDetails([...Array]);
      }
    }
  };

  useMemo(() => {
    console.clear();
    console.warn(orderModifyDetails);
  }, [orderModifyDetails]);

  const handleMinusClick = (index, charge, action) => {
    const bckArray = JSON.parse(orderDetailsBCK);

    if (
      (bckArray[index]?.osIncrementerDefaultValue >=
        orderDetails[index]?.osIncrementerDefaultValue &&
        Number(action) === 2 &&
        Number(orderDetails[index]?.osIncrementerDefaultValue) !== 1) ||
      (bckArray[index]?.osIncrementerDefaultValue <
        orderDetails[index]?.osIncrementerDefaultValue &&
        Number(action) !== 2)
    ) {
      let Array = [];
      Array = orderDetails;
      if (Array.length > 0) {
        if (Number(action) === 2) {
          Array[0]["pnPrice"] =
            Number(orderDetails[0]?.pnPrice) + Number(charge);
        } else {
          Array[0]["pnPrice"] =
            Number(orderDetails[0]?.pnPrice) - Number(charge);
        }
        Array[index]["osIncrementerDefaultValue"] =
          Number(orderDetails[index]?.osIncrementerDefaultValue) - 1;

        if (
          Number(orderDetails[index]?.osIncrementerDefaultValue) ===
          bckArray[index]?.osIncrementerDefaultValue
        ) {
          setOrderModifyDetails(
            orderModifyDetails.filter(
              (x) => x.uoOsId !== orderDetails[index]?.osId
            )
          );
        } else {
          const existsOsId = orderModifyDetails.findIndex(
            (x) => x.uoOsId === orderDetails[index]?.osId
          );
          if (existsOsId < 0) {
            const obj = {
              uoOsId: orderDetails[index]?.osId,
              uoSelectedDefaultValue: Number(
                orderDetails[index]?.osIncrementerDefaultValue
              ),
            };

            setOrderModifyDetails([...orderModifyDetails, obj]);
          } else {
            const obj = {
              uoOsId: orderDetails[index]?.osId,
              uoSelectedDefaultValue: Number(
                orderDetails[index]?.osIncrementerDefaultValue
              ),
            };

            setOrderModifyDetails([
              ...orderModifyDetails.slice(0, existsOsId),
              obj,
              ...orderModifyDetails.slice(existsOsId + 1),
            ]);
          }
        }

        setOrderDetails([...Array]);
      }
    }
  };

  const handleIncludeFeature = (e, index, charge) => {
    let Array = [];
    Array = orderDetails;

    if (Array.length > 0) {
      if (e.target.checked) {
        Array[0]["pnPrice"] = Number(orderDetails[0]?.pnPrice) + Number(charge);
        setOrderDetails([...Array]);

        const obj = {
          uoOsId: orderDetails[index]?.osId,
          uoSelectedDefaultValue: 0,
        };
        setOrderModifyDetails([...orderModifyDetails, obj]);
      } else {
        Array[0]["pnPrice"] = Number(orderDetails[0]?.pnPrice) - Number(charge);
        setOrderDetails([...Array]);

        setOrderModifyDetails(
          orderModifyDetails.filter(
            (x) => x.uoOsId !== orderDetails[index]?.osId
          )
        );
      }
    }
  };

  const displayTotalPrice = (price, isPaymentValue = false) => {
    if (couponDiscount !== 0) {
      const currentPrice =
        Number(price) -
        Math.round((Number(price) * Number(couponDiscount)) / 100);
      return isPaymentValue ? currentPrice : "$" + currentPrice;
    } else return isPaymentValue ? price : "$" + price;
  };

  const handleCheckOutClick = () => {
    setIsPayPal(true);
    setPaymentDetails({
      ...paymentDetails,
      price: displayTotalPrice(orderDetails[0]["pnPrice"], true),
    });
  };

  return (
    <>
      <div className="">
        <div
          className="container logo-design planContainer"
          style={{
            position: "relative"
          }}
        >
          {/* Navigation */}
          <Header />
          {/* Navigation */}
          <BreadCrub
            siteMapPath={siteMapPath}
            handleSiteMapClick={handleCategorySiteMap}
          />
          <div className="service-pricing-card mt-5 mb-5 planCard">
            <div className="row justify-content-center">
              {planDetails.length > 0 &&
                planDetails.map((item) => {
                  return (
                    <div className="col-md-4 my-2" key={item?.pnId}>
                      <div className="pricing-card  position-relative">
                        <div className="pricing-inner-col">
                          <div className="d-flex align-items-center justify-content-between mb-1 pricing-plan pb-1">
                            <h4 className="m-0 planTitle">{item?.pnName}</h4>
                            <h1 className="m-0 pink-text planPrice">
                              ${item?.pnPrice}
                            </h1>
                          </div>
                          <div className="pricing-card-body">
                            <p className="green-text">
                              Save up to {item?.pnSaveUpTo}%
                            </p>
                            <p className="grey-text">{item?.pnDesc}</p>
                            <div className="mt-4">
                              {item?.planServiceDetailsList.length > 0 &&
                                item?.planServiceDetailsList.map((serItem) => {
                                  return (
                                    <div
                                      className="d-flex align-items-center planInclude"
                                      key={serItem?.srPdId}
                                      style={{
                                        opacity:
                                          serItem?.pnIsInclude === 1
                                            ? ""
                                            : "0.4",
                                      }}
                                    >
                                      <img
                                        src={serItem?.pnIsInclude === 1
                                          ? "../ui/Images/wrong right icons-01.svg"
                                          : "../ui/Images/wrong right icons-02.svg"}
                                        alt="" className="mb-1 me-1" />
                                      <p className="bold-content">
                                        {serItem?.pnIncludedService}
                                      </p>
                                    </div>
                                  );
                                })}
                            </div>

                            <p className="capital-text-forplan">
                              Included Features
                            </p>
                            <ul className="pricing-list">
                              {item?.planFeatureDetailsList.length > 0 &&
                                item?.planFeatureDetailsList.map((feaItem) => {
                                  return (
                                    <li
                                      key={feaItem?.faPdId}
                                      style={{
                                        opacity:
                                          feaItem?.pnIsInclude === 1
                                            ? ""
                                            : "0.4",
                                      }}
                                    >
                                      <a href="#" className="dark-text">
                                        {feaItem?.pnIncludedFeature}
                                      </a>
                                    </li>
                                  );
                                })}
                            </ul>
                            <button
                              type="button"
                              className="blue-btn mt-2 w-100"
                              onClick={() => handlePlanClick(item?.pnId)}
                            >
                              Order now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Drawer
        title="Order options"
        placement={"right"}
        width={600}
        onClose={onClose}
        open={open}
        //open={true}
        extra={
          <Space>
            <span className="PaymentCardPopup">
              Save up to {orderDetails[0]?.pnSaveUpTo}%
            </span>
          </Space>
        }
      >
        {open && (
          <div className="container PaymentCard">
            <div className="row">
              <div className="col-md-12 mb-3 p-3 border rounded-3">
                <p className="PaymentCardText">
                  <span className="ServiceName"> {orderDetails[0]?.pnName}</span>
                  <span className="StanderdPlanPrice">
                    {planPrice !== 0 && `$${planPrice}`}
                  </span>
                </p>
                <p className="mb-0">{orderDetails[0]?.pnDesc}</p>
              </div>

              {orderDetails.length > 0 &&
                orderDetails.map((item, index) => {
                  if (String(item?.osType) === "1") {
                    return (
                      <div
                        className="col-md-12 mb-3 p-3 border rounded-3"
                        key={item?.osId}
                      >
                        <p className="PaymentCardText mb-0">
                          <span className="ServiceName">{item?.osServiceName}</span>
                          <span className="PaymentCharges">
                            ${item?.osServiceCharge} /{" "}
                            {item?.osServiceChargeName}
                          </span>
                          <div className="number">
                            <Button
                              classNames="minus"
                              onClick={() =>
                                handleMinusClick(
                                  index,
                                  item?.osServiceCharge,
                                  item?.osPriceIncreaseActionType
                                )
                              }
                              disabled={
                                JSON.parse(orderDetailsBCK)[index]
                                  ?.osIncrementerDefaultValue ===
                                item?.osIncrementerDefaultValue &&
                                Number(item?.osPriceIncreaseActionType) !== 2
                              }
                            >
                              -
                            </Button>
                            <input
                              className="NumbersInput"
                              type="text"
                              value={item?.osIncrementerDefaultValue}
                            />
                            <Button
                              classNames="plus"
                              onClick={() =>
                                handlePlusClick(
                                  index,
                                  item?.osServiceCharge,
                                  item?.osPriceIncreaseActionType
                                )
                              }
                              disabled={
                                JSON.parse(orderDetailsBCK)[index]
                                  ?.osIncrementerDefaultValue ===
                                item?.osIncrementerDefaultValue &&
                                Number(item?.osPriceIncreaseActionType) === 2
                              }
                            >
                              +
                            </Button>
                          </div>
                        </p>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="col-md-12 mb-3 p-3 border rounded-3"
                        key={item?.osId}
                      >
                        {/* <input
                          type="checkbox"
                          id={item?.osId}
                          className="me-3"
                          onChange={(e) =>
                            handleIncludeFeature(
                              e,
                              index,
                              item?.osServiceCharge
                            )
                          }></input> */}
                        <Checkbox id={item?.osId} onChange={(e) =>
                          handleIncludeFeature(
                            e,
                            index,
                            item?.osServiceCharge
                          )
                        }></Checkbox>
                        <label style={{ margin: "0px" }} htmlFor={item?.osId}>
                          <p className="PaymentCardText mb-0">
                            <span className="ServiceName"> {item?.osServiceName}</span>
                            <span className="PaymentCharges">
                              ${item?.osServiceCharge}
                            </span>
                          </p>
                        </label>
                      </div>
                    );
                  }
                })}
              <div className="col-md-12 p-3 border mb-3 rounded-3">
                {/* <input type="checkbox" id="chk_term" className="me-3"></input> */}
                <Checkbox id="chk_term" className="me-3"></Checkbox>
                <label htmlFor="chk_term" style={{ margin: "0px" }} >
                  <p className="Paymentterms mb-0">
                    I Agree to All
                    <a>&nbsp;terms and condition & privacy policy</a>
                  </p>
                </label>
              </div>

              <div className="col-12 mb-3">{/* Card Here */}</div>

              <CouponCode
                couponDiscount={couponDiscount}
                setCouponDiscount={setCouponDiscount}
                orderDetails={orderDetails}
                setIsPayPal={setIsPayPal}
                setCouponCode={setCouponCode}
              />

              <div className="col-md-12 my-3 border-bottom"></div>
              <div className="col-md-12 border Total">
                <div className="d-flex py-2">
                  <span className="PaymentCardText">Total</span>
                  <span className="PaymentCardText ms-auto mb-1">
                    {displayTotalPrice(orderDetails[0]?.pnPrice)}
                  </span>
                </div>
              </div>
              <div className="col-md-12 my-3 text-center px-0">
                <button
                  className="btn btn-primary rounded-0 w-100 p-2"
                  style={{ border: "#0C0D48" }}
                  onClick={handleCheckOutClick}
                >
                  Continue to Checkout
                </button>
              </div>

              {isPayPal && (
                <div className="col-md-12 my-3 text-center px-0">
                  <PayPal
                    paymentDetails={paymentDetails}
                    setOpen={setOpen}
                    orderModifyDetails={orderModifyDetails}
                    setOrderModifyDetails={setOrderModifyDetails}
                    couponCode={couponCode}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default PlanPackages;
