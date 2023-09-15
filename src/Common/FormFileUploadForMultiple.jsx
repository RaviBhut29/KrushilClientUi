import React, { useEffect, useState } from "react";

const FormFileUploadForMultiple = (props) => {
  const {
    fileUploadLabel,
    fileOnChange,
    quId,
    fileList,
    setFileList,
    inValid,
    inValidMsg,
    fieldRequired,
  } = props;

  const changedfileIndex = fileList.findIndex((x) => x.fileId === quId);

  useEffect(() => {
    if (changedfileIndex < 0) {
      setFileList([...fileList, { fileId: quId, fileName: "" }]);
    }
  }, []);

  const fileUploadClick = () => {
    if (
      fileList[changedfileIndex]?.fileName !== "" &&
      fileList[changedfileIndex]?.fileName !== undefined
    ) {
      setFileList([
        ...fileList.slice(0, changedfileIndex),
        { fileId: quId, fileName: "" },
        ...fileList.slice(changedfileIndex + 1),
      ]);
      fileOnChange(null,quId,"");
    } else {
      let input = document.createElement("input");
      input.type = "file";
      input.onchange = (e) => {
        console.warn("quID",quId)
        console.warn(fileList);
        console.warn("changedfileIndex",changedfileIndex)
        let files = Array.from(input.files);
        setFileList([
          ...fileList.slice(0, changedfileIndex),
          { fileId: quId, fileName: files[0]["name"] },
          ...fileList.slice(changedfileIndex + 1),
        ]);
        fileOnChange(e,quId,files[0]["name"]);
      };
      input.click();
    }
  };

  const getFileName = fileList[changedfileIndex]?.fileName;

  return (
    <>
      <label className="lbl_req_Question">
        {fileUploadLabel}
        {fieldRequired && <span className="text-danger"> *</span>}
      </label>

      <div className="input-group">
        <input
          type="text"
          className={"form-control file-upload-info"}
          style={{ backgroundColor: "white" }}
          disabled
          placeholder="Upload Image"
          value={getFileName}
        />
        <span className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={fileUploadClick}
          >
            {getFileName === "" || getFileName === undefined ? "Upload" : "X"}
          </button>
        </span>
      </div>
      <span className="text-danger invalidMsg">{inValidMsg}</span>
    </>
  );
};

export default FormFileUploadForMultiple;
