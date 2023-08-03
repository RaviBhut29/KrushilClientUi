import React from "react";
import Header from "../../Layout/Header";
import BreadCrub from "../../Layout/BreadCrub";
import { useEffect } from "react";
import { useState } from "react";
import { REACT_APP, setLoadingStatus } from "../../FlysesApi";
import { toastError, toastSuccess } from "../../FlysesApi/FlysesApi";
import { getOrder } from "../../FlysesApi/Order";
import OrderDetails from "./OrderDetails";
import copy from "copy-to-clipboard";

const Order = () => {
  const siteMapPath = [
    {
      name: "Home",
      clickable: true,
      isHome: true,
      path: "/home",
    },
    {
      name: "Orders",
      clickable: false,
      isHome: false,
      path: "/orders",
    },
  ];

  const [orderDetailsShow, setOrderDetailsShow] = useState(false);
  //const [orderId, setOrderId] = useState(0);
  const [orderObj,setOrderObj] = useState(null);

  useEffect(() => {
    getOrderFun();
  }, []);

  const [orderList, setOrderList] = useState([]);

  const getOrderFun = () => {
    const userId = sessionStorage.getItem("userId");
    getOrder(userId)
      .then((response) => {
        if (response.length > 0) {
          setOrderList(response);
        } else {
          setOrderList([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const handleCopyOrderNumber = (copyText) =>{
    copy(copyText);
    toastSuccess(`You have copied "${copyText}"`);
  }

  return (
    <>
      {!orderDetailsShow ? (
        <div className="home">
          <div className="container All_Order" style={{ position: "relative" }}>
            {/* Navigation */}
            <Header />
            {/* Navigation */}
            <BreadCrub siteMapPath={siteMapPath} />

            <div className="row">
              <div className="col-8 my-order">
                <div className="row">
                  <div className="col d-flex btn-search-head">
                    <span>My Orders</span>
                    <div className="search">
                      <img src="../ui/Images/search.svg" alt="Search icon" />
                      <input
                        className="form-control"
                        placeholder="Search"
                        style={{ width: "234px" }}
                      />
                    </div>
                  </div>

                  {orderList.length > 0 &&
                    orderList.map((item, index) => {
                      return (
                        <div className="d-one my-4">
                          <div className="col">
                            <div className="main">
                              <div
                                className="logo"
                                style={{ width: "fit-content" }}
                              >
                                {/* <img src="../ui/Images/image-placeholder.png" /> */}
                                <img
                                  src={`${REACT_APP}category/getCategoryFile/${item?.ctImageId}`}
                                  width={"110px"}
                                />
                              </div>
                              <div
                                className="header mx-2"
                                style={{ width: "fit-content" }}
                              >
                                <p className="head">{item?.ctTitle}</p>
                                <span>
                                  <p className="status-details">
                                    <img
                                      src="../ui/Images/status.png"
                                      alt=""
                                      style={{ marginRight: "5px" }}
                                    />
                                    Your order will deliver tomorrow
                                  </p>
                                </span>
                              </div>
                              <div
                                className="col price"
                                style={{
                                  position: "absolute",
                                  right: "22px",
                                  width: "fit-content",
                                }}
                              >
                                <p>${item?.ctPrice}</p>
                              </div>
                              <div className="hr" />
                              <div className="col-12 row">
                                <span className="col-7">
                                  <div className="order-id my-3">
                                    <p>
                                      Order ID :
                                      <span style={{ marginLeft: "5px" }}>
                                        #{item?.orNumber}
                                        {/* <i class="fa fa-copy"></i> */}
                                        <img
                                          src="../ui/images/copy-svg.svg"
                                          style={{
                                            marginLeft: "5px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => handleCopyOrderNumber(item?.orNumber)}
                                        />
                                      </span>
                                    </p>
                                  </div>
                                </span>
                                <div
                                  className="col btn-rate d-flex m-auto"
                                  style={{ cursor: "pointer" }}
                                >
                                  <a className="ms-auto">Rate &amp; Review</a>
                                </div>
                                <div
                                  className="col-2 btn-order d-flex m-auto"
                                  style={{ cursor: "pointer" }}
                                >
                                  <a
                                    className="ms-auto"
                                    onClick={() => {
                                      setOrderDetailsShow(true);
                                      setOrderObj(orderList[index]);
                                      console.warn(orderList[index])
                                    }}
                                  >
                                    View Order
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="col-4 my-Filter">
                <div className="card Filter">
                  <div className="card-header d-flex">
                    Filters
                    <span style={{ marginLeft: "auto" }}>Reset</span>
                  </div>
                  <div className="card-body">
                    <div className="check-list">
                      <span className="left">
                        <input
                          type="checkbox"
                          style={{ marginRight: "5px", marginTop: "-2px" }}
                        />
                        On the way
                      </span>
                      <span className="right">
                        <input
                          type="checkbox"
                          style={{ marginRight: "5px", marginTop: "-2px" }}
                        />
                        Last 30 days
                      </span>
                      <span className="left">
                        <input
                          type="checkbox"
                          style={{ marginRight: "5px", marginTop: "-2px" }}
                        />
                        Delivered
                      </span>
                      <span className="right">
                        <input
                          type="checkbox"
                          style={{ marginRight: "5px", marginTop: "-2px" }}
                        />
                        2022
                      </span>
                      <span className="left">
                        <input
                          type="checkbox"
                          style={{ marginRight: "5px", marginTop: "-2px" }}
                        />
                        Cancelled
                      </span>
                      <span className="right">
                        <input
                          type="checkbox"
                          style={{ marginRight: "5px", marginTop: "-2px" }}
                        />
                        2021
                      </span>
                      <span className="left">
                        <input
                          type="checkbox"
                          style={{ marginRight: "5px", marginTop: "-2px" }}
                        />
                        Returned
                      </span>
                      <span className="right">
                        <input
                          type="checkbox"
                          style={{ marginRight: "5px", marginTop: "-2px" }}
                        />
                        Older
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <OrderDetails orderDetailsList={orderObj} setOrderDetailsShow={setOrderDetailsShow}/>
      )}
    </>
  );
};

export default Order;
