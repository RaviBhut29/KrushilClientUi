import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import AuthLayout from "../AuthLayout/AuthLayout";
import logosmall from "../../Assets/Images/logo-small.svg";
import "./Register.scss";
import Select from "react-select";
import {
  customSearchStyles,
  customStylesError,
} from "../../../src/configs/conts";
import classNames from "classnames";
import Back from "../../Common/Back";
import "react-phone-number-input/style.css";
import PhoneInput, { formatPhoneNumberIntl } from "react-phone-number-input";
import { Country, State, City } from "country-state-city";
import SpinnerComponent from "../../Common/Fallback-spinner";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  CheckValidEmailValidation,
  ExistsUserByEmail,
  registerUser,
} from "../../FlysesApi/Login";
import { toastError, toastSuccess } from "../../FlysesApi/FlysesApi";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { setLoadingStatus } from "../../FlysesApi";

const Register = () => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState();
  const [country, setCountry] = useState();
  const [cityOptions, setCityOptions] = useState([]);
  const history = useNavigate();
  const [isEmailVerification, setIsEmailVerification] = useState(false);

  const [formData, setFormData] = useState({
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

  const handleFormDataChange = (eName, eValue) => {
    if (eName === "userState") {
      setFormData({ ...formData, [eName]: eValue.label });
    } else if (eName === "userNumber") {
      setFormData({ ...formData, [eName]: formatPhoneNumberIntl(eValue) });
    } else {
      setFormData({ ...formData, [eName]: eValue });
    }
    setValidationFormData({ ...validationFormData, [eName]: false });
  };

  useEffect(() => {
    const countryArray = Country?.getAllCountries()?.map(function (item) {
      return { value: item.isoCode, label: item.name };
    });
    setCountry(countryArray);
  }, []);

  const formValidation = () => {
    return new Promise((resolve) => {
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
      } else if (!isValidPhoneNumber(userNumber)) {
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
        userPassword === "" ||
        userPassword.length < 4 ||
        userPassword.length > 12
      ) {
        obj.userPassword = true;
        isValid = true;
      }

      if (isValid) {
        resolve(isValid);
      }

      ExistsUserByEmail(formData?.userEmail)
        .then((responce) => {
          if (responce) {
            toastError("Email already exists");
            isValid = true;
          }
          setValidationFormData(obj);
          resolve(isValid);
        })
        .catch(() => {
          toastError("Bad response from server");
          resolve(true);
        });
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();

    setLoadingStatus(true);

    const isFormValid = await formValidation();

    if (isFormValid) {
      setLoadingStatus(false);
      return true;
    }

    registerUser(formData)
      .then((responce) => {
        //
        //toastSuccess("User register successfully.");
        //history("/login");
        CheckValidEmailValidation({
          userEmail: formData?.userEmail,
          userFirstName: formData?.userFirstName,
          userLastName: formData?.userLastName,
          userId: responce,
        })
          .then(() => {
            setLoadingStatus(false);
            setIsEmailVerification(true);
          })
          .catch(() => {
            toastError("Bad response from server.");
          });
      })
      .catch(() => {
        toastError(
          "User could not be register due to a network issue. Please contact the administrator if the issue persists."
        );
      });
  };

  return (
    <>
      {loader && <SpinnerComponent />}
      {!isEmailVerification && (
        <AuthLayout>
          <div className="form-card-container">
            <div className="SignupForm">
              <div className="header d-flex justify-content-start">
                <Back />
                {/* <img src={logosmall} alt="logo" /> */}
                {/* Change on Date:20/08/2023. */}
                <img src="../ui/Images/NewLogo.svg" alt="logo" />
              </div>
              <div className="description">
                <h2>Hey, Welcome 👋</h2>
                <p>
                  Register to create your first account and start exploring our
                  services.
                </p>
              </div>
              <div className="form">
                <form className="auth-login-form mt-2" onSubmit={onLogin}>
                  <Row className="mb-1">
                    <Col>
                      <FormGroup className="fg-email">
                        <Label className="form-label">
                          {" "}
                          First Name <span style={{ color: "red" }}>
                            *
                          </span>{" "}
                        </Label>

                        <Input
                          id="userFirstName"
                          type="text"
                          name="userFirstName"
                          placeholder="john"
                          onChange={(e) => {
                            console.warn(e.target);
                            handleFormDataChange(e.target.name, e.target.value);
                          }}
                          invalid={validationFormData.userFirstName}
                        />

                        {validationFormData.userFirstName && (
                          <FormFeedback>Please enter firstName</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup className="fg-email">
                        <Label className="form-label">
                          {" "}
                          Last Name <span style={{ color: "red" }}>*</span>{" "}
                        </Label>

                        <Input
                          id="userLastName"
                          type="text"
                          name="userLastName"
                          placeholder="doe"
                          onChange={(e) =>
                            handleFormDataChange(e.target.name, e.target.value)
                          }
                          invalid={validationFormData.userLastName}
                        />

                        {validationFormData.userLastName && (
                          <FormFeedback>Please enter lastName</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col>
                      <FormGroup className="fg-email">
                        <Label className="form-label">
                          {" "}
                          Enter email <span style={{ color: "red" }}>
                            *
                          </span>{" "}
                        </Label>

                        <Input
                          id="email"
                          type="text"
                          name="userEmail"
                          placeholder="john@email.com"
                          onChange={(e) =>
                            handleFormDataChange(e.target.name, e.target.value)
                          }
                          invalid={validationFormData.userEmail}
                        />

                        {validationFormData.userEmail && (
                          <FormFeedback>
                            Please enter a valid email address!
                          </FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col className="mobile-input">
                      <FormGroup className="fg-email">
                        <Label className="form-label">
                          {" "}
                          Enter number <span style={{ color: "red" }}>
                            *
                          </span>{" "}
                        </Label>

                        <PhoneInput
                          country="US"
                          defaultCountry="US"
                          placeholder="Enter phone number"
                          name="userNumber"
                          value={value}
                          onChange={(e) =>
                            handleFormDataChange("userNumber", e)
                          }
                          invalid={validationFormData.userNumber}
                          className={
                            validationFormData.userNumber ||
                            (!isValidPhoneNumber(formData.userNumber) &&
                              formData.userNumber !== "")
                              ? "phoneNumberValidation"
                              : ""
                          }
                        />

                        {(validationFormData.userNumber ||
                          (!isValidPhoneNumber(formData.userNumber) &&
                            formData.userNumber !== "")) && (
                          <FormFeedback style={{ display: "block" }}>
                            {validationFormData.userNumber
                              ? "Please enter phone number"
                              : !isValidPhoneNumber(formData.userNumber) &&
                                formData.userNumber !== ""
                              ? "Invalid phone number"
                              : ""}
                          </FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col>
                      <FormGroup className="fg-email">
                        <Label className="form-label">
                          {" "}
                          Select Country <span style={{ color: "red" }}>
                            *
                          </span>{" "}
                        </Label>

                        {country && (
                          <Select
                            name="userState"
                            className="myDropDown"
                            options={country}
                            placeholder="... Select"
                            onChange={(e) =>
                              handleFormDataChange("userState", e)
                            }
                            styles={
                              validationFormData.userState && customStylesError
                            }
                          />
                        )}

                        {validationFormData.userState && (
                          <FormFeedback style={{ display: "block" }}>
                            Please select country
                          </FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup className="fg-email">
                        <Label className="form-label">
                          {" "}
                          Select city <span style={{ color: "red" }}>
                            *
                          </span>{" "}
                        </Label>

                        <Input
                          id="userCity"
                          name="userCity"
                          type="text"
                          placeholder="city"
                          onChange={(e) =>
                            handleFormDataChange(e.target.name, e.target.value)
                          }
                          invalid={validationFormData.userCity}
                        />

                        {validationFormData.userCity && (
                          <FormFeedback>Please enter city</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col>
                      <FormGroup>
                        <Label for="examplePassword">
                          Enter password <span style={{ color: "red" }}>*</span>
                        </Label>
                        <div className="position-relative d-flex">
                          <div className="w-100">
                            <Input
                              id="userPassword"
                              type={showPassword ? "text" : "password"}
                              placeholder="****"
                              name="userPassword"
                              onChange={(e) =>
                                handleFormDataChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              invalid={validationFormData.userPassword}
                              maxLength={12}
                            />
                            {validationFormData.userPassword && (
                              <FormFeedback>
                                {formData.userPassword === ""
                                  ? "Please enter password"
                                  : formData.userPassword.length < 4
                                  ? "Password length should be at least 4 characters"
                                  : ""}
                              </FormFeedback>
                            )}
                          </div>
                          <span
                            style={{ marginTop: "0.5rem" }}
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                            className={classNames("viewPassword", {
                              "mx-4": validationFormData.userPassword,
                            })}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </span>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="mb-1">
                    <Col>
                      <FormGroup>
                        <Button
                          color="primary"
                          className="w-100 btn signup-btn"
                          type="submit"
                          style={{
                            backgroundColor: "#0c0d48",
                            borderColor: "#0c0d48",
                          }}
                        >
                          {" "}
                          Signup{" "}
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </div>
        </AuthLayout>
      )}

      {isEmailVerification && (
        <AuthLayout>
          <div className="forgot-pass" key={Math.random(6)}>
            <div className="header d-flex align-items-center">
              <img src={logosmall} alt="logo" />
            </div>
            <div className="description">
              <h2>Email Verification</h2>
              <p style={{ fontSize: "14px" }}>
                An email with a verification link has been sent to your email
                address. Please check your inbox and click the link to verify your email.
              </p>
            </div>
          </div>
        </AuthLayout>
      )}
    </>
  );
};

export default Register;
