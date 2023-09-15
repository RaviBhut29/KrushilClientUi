import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import CommanFaq from "../../Layout/CommanFaq";
import ProjectDetails from "../../Layout/ProjectDetails";
import ContectUs from "../../Layout/ContactUs";
import BreadCrub from "../../Layout/BreadCrub";
import ProtfolioFilterSection from "./ProtfolioFilterSection";
import {
  getCategoryImages,
  getService,
  getServiceWiseCategories,
} from "../../FlysesApi/Services";
import { REACT_APP, setLoadingStatus } from "../../FlysesApi";
import { toastError } from "../../FlysesApi/FlysesApi";
import "./Protfolio.scss";
import { Pagination } from "antd";
import { Image } from 'antd';
import { Modal } from "reactstrap";
import ImagePreview from "./ImagePreview";
import { getServiceWisePortfolios, getbyIdPortfolio } from "../../FlysesApi/PortFolio";

const Portfolio = () => {

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  const siteMapPath = [
    {
      name: "Home",
      clickable: true,
      isHome: true,
      path: "/home",
    },
    {
      name: "Portfolio",
      clickable: false,
      isHome: false,
      path: "/portfolio",
    },
  ];

  const [serviceId, setServiceId] = useState(0);
  const [current, setCurrent] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [centredModal, setCentredModal] = useState(false);

  useEffect(() => {
    setLoadingStatus(true);
    getAllPortFolios();
  }, [serviceId, current]);

  const getAllPortFolios = () => {
    getServiceWisePortfolios(serviceId,current)
      .then((response) => {
        if (response.length > 0) {
          setCategoryList(response);
          setTotalRecord(response[0].totalRecord);
        } else {
          setCategoryList([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  const replaceDescription = (htmlString) => {
    return (
      <p
        className="card-text"
        //className="card-text-protfolio"
        dangerouslySetInnerHTML={{ __html: htmlString }}
      ></p>
    );
  };

  const getCategoryIcon = (id) => {
    return (
      <img src={`${REACT_APP}portfolio/getPortfolioFile/${id}`} alt="star" />
    );
  };

  const handlePaginationChange = (page) => {
    setCurrent(page);
  };

  const toggleModal = () => {
    setCentredModal(!centredModal);
  };

  const [categoryImages, setCategoryImages] = useState([]);

  const handleProtfolioClick = (id) => {
    getbyIdPortfolio(id)
      .then((response) => {
        if (response?.protfolioCategoryImageList?.length > 0) {
          setCategoryImages(response?.protfolioCategoryImageList);
        } else {
          setCategoryImages([]);
        }
        setLoadingStatus(false);
        setCentredModal(true);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  return (
    <>
      <div className="home">
        <div className="container portfolio">
          {/* Navigation */}
          <Header />
          {/* Navigation */}
          <BreadCrub siteMapPath={siteMapPath} />
          {/* Breadcrumbs */}

          <p className="h1">Here Some of our finest-work.</p>
          <p className="discription">
            A quick view of industry specific problems solved with design by the
            awesome team at Abstrak.
          </p>

          <ProtfolioFilterSection
            serviceId={serviceId}
            setServiceId={setServiceId}
          />

          {/* All Works Menu */}
          {/* <div className="container my-5 text-center justify-content-center"> */}
          <div className="container text-center justify-content-center" style={{marginTop:"60px", marginBottom:"60px"}}>
            <div className="row containerT" style={{ marginBottom: "0 !important" }}>
              {categoryList &&
                categoryList.map((item) => {
                  return (
                    // <div className="col d-flex justify-content-center"onClick={() => handleProtfolioClick(item.pfId)}>
                    <div className="col"onClick={() => handleProtfolioClick(item.pfId)}>
                      <div
                        className="card"
                        style={{ width: "18rem", cursor: "pointer" }}
                      >
                        {getCategoryIcon(item.ctId)}
                        <div className="card-body">
                          <h5 className="card-title">{item.pfName}</h5>
                          {replaceDescription(item?.pfDescription)}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {totalRecord !== 0 && totalRecord > 12 && (
            <center>
              <Pagination
                onChange={handlePaginationChange}
                current={current}
                total={totalRecord !== 0 ? totalRecord : null}
                pageSizeOptions={[12]}
              />
            </center>
          )}
          {/* All Works Menu */}
          {/* Pagination For Big Screen */}
        </div>

        {/* <ProjectDetails /> */}
        <ContectUs />

        <CommanFaq />

        <Footer />
      </div>
      <Modal
        isOpen={centredModal}
        toggle={toggleModal}
        className="modal-dialog-centered image-preview-modals"
      >
        <ImagePreview data={categoryImages} />
      </Modal>
      {/* <Image.PreviewGroup preview={{onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),}}>

      </Image.PreviewGroup> */}
    </>
  );
};

export default Portfolio;
