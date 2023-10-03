import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

const PortfolioSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    showSlides(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      showSlides(currentIndex);
    }, 1000);
  }, []);

  const plusSlides = (n) => {
    if (n === 1) {
      if (currentIndex < slides.length) {
        setCurrentIndex(currentIndex + n);
      }
    } else if (n === -1) {
      if (currentIndex > 1) {
        setCurrentIndex(currentIndex + n);
      }
    }
  };

  const currentSlide = (n) => {
    setCurrentIndex(n);
  };

  const showSlides = (n) => {
    const slides = document.getElementsByClassName("sliderImagesPanel");

    if (n > slides.length) {
      setCurrentIndex(1);
    }
    if (n < 1) {
      setCurrentIndex(slides.length);
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[currentIndex - 1].style.display = "block";

    if (slides.length > 1) {
      const dots = document.getElementsByClassName("navigation-dot");

      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" sliderActive", "");
      }
      dots[currentIndex - 1].className += " sliderActive";
    }
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      <div className="carousel-container">
        {slides.length > 0 &&
          slides.map((item, index) => {
            console.warn(item?.src);
            return (
              <div
                className={`sliderImagesPanel ${
                  currentIndex === index + 1 ? "sliderActive" : ""
                }`}
                key={index}
              >
                <img
                  className="sliderImg"
                  src={item?.url}
                  alt={`Image ${index + 1}`}
                />
              </div>
            );
          })}

        {slides.length > 1 && (
          <a className="sliderPreviousBtn" onClick={() => plusSlides(-1)}>
            ❮
          </a>
        )}

        {slides.length > 1 && (
          <a className="sliderNextBtn" onClick={() => plusSlides(1)}>
            ❯
          </a>
        )}

        {slides.length > 1 && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            {slides.map((_, index) => (
              <span
                className={`navigation-dot ${
                  currentIndex === index + 1 ? "sliderActive" : ""
                }`}
                onClick={() => currentSlide(index + 1)}
                key={index}
              ></span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PortfolioSlider;
