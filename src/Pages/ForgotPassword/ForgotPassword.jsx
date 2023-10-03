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
import { checkValidKey, updatePasswordKey } from "../../FlysesApi/Login";
import { setLoadingStatus } from "../../FlysesApi";
import ResetPassword from "../ResetPassword/ResetPassword";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isResetPassModal, setIsResetPassModal] = useState("0");

  useEffect(() => {
    const key = searchParams.get("key");
    if (key !== null && key !== undefined && key !== "") {
      checkValidKey(key)
        .then((response) => {
          if (response !== "") {
            setIsResetPassModal(response?.userId);
          } else {
            setIsResetPassModal("0");
          }
        })
        .catch(() => {
          toastError("Bad response from server.");
          setIsResetPassModal("0");
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
    setLoadingStatus(true);
    const obj = {
      userEmail: data?.email,
      userChangePassKey: "",
    };

    updatePasswordKey(obj)
      .then((response) => {
        if (response === "") {
          toastWarning("Invalid Email Address.");
        } else {
          toastSuccess(
            "Email has been sent successfully, please check your mail box."
          );
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError(
          "User could not be sent mail due to a network issue. Please contact the administrator if the issue persists."
        );
      });
  };

  return isResetPassModal === "0" ? (
    <AuthLayout>
      <div className="forgot-pass" key={Math.random(6)}>
        <div className="header d-flex align-items-center">
          <Back onClick={() => navigate("/Login")} />
          <img src={logosmall} alt="logo" />
        </div>
        <div className="description">
          <h2>Forgot Password? 🔐</h2>
          <p>No Worries, we'll send you reset instructions.</p>
        </div>
        <div className="form">
          <Form
            className="auth-login-form mt-2"
            onSubmit={handleSubmit(onLogin)}
          >
            <FormGroup className="fg-email">
              <Label className="form-label">
                {" "}
                Email <span style={{ color: "red" }}>*</span>{" "}
              </Label>
              <Controller
                name="email"
                control={control}
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => {
                  return (
                    <Input
                      id="email"
                      type="text"
                      placeholder="john@email.com"
                      {...register("email", {
                        required: "Please enter a valid email address!",
                        validate: {
                          matchPattern: (v) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              v
                            ) || "Please enter a valid email address!",
                        },
                      })}
                      invalid={errors?.email && true}
                      {...field}
                    />
                  );
                }}
              />
              {errors && errors?.email && (
                <FormFeedback>Please enter a valid email address!</FormFeedback>
              )}
            </FormGroup>
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
                Confirm
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </AuthLayout>
  ) : (
    <ResetPassword userId={isResetPassModal} />
  );
};

export default ForgotPassword;
