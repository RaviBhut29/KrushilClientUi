import React from "react";

const ContectUs = () => {
    return (
        <>
            <div className="contact-us-section">
                <div className="container sub-section">
                    <div className="row text-center justify-content-center">
                        <div className="col-3">
                            <h3 className="contact-head" id="projectDone">
                                126
                            </h3>
                            <h6>Projects Done</h6>
                        </div>
                        <div className="col-3">
                            <h3 className="contact-head" id="yearsExper">
                                4+
                            </h3>
                            <h6>Years Experience</h6>
                        </div>
                        <div className="col-3">
                            <h3 className="contact-head" id="happyCus">
                                98
                            </h3>
                            <h6>Happy Customers</h6>
                        </div>
                    </div>
                    <div className="contact-text">
                        <h3>Want to start a Project With us?</h3>
                        <p>
                            Enter your email address to receive all news from our awesome
                            services and offers.
                        </p>
                        <button className="con-us-btn btn btn-secondary">Contact Us</button>
                    </div>
                </div>
            </div></>
    );
};

export default ContectUs;