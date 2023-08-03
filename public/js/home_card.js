$(document).ready(function () {
  renderBtns();
});

document.addEventListener("DOMContentLoaded", function () {
  renderSlider(".slider");
});

const nextSlide = () => {
  let activeSlide = document.querySelector(".slide--active");
  let nextSlide = activeSlide.nextElementSibling;
  if (nextSlide) {
    activeSlide.classList.remove("slide--active");
    nextSlide.classList.remove("next");
    nextSlide.classList.add("slide--active");
    renderSlides();
    renderBtns();
  }

  $("#forvard").addClass("active");
  $("#back").removeClass("active");
};

const renderBtns = () => {
  let nextBtn = document.querySelector("#forvard");
  let prevBtn = document.querySelector("#back");

  let activeSlide = document.querySelector(".slide--active");
  let prevSlide = activeSlide.previousElementSibling;
  !prevSlide
    ? prevBtn.classList.add("disable")
    : prevBtn.classList.remove("disable");

  let nextSlide = activeSlide.nextElementSibling;
  !nextSlide
    ? nextBtn.classList.add("disable")
    : nextBtn.classList.remove("disable");
};

const prevSlide = () => {
  let activeSlide = document.querySelector(".slide--active");
  let prevSlide = activeSlide.previousElementSibling;
  if (prevSlide) {
    activeSlide.classList.remove("slide--active");
    prevSlide.classList.remove("prev");
    prevSlide.classList.add("slide--active");
    renderSlides();
    renderBtns();
  }
  $("#forvard").removeClass("active");
  $("#back").addClass("active");
};

const renderSlides = () => {
  let slides = document.querySelectorAll(".slide");
  if (!slides) {
    return;
  }
  let activeSlide = document.querySelector(".slide--active");
  if (!activeSlide) {
    activeSlide = slides.item(0);
    activeSlide.classList.add("slide--active");
  }
  [].forEach.call(slides, function (slide) {
    slide.classList.remove("prev", "next");
  });

  let prevSlide = activeSlide.previousElementSibling;
  prevSlide && prevSlide.classList.add("prev");

  let nextSlide = activeSlide.nextElementSibling;
  nextSlide && nextSlide.classList.add("next");
};

const renderSlider = (element) => {
  const slider = document.querySelector(element);
  if (slider) {
    let nextButton = document.querySelector("#forvard");
    nextButton.addEventListener("click", function () {
      nextSlide();
    });

    let prevButton = document.querySelector("#back");
    prevButton.addEventListener("click", function () {
      prevSlide();
    });
    renderSlides();
  }
};
