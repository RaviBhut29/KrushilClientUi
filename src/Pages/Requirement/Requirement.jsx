import React, { useEffect, useMemo, useState } from "react";
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

  return (
    <>
      <div className="container mx-5 requirements">
        <Header />
        <form onSubmit={btnSubmit}>
          <div className="row">
            {requirementFormData.length > 0 &&
              requirementFormData.map((item, index) => {
                return (
                  <div
                    className={
                      item?.quQuestionAnsType === 3
                        ? "col-12 mt-3"
                        : "col-6 mt-3"
                    }
                  >
                    {item?.quQuestionAnsType === 1 && (
                      <>
                        <label htmlFor="inputPassword4">
                          {item?.no} {item?.quQuestion}
                          <span className="text-danger mx-2">*</span>
                        </label>
                        <textarea
                          className="form-control"
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
                        <label htmlFor="inputEmail4">
                          {item?.no} {item?.quQuestion}
                          <i
                            className="fa fa-sharp fa-light fa-circle-exclamation"
                            style={{ filter: "invert(1)" }}
                          />
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          id="inputState"
                          className="form-select"
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
                        <p>
                          {item?.no} {item?.quQuestion}{" "}
                          <span className="text-danger">*</span>
                        </p>
                        {item?.ansTypeList.length > 0 &&
                          item?.ansTypeList.map((radioItem, rdIndex) => {
                            return (
                              <p className="col-12" key={radioItem?.qdId}>
                                <input
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
                                <label htmlFor={radioItem?.qdId}>
                                  {radioItem?.qdName}
                                </label>
                              </p>
                            );
                          })}
                      </>
                    )}
                  </div>
                );
              })}
          </div>

          <footer className="Order-status-footer">
            <div className="container">
              <div className="footer">
                <div className="row">
                  <div className="col confirm-ord">
                    <p>Please fill all the required fields and submit the form.</p>
                  </div>
                  <div className="col d-flex">
                    <button className="btn btn-dark" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </form>
      </div>
    </>
  );
};
