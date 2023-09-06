import React from "react";
import Home from "../Pages/Home/Home";
import NotificationHandler from "../Pages/Notification/NotificationHandler";
import { Navigate } from "react-router-dom";

export const Layout = ({ Component, footer, type,path }) => {
  const getLoginToken = sessionStorage.getItem("userSortName");

  if (
    (getLoginToken === null || getLoginToken === "") &&
    (path === "/chat" || path.includes("/order"))
  ) {
    return <Navigate to="/Login" replace={true} />;
  } else {
    return (
      <>
        <NotificationHandler />
        <Component />
      </>
    );
  }
  //       {type === "authentication" ? (
  //         <Component />
  //       ) : (
  //         <div className="container-scroller">
  //           <SideBar />
  //           <div className="container-fluid page-body-wrapper">
  //             <HeaderNavBar />
  //             <div className="main-panel">
  //               <Component />
  //               {footer && <Footer />}
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </>
  //   );
  // } else {
  //   return <Navigate to="/Login" replace={true} />;
  // }
};
