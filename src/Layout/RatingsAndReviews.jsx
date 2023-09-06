import React from "react";

const RatingsAndReviews = (props) => {
  const { ishideGrowfasterPanel } = props;
  return (
    <div>
      {!ishideGrowfasterPanel && (
        <p className="text-center margin-def">
          <span className="b1">Grow faster with help your customers</span>
          <br />
          <span className="b2">
            Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
            consectetur.Lorem ipsum dolor sit amet consectetur.
          </span>
        </p>
      )}
      <section className="Grow">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-3 d-flex justify-content-center">
              <div
                className="card icon-link"
                style={{ width: "100%", border: "none", boxShadow: "none" }}
              >
                <img
                  className="my-3"
                  src="../ui/Images/rating-review.svg"
                  alt="Card image cap"
                />
                <div
                  className="rhead"
                  style={{ backgroundColor: "#ffffff", border: "none" }}
                >
                  <p>Ratings &amp; Reviews</p>
                </div>
                <div className="rbody">
                  <p>
                    Collect reviews, Q&amp;A and other content from your
                    customers started.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3 d-flex justify-content-center">
              <div
                className="card icon-link"
                style={{ width: "100%", border: "none", boxShadow: "none" }}
              >
                <img
                  className="my-3"
                  src="../ui/Images/SalesAndMark.svg"
                  alt="Card image cap"
                />
                <div
                  className="rhead"
                  style={{ backgroundColor: "#ffffff", border: "none" }}
                >
                  <p>Sales and Marketing</p>
                </div>
                <div className="rbody">
                  <p>
                    Use your user-generated content in sales and marketing.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3 d-flex justify-content-center">
              <div
                className="card icon-link"
                style={{ width: "100%", border: "none", boxShadow: "none", background:"transparent" }}
              >
                <img
                  className="my-3"
                  src="../ui/Images/CustumerExp.svg"
                  alt="Card image cap"
                  style={{height:"59px"}}
                />
                <div
                  className="rhead"
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  <p>Customer Experience</p>
                </div>
                <div className="rbody">
                  <p>
                    In the end, it's all about your customers. Build their trust and help.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RatingsAndReviews;
