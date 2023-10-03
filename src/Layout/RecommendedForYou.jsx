import React from "react";

const RecommendedForYou = () => {
  return (
    <>
      <h5 className="title3 my-5">Recommended for you</h5>
      <div
        style={{
          backgroundImage: "url(/ui/Images/background-square.png",
        }}
        className="text-center justify-content-center"
      >
        <div
          className="row lead text-lg-start"
          style={{ background: "#ffffff" }}
        >
          <div className="col-3 d-flex justify-content-center">
            <div className="card">
              <div className="card-body">
                <img src="/ui/Images/minimalist-logo.png" />
                <h5 className="card-title mt-3 px-3 Recommended_Card">
                  Typography logo
                  <span>Like: Airbnb</span>
                </h5>
                <p className="card-text mx-3 card-amount">
                  <span className="amount">₹2500</span>
                  <span className="mx-2">from Starting</span>
                </p>
                <p className="card-text reco_desc px-3">
                  We will design modern logo and unique for your next level
                  business
                </p>
                <p className="card-text discount mx-3 my-3">
                  <span>Save up to 70%</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-3 d-flex justify-content-center mx-5">
            <div className="card">
              <div className="card-body">
                <img src="/ui/Images/minimalist-logo.png" />
                <h5 className="card-title mt-3 px-3 Recommended_Card">
                  Typography logo
                  <span>Like: Airbnb</span>
                </h5>
                <p className="card-text mx-3 card-amount">
                  <span className="amount">₹2500</span>
                  <span className="mx-2">from Starting</span>
                </p>
                <p className="card-text reco_desc px-3">
                  We will design modern logo and unique for your next level
                  business
                </p>
                <p className="card-text discount mx-3 my-3">
                  <span>Save up to 70%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendedForYou;
