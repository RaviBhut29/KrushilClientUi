import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const history = useNavigate();
  useEffect(() => {
    let path = window.location.pathname;
    let splitdata = path.split("/");
    if (splitdata[splitdata.length - 1] === "notfound") {
    } else {
      history("/Notfound");
      window.location.reload();
    }
  }, []);
  return (
    // <div className="container-scroller">
    //   <div className="container-fluid page-body-wrapper full-page-wrapper">
    //     <div className="content-wrapper d-flex align-items-center text-center error-page bg-primary">
    //       <div className="row flex-grow">
    //         <div className="col-lg-7 mx-auto text-white">
    //           <div className="row align-items-center d-flex flex-row">
    //             <div className="col-lg-6 text-lg-right pr-lg-4">
    //               <h1 className="display-1 mb-0">404</h1>
    //             </div>
    //             <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
    //               <h2>SORRY!</h2>
    //               <h3 className="font-weight-light">
    //                 The page you’re looking for was not found.
    //               </h3>
    //             </div>
    //           </div>
    //           <div className="row mt-5">
    //             <div className="col-12 text-center mt-xl-2">
    //               <Link className="text-white font-weight-medium" to="/">
    //                 Back to home
    //               </Link>
    //             </div>
    //           </div>
    //           <div className="row mt-5">
    //             <div className="col-12 mt-xl-2">
    //               <p className="text-white font-weight-medium text-center">
    //                 Copyright © 2020 All rights reserved.
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* content-wrapper ends */}
    //   </div>
    //   {/* page-body-wrapper ends */}
    // </div>
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404"></div>
        <h1>404</h1>
        <h2>Oops! Page Not Be Found</h2>
        <p>
          Sorry but the page you are looking for does not exist, have been
          removed. name changed or is temporarily unavailable
        </p>
        <Link className="font-weight-medium" to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
