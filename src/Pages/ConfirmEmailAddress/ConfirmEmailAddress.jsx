import React, { useEffect, useState } from "react";
import {
  Form,
  Label,
  Input,
  FormGroup,
  Button,
  FormFeedback,
} from "reactstrap";
import AuthLayout from "../AuthLayout/AuthLayout";
import "./forgotPassword.scss";
import logosmall from "../../Assets/Images/logo-small.svg";
import { Controller, useForm } from "react-hook-form";
import Back from "../../Common/Back";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../FlysesApi/FlysesApi";
import {
  UpdateUserStatusByEmail,
  checkValidKey,
  updatePasswordKey,
} from "../../FlysesApi/Login";
import { setLoadingStatus } from "../../FlysesApi";
import ResetPassword from "../ResetPassword/ResetPassword";
import checkPng from "./check.png";

const ConfirmEmailAddress = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayConfirm, setDisplayConfirm] = useState(false);

  useEffect(() => {
    const key = searchParams.get("key");
    const userId = searchParams.get("userId");
    
    if (key !== null && key !== undefined && key !== "") {
      UpdateUserStatusByEmail({ userEmail: key,userId:userId })
        .then((response) => {
            setDisplayConfirm(response);
            if(!response)
            {
                toastError("Invalid Email Address!!");
            }
        })
        .catch(() => {
          toastError("Bad response from server.");
        });
    }
  }, []);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});

  const onLogin = (data) => {
    navigate("/Login");
  };

  return (
    <>
      {displayConfirm && (
        <AuthLayout>
          <div className="forgot-pass" key={Math.random(6)}>
            <div className="header d-flex align-items-center">
              <img src={logosmall} alt="logo" />
            </div>
            <div className="description">
              <h2>
                Email Verification Success!
                <img src={checkPng} className="checkIcon" />
              </h2>
              <p style={{ fontSize: "14px", margin: "0px" }}>
                Your email address has been successfully verified.
              </p>
              <p style={{ fontSize: "14px", margin: "0px" }}>
                You can now access your account and enjoy our services.
              </p>
              <p style={{ fontSize: "14px" }}>Thank you for choosing us!</p>
            </div>
            <div className="form">
              <Form
                className="auth-login-form mt-2"
                onSubmit={handleSubmit(onLogin)}
              >
                <FormGroup>
                  <Button
                    color="primary"
                    className="w-100 btn login-btn"
                    style={{
                      backgroundColor: "#0c0d48",
                      borderColor: "#0c0d48",
                      marginTop: "0px",
                    }}
                    type="submit"
                  >
                    Login
                  </Button>
                </FormGroup>
              </Form>
            </div>
          </div>
        </AuthLayout>
      )}
    </>
  );
};

export default ConfirmEmailAddress;
