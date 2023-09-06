import React, { useEffect, useMemo, useState } from "react";
import { Input, Radio, Space } from 'antd'
import {
  getRequirementList,
  submitFormDetail,
} from "../../FlysesApi/Requirement";
import { setLoadingStatus } from "../../FlysesApi";
import { toastError, toastSuccess } from "../../FlysesApi/FlysesApi";
import Header from "../../Layout/Header";
import { useNavigate } from "react-router-dom";

export const Requirement = () => {
  let path = window.location.pathname;
  let splitdata = path.split("/");
  const categoryId = splitdata[splitdata.length - 1];
  const history = useNavigate();
  const [requirementFormData, setRequirementFormData] = useState([]);
  const [formData, setFormData] = useState({ requirementDetailList: [] });

  const handleInputChange = (urQuId, value) => {
    const userId = sessionStorage.getItem("userId");
    const dataIndex = formData.requirementDetailList.findIndex(
      (x) => Number(x.urQuId) === Number(urQuId)
    );
    const obj = { urUserId: userId, urQuId: urQuId, urAns: String(value) };
    if (Number(dataIndex) < 0) {
      setFormData({
        requirementDetailList: [...formData.requirementDetailList, obj],
      });
    } else {
      setFormData({
        requirementDetailList: [
          ...formData.requirementDetailList.slice(0, dataIndex),
          obj,
          ...formData.requirementDetailList.slice(dataIndex + 1),
        ],
      });
    }

    setValue(value);
  };

  useEffect(() => {
    getRequirementForm();
  }, []);

  const getRequirementForm = () => {
    setLoadingStatus(true);
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

  const btnSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus(true);
    submitFormDetail(formData)
      .then((response) => {
        setLoadingStatus(false);
        history(`/order`);
        toastSuccess(`Requirement form submited successfully`);
      })
      .catch(() => {
        setLoadingStatus(false);
        toastError("Bad response from server");
      });
  };
  const [value, setValue] = useState();
  return (
    <>
      <div className="home requirements">
        <div className="container">
          <Header />
          {/* <form onSubmit={btnSubmit}> */}
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
                        <label htmlFor="inputPassword4" className="lbl_req_Question">
                          {item?.no} {item?.quQuestion}
                          <span className="text-danger mx-2">*</span>
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
                          required={true}
                        />
                      </>
                    )}
                    {item?.quQuestionAnsType === 2 && (
                      <>
                        <label htmlFor="inputEmail4" className="lbl_req_Question">
                          {item?.no} {item?.quQuestion}
                          &nbsp;
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          id="inputState"
                          className="form-select ddl_require"
                          onChange={(e) =>
                            handleInputChange(item?.quId, e.target.value)
                          }
                          required={true}
                        >
                          <option value="">Please Select..</option>
                          {item?.ansTypeList.length > 0 &&
                            item?.ansTypeList.map((opItem) => {
                              return (
                                <option value={opItem?.qdId} key={opItem?.qdId}>
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
                          <span className="text-danger">*</span>
                        </label>
                        {item?.ansTypeList.length > 0 &&
                          item?.ansTypeList.map((radioItem, rdIndex) => {
                            return (
                              // <p className="col-md-12" key={radioItem?.qdId}>
                              <div className="col-md-12" key={radioItem?.qdId}>
                                <Radio.Group style={{ color: "green", marginBottom: "10px" }} onChange={(e) =>
                                  handleInputChange(
                                    item?.quId,
                                    radioItem?.qdId
                                  )
                                }
                                  value={value}>
                                  <Space direction="vertical">
                                    <Radio value={radioItem?.qdId} className="lbl_rdo_requirement">
                                      {radioItem?.qdName}
                                    </Radio>
                                  </Space>
                                </Radio.Group>
                                {/* <input
                                type="radio"
                                id={radioItem?.qdId}
                                name={`radio-group-${item?.quId}`}
                                onChange={(e) =>
                                  handleInputChange(
                                    item?.quId,
                                    radioItem?.qdId
                                  )
                                }
                                required
                              />
                              <label htmlFor={radioItem?.qdId} className="lbl_rdo_requirement">
                                {radioItem?.qdName}
                              </label> */}
                                {/* </p> */}
                              </div>
                            );
                          })}
                      </>
                    )}
                  </div>
                );
              })}
              <div className="col-md-12 py-5 BlankSpace"></div>
          </div>

          {/* </form> */}
        </div>
        <footer className="Order-status-footer">
          {/* <div className="container Order-status-footer"> */}
          <div className="Order-status-footer-req">
            <div className="footer">
              <div className="form-row">
                <div className="col-md-12">
                  <label className="lbl_requi_footer_note">Please fill all the required fields and submit the form.</label>
                  <button className="btn btn-dark" type="submit" style={{ float: "right" }}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
