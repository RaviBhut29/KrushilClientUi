import React, { useEffect, useMemo, useState } from "react";
import { Input, Radio, Space } from "antd";
import {
  getRequirement,
  getRequirementList,
  submitFormDetail,
  submitFormFileDetail,
} from "../../FlysesApi/Requirement";
import { decryptWithRk, setLoadingStatus } from "../../FlysesApi";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../FlysesApi/FlysesApi";
import Header from "../../Layout/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormFileUploadForMultiple from "../../Common/FormFileUploadForMultiple";
import RequirementView from "./RequirementView";

export const Requirement = () => {
  let path = window.location.pathname;
  let splitdata = path.split("/");
  const [searchParams, setSearchParams] = useSearchParams();

  const history = useNavigate();
  const [requirementFormData, setRequirementFormData] = useState([]);
  const [formData, setFormData] = useState({
    requirementDetailList: [],
    orId: searchParams,
  });
  const [fileList, setFileList] = useState([]);
  const [submitFileInput, setSubmitFileInput] = useState([]);

  useEffect(() => {
    setLoadingStatus(true);
    const view = searchParams.get("view");
    if ((view !== null) & (view !== null) & (view !== "")) {
      handleRequirementViewClick(view);
    } else {
      setLoadingStatus(false);
    }
  }, []);

  useMemo(() => {
    console.clear();
    console.warn("submitFileInput ", submitFileInput);
  }, [submitFileInput]);

  const [requirementViewList, setRequirementViewList] = useState([]);

  const handleRequirementViewClick = async (view) => {
    setLoadingStatus(true);
    const key = searchParams.get("key");
    const orderId = await decryptWithRk(key);
    const userId = sessionStorage.getItem("userId") || 0;
    const categoryId = await decryptWithRk(view);

    getRequirement(userId, categoryId, orderId)
      .then((response) => {
        if (response.length > 0) {
          setRequirementViewList(response);
        } else {
          setRequirementViewList([]);
        }
      })
      .catch(() => {
        toastError("Bad response from server");
      })
      .finally(() => setLoadingStatus(false));
  };

  const handleInputChange = (urQuId, value, file = null, type = null) => {
    const userId = sessionStorage.getItem("userId") || 0;
    const dataIndex = formData.requirementDetailList.findIndex(
      (x) => Number(x.urQuId) === Number(urQuId)
    );
    const obj = {
      urUserId: userId,
      urQuId: urQuId,
      urAns: String(value),
      file: file,
    };

    if (file !== null || type === "file") {
      const fileObj = {
        urUserId: userId,
        urQuId: urQuId,
        urAns: String(value),
        file: file,
        urOrderId: formData?.orId,
      };

      const getIndex = submitFileInput.findIndex(
        (x) => Number(x.urQuId) === Number(urQuId)
      );

      if (type === "file" && getIndex !== -1) {
        setSubmitFileInput(
          submitFileInput.filter((x, index) => index !== getIndex)
        );
      } else {
        setSubmitFileInput([...submitFileInput, fileObj]);
      }
    } else {
      if (Number(dataIndex) < 0) {
        setFormData({
          ...formData,
          requirementDetailList: [...formData.requirementDetailList, obj],
        });
      } else {
        setFormData({
          ...formData,
          requirementDetailList: [
            ...formData.requirementDetailList.slice(0, dataIndex),
            obj,
            ...formData.requirementDetailList.slice(dataIndex + 1),
          ],
        });
      }

      setValue(value);
    }
  };

  const bindOrderId = async () => {
    const key = searchParams.get("key");
    if (key !== null && key !== undefined && key !== "") {
      const id = await decryptWithRk(key);
      setFormData({
        ...formData,
        orId: Number(id),
      });
    }
  };

  useEffect(() => {
    bindOrderId();
    getRequirementForm();
  }, []);

  const getRequirementForm = async () => {
    setLoadingStatus(true);
    const categoryId = await decryptWithRk(splitdata[splitdata.length - 1]);
    getRequirementList(categoryId)
      .then((response) => {
        if (response.length > 0) {
          setRequirementFormData(response);
        } else {
          setRequirementFormData([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const formValidation = () => {
    return new Promise((resolve) => {
      let inValid = false;

      const countOfDocument = requirementFormData.filter(
        (x) => x.quQuestionRequired === 1
      );

      const checkRequiredFiledValueFillUp = countOfDocument.map((x) => {
        if (x?.quQuestionAnsType === 4) {
          const index = submitFileInput.findIndex(
            (_x) =>
              _x?.urQuId === x?.quId &&
              _x?.urAns.trim() !== "" &&
              _x?.urAns !== null &&
              _x?.urAns !== undefined
          );
          if (index === -1) {
            inValid = true;
          }
        } else {
          const index = formData?.requirementDetailList.findIndex(
            (_x) =>
              _x?.urQuId === x?.quId &&
              _x?.urAns.trim() !== "" &&
              _x?.urAns !== null &&
              _x?.urAns !== undefined
          );
          if (index === -1) {
            inValid = true;
          }
        }
      });

      if (checkRequiredFiledValueFillUp.length !== countOfDocument.length) {
        inValid = true;
      }
      // const fileArray = fileList.filter((x) => x.fileName !== "");

      // if (countOfDocument.length !== fileArray.length) {
      //   inValid = true;
      // }

      resolve(inValid);
    });
  };

  const btnSubmit = async (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    const isvalid = await formValidation();
    if (isvalid) {
      setLoadingStatus(false);
      toastWarning(
        `Please fill all the required fields (*) and submit the form.`
      );
      return true;
    }
    submitFormDetail(formData)
      .then((response) => {
        submitAttechmentDocument();
      })
      .catch(() => {
        toastError("Bad response from server");
      })
      .finally(() => setLoadingStatus(false));
  };

  const submitAttechmentDocument = async () => {
    let isSubmit = true;
    if (submitFileInput.length > 0) {
      for (let i = 0; i < submitFileInput.length; i++) {
        if (submitFileInput[i]?.urAns !== "") {
          await submitFormFileDetail(submitFileInput[i])
            .then((response) => {})
            .catch(() => {
              isSubmit = false;
            });
        }
      }
      if (isSubmit) {
        setLoadingStatus(false);
        toastSuccess(`Requirement form submited successfully`);
        history(`/order`);
      } else {
        setLoadingStatus(false);
        toastError(`Bad response from server`);
      }
    } else {
      toastSuccess(`Requirement form submited successfully`);
      history(`/order`);
    }
  };

  const [value, setValue] = useState();

  const fileOnChange = async (e, urQuId, ansName) => {
    const index = fileList.findIndex((x) => x.quId === urQuId);

    if (e === null) {
      handleInputChange(urQuId, ansName, null, "file");
      return true;
    }

    let files = e.target.files;
    if (files.length > 0) {
      const file = e.target.files[0];
      var fileName = files[0]?.name;
      var fileSize = files[0]?.size;
      var idxDot = fileName.lastIndexOf(".") + 1;
      var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
      if (
        extFile == "jpg" ||
        extFile == "jpeg" ||
        extFile == "png" ||
        extFile == "svg" ||
        extFile == "zip"
      ) {
        if (fileSize < 100000000) {
          handleInputChange(urQuId, ansName, file);
        } else {
          alert("Maximum 100 mb file are allowed!");
          handleInputChange(urQuId, ansName);
          setFileList([
            ...fileList.slice(0, index),
            { fileId: urQuId, fileName: "" },
            ...fileList.slice(index + 1),
          ]);
        }
      } else {
        alert("Only jpg/jpeg and png files are allowed!");
        handleInputChange(urQuId, ansName);
        setFileList([
          ...fileList.slice(0, index),
          { fileId: urQuId, fileName: "" },
          ...fileList.slice(index + 1),
        ]);
      }
    } else {
      handleInputChange(urQuId, ansName);
      setFileList([
        ...fileList.slice(0, index),
        { fileId: urQuId, fileName: "" },
        ...fileList.slice(index + 1),
      ]);
    }
  };

  return (
    <>
      <div className="home requirements">
        <form onSubmit={btnSubmit}>
          <div className="container">
            <Header />
            {requirementViewList.length > 0 && (
              <RequirementView requirementViewList={requirementViewList} />
            )}

            {requirementViewList.length === 0 && (
              <>
                <span style={{ color: "red", marginLeft: "10px" }}>
                  Please fill out (*) the required fields before you submit the
                  form.
                </span>
                <div className="form-row">
                  {requirementFormData.length > 0 &&
                    requirementFormData.map((item, index) => {
                      return (
                        <div
                          className={
                            item?.quQuestionAnsType === 3
                              ? "col-md-12 mt-3 px-3"
                              : "col-md-6 mt-3 px-3"
                          }
                        >
                          {item?.quQuestionAnsType === 1 && (
                            <>
                              <label
                                htmlFor="inputPassword4"
                                className="lbl_req_Question"
                              >
                                {item?.no} {item?.quQuestion}
                                {Number(item?.quQuestionRequired) === 1 && (
                                  <span className="text-danger mx-2">*</span>
                                )}
                              </label>
                              <textarea
                                className="form-control txt_requirement"
                                placeholder="Start typing.."
                                id="exampleFormControlTextarea1"
                                rows={1}
                                defaultValue={""}
                                onChange={(e) =>
                                  handleInputChange(item?.quId, e.target.value)
                                }
                                required={false}
                              />
                            </>
                          )}
                          {item?.quQuestionAnsType === 2 && (
                            <>
                              <label
                                htmlFor="inputEmail4"
                                className="lbl_req_Question"
                              >
                                {item?.no} {item?.quQuestion}
                                &nbsp;
                                {Number(item?.quQuestionRequired) === 1 && (
                                  <span className="text-danger mx-2">*</span>
                                )}
                              </label>
                              <select
                                id="inputState"
                                className="form-select ddl_require"
                                onChange={(e) =>
                                  handleInputChange(item?.quId, e.target.value)
                                }
                                required={false}
                              >
                                <option value="">Please Select..</option>
                                {item?.ansTypeList.length > 0 &&
                                  item?.ansTypeList.map((opItem) => {
                                    return (
                                      <option
                                        value={opItem?.qdId}
                                        key={opItem?.qdId}
                                      >
                                        {opItem?.qdName}
                                      </option>
                                    );
                                  })}
                              </select>
                            </>
                          )}
                          {item?.quQuestionAnsType === 3 && (
                            <>
                              <label className="lbl_req_Question">
                                {item?.no} {item?.quQuestion}{" "}
                                {Number(item?.quQuestionRequired) === 1 && (
                                  <span className="text-danger mx-2">*</span>
                                )}
                              </label>
                              {item?.ansTypeList.length > 0 &&
                                item?.ansTypeList.map((radioItem, rdIndex) => {
                                  const defaultValue =
                                    item?.ansTypeList[0]?.qdId;
                                  const radioValue =
                                    Number(
                                      formData?.requirementDetailList.find(
                                        (x) => x.urQuId === item?.quId
                                      )?.urAns
                                    ) || 0;

                                  if (radioValue === 0) {
                                    handleInputChange(item?.quId, defaultValue);
                                  }

                                  if (Number(defaultValue) !== 0) {
                                    return (
                                      <div
                                        className="col-md-12"
                                        key={radioItem?.qdId}
                                      >
                                        <Radio.Group
                                          style={{
                                            color: "green",
                                            marginBottom: "10px",
                                          }}
                                          onChange={(e) =>
                                            handleInputChange(
                                              item?.quId,
                                              radioItem?.qdId
                                            )
                                          }
                                          value={
                                            radioValue !== 0
                                              ? radioValue
                                              : value
                                          }
                                          defaultValue={defaultValue}
                                        >
                                          <Space direction="vertical">
                                            <Radio
                                              value={Number(radioItem?.qdId)}
                                              className="lbl_rdo_requirement"
                                            >
                                              {radioItem?.qdName}
                                            </Radio>
                                          </Space>
                                        </Radio.Group>
                                      </div>
                                    );
                                  }
                                })}
                            </>
                          )}
                          {item?.quQuestionAnsType === 4 && (
                            <>
                              <FormFileUploadForMultiple
                                fileUploadLabel={
                                  item?.no + " " + item?.quQuestion
                                }
                                fileOnChange={fileOnChange}
                                quId={item?.quId}
                                fileList={fileList}
                                setFileList={setFileList}
                                inValid={false}
                                inValidMsg={""}
                                fieldRequired={
                                  Number(item?.quQuestionRequired) === 1
                                }
                              />
                            </>
                          )}
                        </div>
                      );
                    })}
                  <div className="col-md-12 py-5 BlankSpace"></div>
                </div>
              </>
            )}
          </div>
          {requirementViewList.length === 0 && (
            <footer className="Order-status-footer">
              {/* <div className="container Order-status-footer"> */}
              <div className="Order-status-footer-req">
                <div className="footer">
                  <div className="form-row">
                    <div className="col-md-12">
                      <label className="lbl_requi_footer_note">
                        Please fill all the required fields and submit the form.
                      </label>
                      <button
                        className="btn btn-dark"
                        type="submit"
                        style={{ float: "right" }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          )}
        </form>
      </div>
    </>
  );
};
