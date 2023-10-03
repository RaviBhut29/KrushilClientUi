import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { Modal, Pagination } from "antd";
import { Image } from "antd";
import ImagePreview from "./ImagePreview";
import {
  getServiceWisePortfolios,
  getbyIdPortfolio,
} from "../../FlysesApi/PortFolio";
import ImageSlider from "./ImageSlider";
import PortfolioSlider from "./PortfolioSlider";

const Portfolio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const divRef = useRef(null);

  const getScrollPosition = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setLoadingStatus(true);
    getAllPortFolios();
  }, [serviceId, current]);

  const getAllPortFolios = () => {
    getServiceWisePortfolios(serviceId, current)
      .then((response) => {
        if (response.length > 0) {
          setCategoryList(response);
          setTotalRecord(response[0].totalRecord);
        } else {
          setCategoryList([]);
          setTotalRecord(0);
        }

        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  useMemo(() => {
    if(current!==1)
    {
      getScrollPosition();
    }
  }, [categoryList]);

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
    if (centredModal === true) {
      setIsPdfFile("");
    }
    setCentredModal(!centredModal);
  };

  const [categoryImages, setCategoryImages] = useState([]);
  const [isPdfFile, setIsPdfFile] = useState("");

  const handleProtfolioClick = (id) => {
    getbyIdPortfolio(id)
      .then((response) => {
        if (response?.pfPdfName !== "" && response?.pfPdfName !== null) {
          setIsPdfFile(`${REACT_APP}portfolio/getPDFView/${response?.pfId}`);
        }
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

  const [hideCloseButton, setHideCloseButton] = useState(true);

  useMemo(() => {
    if (centredModal) {
      setHideCloseButton(false);
      setTimeout(() => {
        setHideCloseButton(true);
      }, 1000);
    }
  }, [centredModal]);

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

          <div ref={divRef}></div>
          <ProtfolioFilterSection
            serviceId={serviceId}
            setServiceId={setServiceId}
          />
          
          {/* All Works Menu */}
          {/* <div className="container my-5 text-center justify-content-center"> */}
          <div
            className="container text-center justify-content-center"
            style={{ marginTop: "60px", marginBottom: "60px" }}
          >
            <div
              className="row containerT"
              style={{ marginBottom: "0 !important" }}
            >
              {categoryList &&
                categoryList.map((item) => {
                  return (
                    // <div className="col d-flex justify-content-center"onClick={() => handleProtfolioClick(item.pfId)}>
                    <div
                      className="col"
                      onClick={() => handleProtfolioClick(item.pfId)}
                    >
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
                total={totalRecord}
                defaultPageSize={12}
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

      {centredModal && (
        <Modal
          title=""
          open={centredModal}
          footer={[]}
          onCancel={() => setCentredModal(false)}
          width={1500}
          style={{
            top: 5,
          }}
          closeIcon={hideCloseButton}
        >
          {isPdfFile === "" && categoryImages.length > 0 && (
            <PortfolioSlider slides={categoryImages} />
          )}

          {isPdfFile !== "" && (
            <iframe
              src={isPdfFile}
              frameborder="0"
              allowfullscreen
              height={600}
            ></iframe>
          )}
        </Modal>
      )}

      {/* <Modal
        isOpen={centredModal}
        toggle={toggleModal}
        className="modal-dialog-centered image-preview-modals"
      >
        <ImageSlider /> */}
      {/* {isPdfFile === "" && <ImagePreview data={categoryImages} />} */}
      {/* {isPdfFile === "" && <ImageSlider data={categoryImages} />}
        {isPdfFile !== "" && (
          <iframe
            src={isPdfFile}
            frameborder="0" allowfullscreen
            height={600}
          ></iframe>
        )} */}
      {/* </Modal> */}
      {/* <Image.PreviewGroup preview={{onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),}}>

      </Image.PreviewGroup> */}
    </>
  );
};

export default Portfolio;
