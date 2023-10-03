import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../../FlysesApi/Category";
import {
  REACT_APP,
  decryptWithRk,
  encrptWithRk,
  setLoadingStatus,
} from "../../FlysesApi";
import { toastError, toastWarning } from "../../FlysesApi/FlysesApi";

const ProductRecommendedForYou = ({ serviceId }) => {
  const history = useNavigate();
  const [serviceName, setServiceName] = useState("");

  const siteMapPath = [
    {
      name: "Home",
      clickable: true,
      isHome: true,
      path: "/home",
    },
    {
      name: "Services",
      clickable: true,
      isHome: false,
      path: "/services",
    },
    {
      name: serviceName,
      clickable: false,
      isHome: false,
      path: "",
    },
  ];

  const [categoriesList, setCategoriesList] = useState([]);

  let path = window.location.pathname;
  let splitdata = path.split("/");

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoadingStatus(true);
    // setTimeout(() => {

    if (serviceId !== "") {
      getAllCategories();
    }

    // }, 1000);
  }, [serviceId]);

  const getAllCategories = async () => {
    try {
      const Id = await decryptWithRk(serviceId);
      getCategory(Id)
        .then((response) => {
          if (response.length > 0) {
            setServiceName(response[0]?.ctServiceName);
            setCategoriesList(response);
          } else {
            setCategoriesList([]);
            toastWarning("Category not found.");
            history(`/services`);
          }
          setLoadingStatus(false);
        })
        .catch(() => {
          toastError("Bad response from server");
        });
    } catch {
      toastError("Bad response from server");
    }
  };

  const replaceDescription = (htmlString) => {
    return (
      <div
        className="cardDescText"
        dangerouslySetInnerHTML={{ __html: htmlString }}
      ></div>
    );
  };

  const getCategoryIcon = (id) => {
    console.warn(id);
    return (
      <img src={`${REACT_APP}category/getCategoryFile/${id}`} alt="star" />
    );
  };

  const handleCategoryClick = async (id, name) => {
    const key = await encrptWithRk(id);
    history(`/Category/${splitdata[2]}/${name.replace(/ /g, "")}/${key}`);
  };
  
  return (
    <>
      <h5 className="title3 my-5">Recommended for you</h5>
      <div
        style={{
          backgroundImage: "url(/ui/Images/background-square.png",
        }}
        className="text-center justify-content-center"
      >
        <div
          className="row lead text-lg-start"
          style={{ background: "#ffffff" }}
        >
          {categoriesList &&
            categoriesList.map((item, index) => {
              if (index < 3) {
                return (
                  <div
                    className="col-3 d-flex justify-content-center"
                    style={{ cursor: "pointer" }}
                    onClick={()=>handleCategoryClick(item.ctId,item.ctName)}
                  >
                    <div className="card">
                      <div className="card-body">
                        {getCategoryIcon(item.ctImageId)}
                        <h5 className="card-title mt-3 px-3 Recommended_Card">
                          {item?.ctName}
                        </h5>
                        <p className="card-text mx-3 card-amount">
                          <span className="amount">${item?.ctPrice}</span>
                          <span className="mx-2">from Starting</span>
                        </p>
                        {replaceDescription(item?.ctTitle)}
                        {Number(item?.ctDiscount) !== 0 && (
                          <p className="card-text discount mx-3 my-3">
                            <span>Save up to {item?.ctDiscount}%</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

export default ProductRecommendedForYou;
