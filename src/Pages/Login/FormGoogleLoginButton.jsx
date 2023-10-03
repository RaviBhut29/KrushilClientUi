// import React from "react";
// import { GoogleLogin, GoogleLogout } from "react-google-login";
// import { createUser } from "../../FlysesApi/Login";
// import { toastError, toastSuccess } from "../../FlysesApi/FlysesApi";
// import { useEffect } from "react";
// import { gapi } from "gapi-script";
// import { googleLogout } from "@react-oauth/google";

import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { createUser } from "../../FlysesApi/Login";
import { toastError, toastSuccess } from "../../FlysesApi/FlysesApi";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const FormGoogleLoginButton = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (
      user?.access_token !== null &&
      String(user?.access_token) !== "" &&
      user?.access_token !== undefined
    ) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          
          const sortName = Array.from(res?.data?.given_name)[0] + Array.from(res?.data?.family_name)[0];

          setProfile(res.data);
          const userObj = {
            userFirstName: res.data.given_name,
            userLastName: res.data.family_name,
            userEmail: res.data.email,
            userNumber: null,
            userState: null,
            userCity: null,
            userPassword: null,
            userProfile: null,
            userIsGoogleLogin: 1,
          };

          createUser(userObj)
            .then((response) => {
              debugger;
              if(Number(response?.userStatus) === 1)
              {
                sessionStorage.setItem("userSortName", sortName); 
                sessionStorage.setItem("authenticationToken", response.token);
                sessionStorage.setItem("isGoogleUser", true);
                sessionStorage.setItem("userId", response.userId);
                navigate("/");
              }
              else{
                toastError("Admin has disabled this user.");  
              }
            })
            .catch(() => {
              toastError("Bad response from server.");
            });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <button
      type="button"
      onClick={() => login()}
      className="btn btn-primary googleLoginBtn"
    >
      <div
        style={{
          padding: "4px",
          paddingLeft: "16px",
        }}
      >
        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
          <g fill="#00002A" fillRule="evenodd">
            <path
              d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
              fill="#EA4335"
            ></path>
            <path
              d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
              fill="#4285F4"
            ></path>
            <path
              d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
              fill="#FBBC05"
            ></path>
            <path
              d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
              fill="#34A853"
            ></path>
            <path fill="none" d="M0 0h18v18H0z"></path>
          </g>
        </svg>
      </div>
      <span
        style={{
          padding: "10px 10px 10px 0px",
          fontWeight: "500",
          marginRight: "6px",
          marginLeft: "5px",
        }}
      >
        Continue with Google
      </span>
    </button>
  );
};

export default FormGoogleLoginButton;
