import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoutesArray from "./app";
import Login from "../Pages/Login/Login";
import NotFound from "../BlankPage/NotFound";
import { Layout } from "../Layout/Layout";
import { ToastContainer } from "react-toastify";
import Loader from "../Common/Loader.jsx";
import { isLoadingStatus } from "../FlysesApi";
import { useAtom } from "@dbeining/react-atom";

const RouterComp = () => {
  const { isLoading } = useAtom(isLoadingStatus);

  return (
    <>
      <Loader isLoading={isLoading} />

      <Routes>
        {RoutesArray?.map((res, i) => {
          return (
            <Route
              key={"route" + i}
              path={res?.path}
              element={
                <Layout
                  Component={res?.component}
                  footer={res?.footer}
                  type={res?.type}
                  path={res?.path}
                />
              }
              exact={res?.exact}
            />
          );
        })}
        <Route path="/Login" element={<Login />} exact={true} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer/>
    </>
  );
};

export default RouterComp;
