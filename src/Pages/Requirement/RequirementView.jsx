import React from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { REACT_APP, setLoadingStatus } from "../../FlysesApi";

const RequirementView = ({ requirementViewList }) => {
  const handleRequirementDocumnetClick = (id) => {
    setLoadingStatus(true);
    var url = String(REACT_APP + "Requirement/DownloadRequirementFile/" + id);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.target = "_blank";
    downloadLink.click();
    setLoadingStatus(false);
  };

  return (
    <div className="form-row">
      {requirementViewList.length > 0 &&
        requirementViewList.map((item, index) => {
          return (
            <div className="col-md-6 mt-3 px-3">
              <label htmlFor="inputPassword4" className="lbl_req_Question">
                {index + 1} {item?.quQuestion}
              </label>
              <br />
              <label>
                ans :{" "}
                {String(item?.quQuestionAnsType) === "4" && (
                  <span
                    style={{ color: "#e71d7c", cursor: "pointer" }}
                    onClick={() => handleRequirementDocumnetClick(item?.urId)}
                  >
                    {item?.answer}{" "}
                    {item?.answer !== null &&
                      item?.answer !== undefined &&
                      item?.answer !== "" && (
                        <HiOutlineDownload
                          style={{ color: "#e71d7c", fontSize: "18px" }}
                        />
                      )}
                  </span>
                )}
                {String(item?.quQuestionAnsType) !== "4" && item?.answer}
              </label>
            </div>
          );
        })}
      <div className="col-md-12 py-5 BlankSpace"></div>
    </div>
  );
};

export default RequirementView;
