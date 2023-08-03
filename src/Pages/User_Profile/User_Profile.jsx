import React, { useEffect, useMemo, useState } from "react";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import {
  customSearchStyles,
  customStylesError,
} from "../../../src/configs/conts";
import Header from "../../Layout/Header";
import BreadCrub from "../../Layout/BreadCrub";
import PhoneInput, { formatPhoneNumberIntl } from "react-phone-number-input";
import validator from "validator";
import { isValidPhoneNumber } from "react-phone-number-input";
import { FormFeedback } from "reactstrap";
import { getuserdetails } from "../../FlysesApi/Profile";
import { setLoadingStatus } from "../../FlysesApi";
import { toastError, toastSuccess } from "../../FlysesApi/FlysesApi";
import { Link } from "react-router-dom";
import { updateUser } from "../../FlysesApi/Login";

export const User_Profile = () => {
  const [country, setCountry] = useState();
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [countryDefaultValue, setCountryDefaultValue] = useState(0);

  // const isGoogleUser = sessionStorage.getItem("isGoogleUser") || false;
  // console.clear()
  // console.warn(isGoogleUser)
  // const userId = sessionStorage.getItem("userId") || 0;

  const [formData, setFormData] = useState({
    userId: "",
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userNumber: "",
    userState: "",
    userCity: "",
    userPassword: "",
  });

  const [validationFormData, setValidationFormData] = useState({
    userFirstName: false,
    userLastName: false,
    userEmail: false,
    userNumber: false,
    userState: false,
    userCity: false,
    userPassword: false,
  });

  const siteMapPath = [
    {
      name: "Home",
      clickable: true,
      isHome: true,
      path: "/home",
    },
    {
      name: "Profile",
      clickable: false,
      isHome: false,
      path: "/profile",
    },
  ];

  useEffect(() => {
    const isGoogleUserLogin =
      (sessionStorage.getItem("isGoogleUser") || "false") === "false"
        ? false
        : true;
    const UserId = sessionStorage.getItem("userId") || 0;
    setIsGoogleUser(isGoogleUserLogin);

    const countryArray = Country?.getAllCountries()?.map(function (item) {
      return { value: item.isoCode, label: item.name };
    });

    setCountry(countryArray);
    bindUserDetails(UserId, countryArray);
  }, []);

  const bindUserDetails = (id, countryArray = []) => {
    getuserdetails(id)
      .then((response) => {
        if (response !== null) {
          setFormData({
            ...formData,
            userId: response.userId,
            userFirstName: response.userFirstName,
            userLastName: response.userLastName,
            userEmail: response.userEmail,
            userNumber: response.userNumber,
            userState: response.userState,
            userCity: response.userCity,
            userPassword: response.userPassword,
          });

          const obj = countryArray.filter(
            (x) => x.label === response.userState
          )[0];
          setCountryDefaultValue(obj);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  useMemo(() => {
    console.warn("formData");
    console.warn(formData);
  }, [formData]);

  const handleFormDataChange = (eName, eValue) => {
    if (eName === "userState") {
      setFormData({ ...formData, [eName]: eValue.label });
    } else {
      setFormData({ ...formData, [eName]: eValue });
    }
    setValidationFormData({ ...validationFormData, [eName]: false });
  };

  const formValidation = () => {
    debugger;
    const {
      userFirstName,
      userLastName,
      userEmail,
      userNumber,
      userState,
      userCity,
      userPassword,
    } = formData;

    let isValid = false;

    let obj = {
      userFirstName: false,
      userLastName: false,
      userEmail: false,
      userNumber: false,
      userState: false,
      userCity: false,
      userPassword: false,
    };

    if (userFirstName === "") {
      obj.userFirstName = true;
      isValid = true;
    }

    if (userLastName === "") {
      obj.userLastName = true;
      isValid = true;
    }

    if (userEmail === "") {
      obj.userEmail = true;
      isValid = true;
    } else {
      if (!validator.isEmail(userEmail)) {
        obj.userEmail = true;
        isValid = true;
      }
    }

    if (userNumber === "") {
      obj.userNumber = true;
      isValid = true;
    } else if (userNumber !== null && !isValidPhoneNumber(userNumber)) {
      isValid = true;
    }

    if (userState === "") {
      obj.userState = true;
      isValid = true;
    }

    if (userCity === "") {
      obj.userCity = true;
      isValid = true;
    }

    if (
      userPassword !== null &&
      (userPassword === "" ||
      userPassword.length < 4 ||
      userPassword.length > 12)
    ) {
      obj.userPassword = true;
      isValid = true;
    }

    setValidationFormData(obj);

    return isValid;
  };

  const onLogin = (e) => {
    debugger;
    setLoadingStatus(true);
    e.preventDefault();

    if (formValidation()) {
      setLoadingStatus(false);
      return true;
    }

    const UserId = sessionStorage.getItem("userId") || 0;

    updateUser(UserId, formData)
      .then((response) => {
        setLoadingStatus(false);
        toastSuccess("User profile updated successful.");
      })
      .catch(() => {
        toastError("Bad response from server");
        setLoadingStatus(false);
      });
  };

  return (
    <>
      <div className="home">
        <div className="container User_Profile">
          {/* Navigation */}
          <Header />
          {/* Navigation */}
          <BreadCrub siteMapPath={siteMapPath} />

          <p
            className="user-info"
            style={{ fontWeight: 600, marginTop: "3rem", marginBottom: 0 }}
          >
            User Information
          </p>
          <p className="user-info-desc">
            Hare you can edit public information about your self. the changes
            will be displayed for other user within five minutes.
          </p>
          <form onSubmit={onLogin}>
            <div className="profile-container">
              {/* Profile Pic */}
              {/* <div className="content-wrapper"> */}
              <div>
                {/* Main content */}
                <section className="content">
                  <div className="row justify-content-start Profile-Name">
                    <div className="form-row my-3">
                      <div className="form-group col-4">
                        <label htmlFor="inputEmail4">
                          First Name
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={
                            validationFormData.userFirstName
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          id="inputEmail4"
                          placeholder=""
                          name="userFirstName"
                          onChange={(e) =>
                            handleFormDataChange(e.target.name, e.target.value)
                          }
                          value={formData.userFirstName}
                        />
                        {validationFormData.userFirstName && (
                          <FormFeedback style={{ display: "block" }}>
                            Please enter first name
                          </FormFeedback>
                        )}
                      </div>
                      <div className="form-group col-4 mx-5">
                        <label htmlFor="inputPassword4">
                          Last Name
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={
                            validationFormData.userLastName
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          id="inputPassword4"
                          placeholder=""
                          name="userLastName"
                          onChange={(e) =>
                            handleFormDataChange(e.target.name, e.target.value)
                          }
                          value={formData.userLastName}
                        />
                        {validationFormData.userLastName && (
                          <FormFeedback style={{ display: "block" }}>
                            Please enter last name
                          </FormFeedback>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-row my-3">
                    <div className="form-group col-4">
                      <label htmlFor="inputEmail4">
                        Email
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className={
                          validationFormData.userEmail
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="inputEmail4"
                        placeholder=""
                        name="userEmail"
                        onChange={(e) =>
                          handleFormDataChange(e.target.name, e.target.value)
                        }
                        value={formData.userEmail}
                        disabled={isGoogleUser ? true : false}
                      />
                      {validationFormData.userEmail && (
                        <FormFeedback style={{ display: "block" }}>
                          Please enter a valid email address!
                        </FormFeedback>
                      )}
                    </div>
                    {!isGoogleUser && (
                      <div className="form-group col-4 mx-5">
                        <label htmlFor="inputPassword4">
                          Enter Number
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className={
                            validationFormData.userNumber ||
                            (!isValidPhoneNumber(formData.userNumber) &&
                              formData.userNumber !== "")
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          id="inputPassword4"
                          name="userNumber"
                          placeholder=""
                          onChange={(e) =>
                            handleFormDataChange(e.target.name, e.target.value)
                          }
                          value={formData.userNumber}
                        />

                        {(validationFormData.userNumber ||
                          (!isValidPhoneNumber(formData.userNumber) &&
                            formData.userNumber !== "")) && (
                          <FormFeedback style={{ display: "block" }}>
                            {validationFormData.userNumber
                              ? "Please enter number"
                              : !isValidPhoneNumber(formData.userNumber) &&
                                formData.userNumber !== ""
                              ? "Invalid number"
                              : ""}
                          </FormFeedback>
                        )}
                      </div>
                    )}
                  </div>
                  {!isGoogleUser && (
                    <div className="form-row my-4">
                      <div className="col-4">
                        <div className="row justify-content-start">
                          {/*  */}
                          <div className="form-group col">
                            <label htmlFor="inputEmail4">
                              Select Country
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            {countryDefaultValue && country && (
                              <Select
                                name="userState"
                                className="myDropDown"
                                options={country}
                                placeholder="... Select"
                                onChange={(e) =>
                                  handleFormDataChange("userState", e)
                                }
                                styles={
                                  validationFormData.userState &&
                                  customStylesError
                                }
                                defaultValue={countryDefaultValue}
                              />
                            )}

                            {validationFormData.userState && (
                              <FormFeedback style={{ display: "block" }}>
                                Please enter state
                              </FormFeedback>
                            )}
                          </div>
                          <div className="form-group col">
                            <label htmlFor="inputPassword4">
                              Select city
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className={
                                validationFormData.userCity
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              id="inputPassword4"
                              name="userCity"
                              placeholder=""
                              onChange={(e) =>
                                handleFormDataChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              value={formData.userCity}
                            />
                            {validationFormData.userCity && (
                              <FormFeedback style={{ display: "block" }}>
                                Please enter city
                              </FormFeedback>
                            )}
                          </div>
                          {/*  */}
                        </div>
                      </div>
                      <div className="form-group col-4 mx-5">
                        <label htmlFor="txt_pswrd">
                          Change Password
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="buttonInside">
                          <input
                            type="password"
                            className={
                              validationFormData.userPassword
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            id="inputPassword4"
                            placeholder=""
                            name="userPassword"
                            onChange={(e) =>
                              handleFormDataChange(
                                e.target.name,
                                e.target.value
                              )
                            }
                            value={formData.userPassword}
                            disabled={true}
                          />
                          <Link id="btn_change" to="/forgotpassword">
                            Change
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* /.row */}
                </section>
                {/* /.content */}
              </div>
              {/* Profile Pic */}
            </div>
            <button type="submit" className="btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
