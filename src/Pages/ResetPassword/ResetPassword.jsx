import React, { useState } from "react";
import "./ResetPassword.scss";
import logosmall from "../../Assets/Images/logo-small.svg";
import AuthLayout from "../AuthLayout/AuthLayout";
import {
  Form,
  Label,
  Input,
  FormGroup,
  Button,
  FormFeedback,
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import Back from "../../Common/Back";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import classNames from "classnames";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../FlysesApi/FlysesApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  checkValidKey,
  updatePassword,
  updatePasswordKey,
} from "../../FlysesApi/Login";
import { useEffect } from "react";

const ResetPassword = ({ userId }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showconfPassword, setshowconfPassword] = useState(false);

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(10, "Password cannot exceed more than 10 characters"),
    cpassword: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(10, "Password cannot exceed more than 10 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });

  const {
    control,
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const onLogin = (data) => {
    const obj = { userId: userId, userPassword: data?.password };

    updatePassword(obj)
      .then(() => {
        toastSuccess("Reset password successfully.");
        navigate("/Login");
      })
      .catch(() => {
        toastError(
          "User could not be change password due to a network issue. Please contact the administrator if the issue persists."
        );
      });
  };

  return (
    <AuthLayout>
      <div className="ResetForm">
        <div className="header d-flex align-items-center">
          <Back onClick={() => navigate("/Login")} />
          <img src={logosmall} alt="logo" />
        </div>
        <div className="description">
          <h2>Reset Password ↺</h2>
          <p>
            Your new password must be different to previously used passwords.
          </p>
        </div>
        <div className="form">
          <form
            className="auth-login-form mt-2"
            onSubmit={handleSubmit(onLogin)}
          >
            <FormGroup>
              <Label>
                Password <span style={{ color: "red" }}>*</span>
              </Label>
              <div className="position-relative d-flex">
                <div className="w-100">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="****"
                    {...register("password")}
                    className={
                      "form-control " + (errors?.password && "is-invalid")
                    }
                  />
                  <FormFeedback style={{ display: "block" }}>
                    {errors?.password?.message}
                  </FormFeedback>
                </div>
                <span
                  className={classNames("viewPassword", {
                    "mx-4": errors?.password,
                  })}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </FormGroup>
            <FormGroup>
              <Label>
                Confirm Password <span style={{ color: "red" }}>*</span>
              </Label>
              <div className="position-relative d-flex">
                <div className="w-100">
                <input
                    type={showconfPassword ? "text" : "password"}
                    placeholder="****"
                    {...register("cpassword")}
                    className={
                      "form-control " + (errors?.cpassword && "is-invalid")
                    }
                  />

                  <FormFeedback style={{ display: "block" }}>
                    {errors?.cpassword?.message}
                  </FormFeedback>
                </div>
                <span
                  className={classNames("viewPassword", {
                    "mx-4": errors?.cpassword,
                  })}
                  onClick={() => {
                    setshowconfPassword(!showconfPassword);
                  }}
                >
                  {showconfPassword ? "Hide" : "Show"}
                </span>
              </div>
            </FormGroup>
            <FormGroup>
              <Button
                color="primary"
                className="w-100 btn login-btn"
                type="submit"
                style={{
                  backgroundColor: "#0c0d48",
                  borderColor: "#0c0d48",
                  marginTop: "5px",
                }}
              >
                {" "}
                Reset Password{" "}
              </Button>
            </FormGroup>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
