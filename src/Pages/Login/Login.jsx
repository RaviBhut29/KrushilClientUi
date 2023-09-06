import React, { useEffect, useState } from "react";
import "./Login.scss";
// import logosmall from "../../Assets/Images/logo-small.svg";
// import logosmall from "../../public/ui/Images/logo.svg";
import AuthLayout from "../AuthLayout/AuthLayout";
import {
  Label,
  Input,
  FormGroup,
  Button,
  FormFeedback,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import SpinnerComponent from "../../Common/Fallback-spinner";
import FormGoogleLoginButton from "./FormGoogleLoginButton";
import CryptoJS from "crypto-js";
import { loginUser } from "../../FlysesApi/Login";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../FlysesApi/FlysesApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const secretPass = "Xkhfd5g4dfg54dfg564sa3216sd4df564sdf4t2W";

  const encryptData = (email, pass) => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(pass),
      secretPass
    ).toString();

    sessionStorage.setItem("FlysesUserPass", data);
    sessionStorage.setItem("FlysesUserEmail", email);
  };

  const decryptData = (text) => {
    if (text !== null && text !== "" && text !== undefined) {
      const bytes = CryptoJS.AES.decrypt(text, secretPass);
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return data;
    }
    return null;
  };

  useEffect(() => {
    bindCredentials();
  }, []);

  const bindCredentials = () => {
    const Pass = sessionStorage.getItem("FlysesUserPass");
    const Email = sessionStorage.getItem("FlysesUserEmail");
    if (Pass !== undefined && Pass !== null) {
      const userPass = decryptData(Pass);
      reset({ email: Email, password: userPass });
      if (userPass !== null) {
        setRememberMe(true);
      }
    }
  };

  const onLogin = (data) => {

    loginUser(data?.email, data?.password, "User")
      .then((response) => {
        if (response === "") {
          toastWarning("You have entered an invalid username or password.");
        } else {
          //toastSuccess("Login successfully.");
          if (rememberMe) {
            encryptData(data?.email, data?.password);
          } else {
            sessionStorage.setItem("FlysesUserPass", "");
            sessionStorage.setItem("FlysesUserEmail", "");
          }
          const sortName = response?.userFirstName?.charAt(0) + response?.userLastName?.charAt(0);
          sessionStorage.setItem("userSortName", sortName); 
          sessionStorage.setItem("userId", response?.userId);
          sessionStorage.setItem("isGoogleUser", false);
          navigate("/");
        }
      })
      .catch(() => {
        toastError(
          "User could not be login due to a network issue. Please contact the administrator if the issue persists."
        );
      });
  };

  return (
    <>
      {loader && <SpinnerComponent />}
      <AuthLayout>
        <div className="LoginForm">
          <div className="header">
            <img src="../ui/Images/NewLogo.svg" alt="logo" />
          </div>
          <div className="description">
            <h2>Hey, Welcome Back 👋</h2>
            <p>
              Login to your account - Enjoy exclusive features.. Not a member
              yet?{" "}
              <span
                style={{ textDecoration: "none" }}
                onClick={() => navigate("/register")}
              >
                SignUp
              </span>
            </p>
          </div>
          <div className="form">
            <form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onLogin)}
            >
               <FormGroup>
                <Label for="examplePassword">
                  Email <span style={{ color: "red" }}>*</span>
                </Label>
                <div className="position-relative d-flex">
                  <div className="w-100">
                    <input
                      {...register("email")}
                      className={
                        "form-control " + (errors?.email && "is-invalid")
                      }
                      placeholder="example@gmail.com"
                    />
                    <FormFeedback style={{ display: "block" }}>
                      {errors?.email?.message}
                    </FormFeedback>
                  </div>
                </div>
                </FormGroup>
              <FormGroup>
                <Label for="examplePassword">
                  Password <span style={{ color: "red" }}>*</span>
                </Label>
                <div className="position-relative d-flex">
                  <div className="w-100">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="****"
                      {...register("password")}
                      className={
                        "form-control " + (errors?.password && "is-invalid")
                      }
                    />
                    <FormFeedback>{errors?.password?.message}</FormFeedback>
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
              <FormGroup
                check
                className="d-flex justify-content-between align-items-center"
              >
                <Label check className="bolder" style={{ cursor: "pointer" }}>
                  {" "}
                  <Input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e?.target?.checked)}
                    style={{ cursor: "pointer" }}
                  />{" "}
                  Remember Me{" "}
                </Label>
                <Link
                  to="/forgotpassword"
                  className="link"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  Forgot Password?{" "}
                </Link>
              </FormGroup>
              <FormGroup>
                <Button
                  color="primary"
                  className="w-100 btn login-btn"
                  type="submit"
                  style={{ backgroundColor: "#0c0d48", borderColor: "#0c0d48" }}
                >
                  {" "}
                  Login{" "}
                </Button>
              </FormGroup>
            </form>
          </div>
          <div className="orOption"> ----- OR ----- </div>
          <div className="otherLoginOptions">
            <FormGoogleLoginButton />
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
