import React, { useMemo, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getService } from "../../FlysesApi/Services";
import { useEffect } from "react";
import { setLoadingStatus } from "../../FlysesApi";
import { toastError } from "../../FlysesApi/FlysesApi";
import "./styles.css";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";

const ProtfolioFilterSection = ({ serviceId, setServiceId }) => {
  const [servicesNameList, setServicesNameList] = useState([]);
  const outerDivRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(true);
  const [isScrollableLeft, setIsScrollableLeft] = useState(false);

  useEffect(() => {
    setLoadingStatus(true);
    getAllServices();
  }, []);

  const getAllServices = () => {
    getService("null")
      .then((response) => {
        if (response.length > 0) {
          let dataArray = [];
          dataArray.push({
            srId: 0,
            srName: "All Works",
          });
          response.map((item) =>
            dataArray.push({
              srId: item.srId,
              srName: item.srName,
            })
          );
          setServicesNameList(dataArray);
        } else {
          setServicesNameList([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  useMemo(() => {
    const outerDiv = outerDivRef.current;

    if (servicesNameList.length > 0) {
      console.warn("test");
      console.warn(outerDiv?.scrollWidth);
      console.warn(outerDiv?.clientWidth);
      console.warn(outerDiv?.scrollWidth > outerDiv?.clientWidth);
      //setIsScrollable(outerDiv?.scrollWidth > outerDiv?.clientWidth);
    }
  }, [servicesNameList]);

  const handleScrollRight = () => {
    // You can adjust the scroll distance (100) and scroll speed (10) as needed
    outerDivRef.current.scrollBy({ left: 100, behavior: "smooth" });
    setIsScrollableLeft(true);
    const outerDiv = outerDivRef.current;
    if (
      outerDiv?.scrollWidth ===
      outerDiv?.scrollLeft + outerDiv?.clientWidth
    ) {
      setIsScrollable(false);
    }
  };

  const handleScrollLeft = () => {
    // You can adjust the scroll distance (100) and scroll speed (10) as needed
    outerDivRef.current.scrollBy({ left: -100, behavior: "smooth" });
    setIsScrollable(true);
    const outerDiv = outerDivRef.current;
    if (outerDiv?.scrollLeft === 0) {
      setIsScrollableLeft(false);
    }
  };

  return (
    <>
      <ul className="nav nav-tabs FilterScroll" ref={outerDivRef}>
        {isScrollableLeft && (
          <BsArrowLeftShort
            className="scroll-left-arrow"
            onClick={handleScrollLeft}
          />
        )}

        {servicesNameList &&
          servicesNameList.map((item, index) => {
            return (
              <li className="nav-item" style={{ display: "inline-block" }}>
                <Link
                  className={`nav-link ${
                    item.srId === serviceId ? "serviceActive" : ""
                  }`}
                  aria-current="page"
                  onClick={() => setServiceId(item.srId)}
                >
                  {item.srName}
                </Link>
              </li>
            );
          })}
      </ul>
      {isScrollable && (
        <BsArrowRightShort
          class="scroll-right-arrow"
          onClick={handleScrollRight}
        />
      )}
    </>
  );
};

export default ProtfolioFilterSection;
