import React, { useEffect, useState } from "react";
import { getProductWiseFaq } from "../../FlysesApi/Plan";
import { setLoadingStatus } from "../../FlysesApi";
import { toastError } from "../../FlysesApi/FlysesApi";

const ProductFaq = () => {
  let path = window.location.pathname;
  let splitdata = path.split("/");

  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    setLoadingStatus(true);
    bindFaq(splitdata[splitdata.length - 1]);
  }, []);

  const bindFaq = (id) => {
    getProductWiseFaq(id)
      .then((response) => {
        if (response?.length > 0) {
          setFaqList(response);
        } else {
          setFaqList([]);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        toastError("Bad response from server");
      });
  };

  return (
    <div className="faq my-5">
      {/* FAQ */}
      <div className="faq-section mt-5">
        <div className="">
          <div className="accordion" id="accordionExample">
            {faqList.length > 0 &&
              faqList.map((item, index) => {
                return (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className={(index !== 0 ? "accordion-button collapsed" : "accordion-button")}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded={(index !== 0 ? "false" : "true")}
                        aria-controls={`collapse${index}`}
                      >
                        {item?.faqQuestion}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className={(index !== 0 ? "accordion-collapse collapse" : "accordion-collapse collapse show")}
                      aria-labelledby={`heading${index}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">{item?.faqAnswer}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFaq;
