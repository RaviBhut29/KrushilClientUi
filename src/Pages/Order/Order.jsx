import React, { useMemo } from "react";
import { Pagination } from "antd";
import Header from "../../Layout/Header";
import BreadCrub from "../../Layout/BreadCrub";
import { useEffect } from "react";
import { useState } from "react";
import { REACT_APP, setLoadingStatus } from "../../FlysesApi";
import { toastError, toastSuccess } from "../../FlysesApi/FlysesApi";
import { getOrder } from "../../FlysesApi/Order";
import OrderDetails from "./OrderDetails";
import copy from "copy-to-clipboard";
import "./Order.css";

const Order = () => {
  const currentYear = new Date().getFullYear();
  const handlePaginationChange = (page) => {
    setFilterDetail({ ...filterDetail, pageNo: page });
  };
  const [totalRecord, setTotalRecord] = useState(0);

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

  const userId = sessionStorage.getItem("userId");
  const [filterDetail, setFilterDetail] = useState({
    orUserId: userId,
    orderNumber: "",
    year: "",
    lastMonth: 0,
    progress: 0,
    delivered: 0,
    cancelled: 0,
    revision: 0,
    completed: 0,
    refund: 0,
    pageNo: 1,
  });

  const [orderDetailsShow, setOrderDetailsShow] = useState(false);
  //const [orderId, setOrderId] = useState(0);
  const [orderObj, setOrderObj] = useState(null);

  useEffect(() => {
    if (filterDetail.orderNumber === "") {
      setLoadingStatus(true);
    }
    setTotalRecord(0);
    getOrderFun();
  }, [filterDetail]);

  const [orderList, setOrderList] = useState([]);

  const getOrderFun = () => {
    getOrder(filterDetail)
      .then((response) => {
        if (response.length > 0) {
          setTotalRecord(response[0]?.totalRecord);
          setOrderList(response);
          if (!resetDiv) {
            setResetDiv(true);
          }
        } else {
          setOrderList([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const handleCopyOrderNumber = (copyText) => {
    copy(copyText);
    toastSuccess(`You have copied "${copyText}"`);
  };

  const [resetDiv, setResetDiv] = useState(true);

  useMemo(() => {
    if (!resetDiv) {
      setFilterDetail({
        ...filterDetail,
        orUserId: userId,
        orderNumber: "",
        year: "",
        lastMonth: 0,
        progress: 0,
        delivered: 0,
        cancelled: 0,
        revision: 0,
      });
    }
  }, [resetDiv]);

  const handleResetFliterClick = () => {
    setResetDiv(false);
  };

  const handleFilterClick = (e, name) => {
    setFilterDetail({
      ...filterDetail,
      [name]: e.target.checked ? 1 : 0,
    });
  };

  const handleYearFilterChange = (e, year) => {
    let yearStr = filterDetail?.year;
    if (e.target.checked) {
      yearStr += yearStr !== "" ? ", " + year : year;
    } else {
      yearStr = yearStr.includes(", " + year)
        ? yearStr.replace(", " + year, "")
        : yearStr.includes(year + ", ")
        ? yearStr.replace(year + ", ", "")
        : yearStr.includes(year)
        ? yearStr.replace(year, "")
        : "";
    }
    setFilterDetail({
      ...filterDetail,
      year: yearStr,
    });
  };

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
                    {resetDiv && (
                      <div className="search">
                        <img src="../ui/Images/search.svg" alt="Search icon" />
                        <input
                          className="form-control"
                          placeholder="Search Order Id"
                          style={{ width: "234px" }}
                          onChange={(e) =>
                            setFilterDetail({
                              ...filterDetail,
                              orderNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
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
                                <p>${item?.orPrice}</p>
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
                                          onClick={() =>
                                            handleCopyOrderNumber(
                                              item?.orNumber
                                            )
                                          }
                                        />
                                      </span>
                                    </p>
                                  </div>
                                </span>
                                <div
                                  className="col btn-rate d-flex m-auto"
                                  style={{ cursor: "pointer" }}
                                >
                                  
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
                {totalRecord > 5 && (
                  <center>
                    <Pagination
                      onChange={handlePaginationChange}
                      current={filterDetail?.pageNo}
                      total={totalRecord}
                      //pageSizeOptions={[5]}
                      defaultPageSize={5}
                    />
                  </center>
                )}
              </div>
              <div className="col-4 my-Filter">
                <div className="card Filter">
                  <div className="card-header d-flex">
                    Filters
                    <span
                      className="resetLabel"
                      onClick={handleResetFliterClick}
                    >
                      Reset
                    </span>
                  </div>
                  {resetDiv && (
                    <div className="card-body">
                      <div className="check-list">
                        <label className="left" for="group1">
                          <input
                            type="checkbox"
                            id="group1"
                            onChange={(e) => handleFilterClick(e, "progress")}
                          />
                          On the way
                        </label>
                        <label className="right" for="group2">
                          <input
                            type="checkbox"
                            id="group2"
                            onChange={(e) => handleFilterClick(e, "lastMonth")}
                          />
                          Last 30 days
                        </label>
                        <label className="left" for="group3">
                          <input
                            type="checkbox"
                            id="group3"
                            onChange={(e) => handleFilterClick(e, "delivered")}
                          />
                          Delivered
                        </label>
                        <label className="right" for="group4">
                          <input
                            type="checkbox"
                            id="group4"
                            onChange={(e) =>
                              handleYearFilterChange(
                                e,
                                String(Number(currentYear) - 2)
                              )
                            }
                          />
                          {Number(currentYear) - 2}
                        </label>
                        <label className="left" for="group5">
                          <input
                            type="checkbox"
                            id="group5"
                            onChange={(e) => handleFilterClick(e, "cancelled")}
                          />
                          Cancelled
                        </label>
                        <label className="right" for="group6">
                          <input
                            type="checkbox"
                            id="group6"
                            onChange={(e) =>
                              handleYearFilterChange(
                                e,
                                String(Number(currentYear) - 1)
                              )
                            }
                          />
                          {Number(currentYear) - 1}
                        </label>
                        <label
                          className="left"
                          for="group7"
                          style={{ marginBottom: "-15px" }}
                        >
                          <input
                            type="checkbox"
                            id="group7"
                            onChange={(e) => handleFilterClick(e, "revision")}
                          />
                          Returned
                        </label>
                        <label className="right" for="group8">
                          <input
                            type="checkbox"
                            id="group8"
                            onChange={(e) =>
                              handleYearFilterChange(e, String(currentYear))
                            }
                          />
                          {currentYear}
                        </label>
                        <label className="left" for="group9">
                          <input
                            type="checkbox"
                            id="group9"
                            onChange={(e) => handleFilterClick(e, "completed")}
                          />
                          Completed
                        </label>
                        <label className="left" for="group10">
                          <input
                            type="checkbox"
                            id="group10"
                            onChange={(e) => handleFilterClick(e, "refund")}
                          />
                          Refund
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <OrderDetails
          orderDetailsList={orderObj}
          setOrderDetailsShow={setOrderDetailsShow}
          setOrderDetailsList={setOrderObj}
        />
      )}
    </>
  );
};

export default Order;
