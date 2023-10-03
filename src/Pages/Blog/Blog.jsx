import React, { useEffect, useState } from "react";
import BreadCrub from "../../Layout/BreadCrub";
import ContectUs from "../../Layout/ContactUs";
import CommanFaq from "../../Layout/CommanFaq";
import Footer from "../../Layout/Footer";
import Header from "../../Layout/Header";
import "./Blog.css";
import { Link, useNavigate } from "react-router-dom";
import { getAllBlogTags, getBlogDetails } from "../../FlysesApi/PortFolio";
import { toastError } from "../../FlysesApi/FlysesApi";
import { setLoadingStatus } from "../../FlysesApi";

const Blog = () => {
  const history = useNavigate();

  const siteMapPath = [
    {
      name: "Home",
      clickable: true,
      isHome: true,
      path: "/home",
    },
    {
      name: "Blog",
      clickable: false,
      isHome: false,
      path: "/",
    },
  ];

  useEffect(() => {
    let path = window.location.pathname;
    let splitdata = path.split("/");
    handleGetAllBlogTags(splitdata[splitdata.length - 1]);
    handleGetBlogDetails(splitdata[splitdata.length - 1]);
  }, []);

  const [blogTagList, setBlogTagList] = useState([]);
  const [blogDetailsList, setBlogDetailsList] = useState([]);

  const handleGetAllBlogTags = (name) => {
    setLoadingStatus(true);
    getAllBlogTags(name)
      .then((response) => {
        if (response?.length > 0) {
          setBlogTagList(response);
        } else {
          setBlogTagList([]);
        }
      })
      .catch(() => {
        toastError("Bad response from server");
      })
      .finally(() => setLoadingStatus(false));
  };

  const handleGetBlogDetails = (name) => {
    setLoadingStatus(true);
    getBlogDetails(name)
      .then((response) => {
        if (response?.length > 0) {
          setBlogDetailsList(response);
        } else {
          setBlogDetailsList([]);
        }
      })
      .catch(() => {
        toastError("Bad response from server");
      })
      .finally(() => setLoadingStatus(false));
  };

  return (
    <div className="home">
      <div className="container portfolio">
        <Header />
        <BreadCrub siteMapPath={siteMapPath} />

        {blogDetailsList.length > 0 &&
          blogDetailsList.map((item) => {
            return (
              <>
                <p className="h1">{item?.bdTitle}</p>
                <p className="discription">{item?.bdDescription}</p>
              </>
            );
          })}

        <p className="TitleDiscription">
          Need Inspiration? see example brands in your industry..
        </p>

        <div
          className="container text-center justify-content-center"
          style={{ marginTop: "30px", marginBottom: "60px" }}
        >
          <div className="row containerT">
            {blogTagList.length > 0 &&
              blogTagList.map((item, index) => {
                return (
                  <div
                    className="col"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      history(`/${item?.bgTag}`);
                      handleGetAllBlogTags(item?.bgTag);
                      handleGetBlogDetails(item?.bgTag);
                    }}
                  >
                    <div className="card tagdiv">
                      <div className="card-body">
                        <h5 className="card-title tagtext">{item?.bgTag}</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
