import React, { useEffect, useState } from "react";
import { decryptWithRk, setLoadingStatus } from "../../FlysesApi";
import { toastError } from "../../FlysesApi/FlysesApi";
import { getProductWiseReview } from "../../FlysesApi/Plan";
import { Rate } from "antd";
import userImage from "./userblue.jpg"

const ProductReview = () => {
  let path = window.location.pathname;
  let splitdata = path.split("/");

  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    setLoadingStatus(true);
    bindReview();
  }, []);

  const bindReview = async () => {
    const categoryId = await decryptWithRk(splitdata[splitdata.length - 1]);
    getProductWiseReview(categoryId)
      .then((response) => {
        if (response?.length > 0) {
          setReviewList(response);
        } else {
          setReviewList([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const convertPercentageToReview = (reviewPercentage) => {
    let reviewCount = 0;
    if (reviewPercentage <= 10) {
      reviewCount = 0.5;
    } else if (reviewPercentage <= 20) {
      reviewCount = 1;
    } else if (reviewPercentage <= 30) {
      reviewCount = 1.5;
    } else if (reviewPercentage <= 40) {
      reviewCount = 2;
    } else if (reviewPercentage <= 50) {
      reviewCount = 2.5;
    } else if (reviewPercentage <= 60) {
      reviewCount = 3;
    } else if (reviewPercentage <= 70) {
      reviewCount = 3.5;
    } else if (reviewPercentage <= 80) {
      reviewCount = 4;
    } else if (reviewPercentage <= 90) {
      reviewCount = 4.5;
    } else if (reviewPercentage <= 100) {
      reviewCount = 5;
    }
    return reviewCount;
  };

  return (
    <div className="rev">
      <section id="testimonials">
        <div className="testimonial-box-container">
          {reviewList.length > 0 &&
            reviewList.map((item, index) => {
              return (
                <div key={index}>
                  <div className="testimonial-box">
                    {/*top-----------------------*/}
                    <div className="box-top">
                      {/*profile---*/}
                      <div className="profile">
                        {/*img--*/}
                        <div className="profile-img">
                          <img src={userImage} />
                        </div>
                        {/*name-and-username*/}
                        <div className="name-user">
                          <strong>{item?.userName}</strong>
                          {item?.fackReview !== "1" && (
                            <span>{item?.usercountry}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/*Comments--------------------------------------*/}
                    <div className="client-comment">
                      <p>{item?.rvDesc}</p>
                    </div>
                    {/* ------Rating--------- */}
                    <div className="container row align-items-end p-0">
                      <div className="col-2 px-0 Rating-Container-Class">
                        <div style={{marginBottom:"12px"}}>
                          {Number(item?.totalReview) !== 0 && (
                            <Rate
                              allowHalf
                              defaultValue={convertPercentageToReview(
                                Number(item?.totalReview)
                              )}
                              disabled
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-2 px-0 Rating-Container-Class">
                        {Number(item?.totalReview) !== 0 && (
                          <p className="comnt_rating_p">
                            {convertPercentageToReview(
                              Number(item?.totalReview)
                            )} ★ 
                          </p>
                        )}
                      </div>
                      {item?.fackReview !== "1" && (
                        <div className="col-2 px-0 Rating-Container-Class">
                          <p className="comnt_rating_p2">
                            | {item?.reviewDatetime}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* ------Rating--------- */}
                  </div>
                  <hr width={700} />
                </div>
              );
            })}
          {/*BOX-1------------*/}
        </div>
      </section>

      {/* <nav
        className="forweb"
        aria-label="Page navigation example"
        style={{ textAlign: "center" }}
      >
        <ul className="pagination justify-content-start">
          <li className="page-item">
            <a className="page-link" href="#">
              <span>&lt;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              ...
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              4
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              5
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              6
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              7
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              ...
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              20
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              <span>&gt;</span>
            </a>
          </li>
        </ul>
      </nav> */}

      <nav className="forMobile" aria-label="Page navigation example">
        <div style={{ textAlign: "center" }}>
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#">
                <span>&lt;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                <span>&gt;</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default ProductReview;
