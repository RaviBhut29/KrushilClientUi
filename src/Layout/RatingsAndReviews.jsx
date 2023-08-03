import React from "react";

const RatingsAndReviews = (props) => {
  const { ishideGrowfasterPanel } = props;
  return (
    <div>
      {!ishideGrowfasterPanel && (
        <p className="text-center my-5">
          <span className="b1">Grow faster with help your customers</span>
          <br />
          <span className="b2">
            Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
            consectetur.Lorem ipsum dolor sit amet consectetur.
          </span>
        </p>
      )}
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-3 d-flex justify-content-center">
              <div
                className="card icon-link"
                style={{ width: "18rem", border: "none", boxShadow: "none" }}
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
                style={{ width: "18rem", border: "none", boxShadow: "none" }}
              >
                <img
                  className="my-3"
                  src="../ui/Images/Phone-icon.png"
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
                style={{ width: "18rem", border: "none", boxShadow: "none" }}
              >
                <img
                  className="my-3"
                  src="../ui/Images/state-Icon.png"
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default RatingsAndReviews;
