import React from "react";
import { PropagateLoader } from "react-spinners";

const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="loading">
          <PropagateLoader color="#0090e7" />
        </div>
      )}
    </>
  );
};

export default Loader;
