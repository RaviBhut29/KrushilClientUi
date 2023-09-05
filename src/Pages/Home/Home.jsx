import React from "react";
import $ from "jquery";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import { Link } from "react-router-dom";
import ContectUs from "../../Layout/ContactUs";

/* JS */
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

/* JS */

export const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="container">
        {/* Navigation */}
        <Header />
        {/* Navigation */}
        <div className="hero-section row align-items-center">
          <div className="col-lg-5">
            <div className="branding">
              <h2 className="heading gradient-text">
                Designing, Branding, Experiences and Connecting
              </h2>
              <span className="text">
                Work with the largest network of independent professionals and
                get things done—from quick turnarounds to big transformations.
              </span>
              <div className="d-flex">
                <Link to="/services" style={{ padding: "13px" }} className="me-2 btn btn-primary">Order Now</Link>
                <Link to={(sessionStorage.getItem("userSortName") || "") === "" ? "/login" : "/chat"}>
                  <button className="btn msg-btn-outline">Message us</button>
                </Link>
                {/* <button class="btn btn-primary">Message us</button> */}
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="ImagesClass">
              {/* <img
                  src="../ui/Images/Home-Content.svg"
                  alt="heroContent"
                  className="w-100"
                /> */}
              <img
                // src="../ui/Images/Home-Content-Card-1.svg"
                src="../ui/Images/1st-01.jpg"
                alt="heroContent"
                className="Home-Content-Card-1"
              />
              <img
                // src="../ui/Images/Home-Content-Card-2.svg"
                src="../ui/Images/2nd-01.jpg"
                alt="heroContent"
                className="Home-Content-Card-2"
              />
              <img
                // src="../ui/Images/Home-Content-Card-3.svg"
                src="../ui/Images/4th.jpg"
                alt="heroContent"
                className="Home-Content-Card-3"
              />
              <img
                // src="../ui/Images/Home-Content-Card-4.svg"
                src="../ui/Images/5th.jpg"
                alt="heroContent"
                className="Home-Content-Card-4"
              />
              <img
                // src="../ui/Images/Home-Content-Card-5.svg"
                src="../ui/Images/3rd-01.jpg"
                alt="heroContent"
                className="Home-Content-Card-5"
              />
            </div>
          </div>
        </div>
        <div className="row d-none">
          <div className="col-3">
            <div className="portfolio-card">
              <div className="portfolio-img">
                <img src="" alt="minimalistLogo" className="img-fluid" />
              </div>
              <div className="portfolio-content">
                <h5>Minimalist Logo</h5>
                <p>
                  We will design modern logo and unique for your next level
                  business
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="portfolio-card">
              <div className="portfolio-img">
                <img src="" alt="minimalistLogo" className="img-fluid" />
              </div>
              <div className="portfolio-content">
                <h5>Minimalist Logo</h5>
                <p>
                  We will design modern logo and unique for your next level
                  business
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="portfolio-card">
              <div className="portfolio-img">
                <img src="" alt="minimalistLogo" className="img-fluid" />
              </div>
              <div className="portfolio-content">
                <h5>Minimalist Logo</h5>
                <p>
                  We will design modern logo and unique for your next level
                  business
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="portfolio-card">
              <div className="portfolio-img">
                <img src="" alt="minimalistLogo" className="img-fluid" />
              </div>
              <div className="portfolio-content">
                <h5>Minimalist Logo</h5>
                <p>
                  We will design modern logo and unique for your next level
                  business
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      {/* Explore Section */}
      <div className="exploreCategories container mt-5">
        <h3 className="head gradient-text">Explore by Category</h3>
        <p className="subtext">
          Explore all the all services by category and find perfect and suitable
          service for you badly need
        </p>
        <div className="brandingCards row">
          <div className="col-lg-4">
            <div className="brands-card me-0">
              <img src="../ui/Images/star.svg" alt="star" />
              <h3>Logo Design</h3>
              <p>
                Stand out from the crowd with A<strong> logo </strong>
                that fits your brand personality.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="brands-card">
              <img src="../ui/Images/branding.svg" alt="star" />
              <h3>Branding</h3>
              <p>
                Go beyond the logo to establish your brand's
                <strong> identity </strong>,<strong> colors </strong>, and
                <strong> Fonts </strong>
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="brands-card ms-0">
              <img src="../ui/Images/pen.svg" alt="star" />
              <h3>Graphic Design</h3>
              <p>
                Do social media better than the rest with custom-designed
                <strong> skins </strong>,<strong> avatars </strong>
                &amp; more
              </p>
            </div>
          </div>
          {/* class="btn btn-primary d-flex align-items-center justify-content-center"> */}
          <Link style={{ padding: "13px" }} className="btn btn-SeeAll" to="/services">See all</Link>
        </div>
      </div>
      {/* Explore Section */}
      {/* How Flyses Work */}
      <div className="HowFlysesWork mt-5">
        <h3 className="head gradient-text">How flyses work?</h3>
        <div className="container">
          <div className="bottom-area">
            <div className="row" style={{ position: "relative" }}>
              <div className="col-md-4">
                <div className="about-card card-1">
                  <div className="icon-svgs">
                    <img src="../ui/Images/pickAplan.svg" />
                  </div>
                  <h5 className="mt-3">Pick a plan</h5>
                  <p className="subtext1">
                    Choose from one of our plans, and you'll be matched to your
                    dedicated graphic designer.
                  </p>
                </div>
              </div>
              <img className="line-svg" src="../ui/Images/qlli-line.svg" />
              <div className="col-md-4">
                <div className="about-card card-2">
                  <div className="icon-svgs">
                    <img src="../ui/Images/request-design.svg" />
                  </div>
                  <h5 className="mt-3">Request a design</h5>
                  <p className="subtext2">
                    Let us know what design you need and our team will start
                    work straight away.
                  </p>
                </div>
              </div>
              <img className="line-svg1" src="../ui/Images/qlli-line.svg" />
              <div className="col-md-4">
                <div className="about-card card-3">
                  <div className="icon-svgs">
                    <img src="../ui/Images/recive-design.svg" />
                  </div>
                  <h5 className="mt-3">Receive your design</h5>
                  <p className="subtext3">
                    Your design will be created within 1 or 3 business days,
                    depending on the plan chosen. We offer revisions on all our
                    designs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* How Flyses Work */}
      {/* Profile Section */}
      <div className="profile-section container d-none">
        <div className="row flex-lg-row-reverse">
          <div className="col-12 col-lg-6">
            <div className="cardContainer position-relative">
              {/* <Card class='client-card'> */}
              <div className="card client-card">
                {/* <CardBody class='position-relative'> */}
                <div className="card-body position-relative">
                  <img
                    src="../ui/Images/checkLogo.svg"
                    alt="checkmark Logo"
                    className="green-check-mark"
                  />
                  <h3>100+ Trusted Clients</h3>
                  <div className="profiles">
                    <div className="profile">
                      <img src="../ui/Images/userImage.png" alt="" />
                      <div className="info">
                        <p>Ben Stokes</p>
                        <span>Mentor of Web Design</span>
                      </div>
                    </div>
                    <div className="profile">
                      <img src="../ui/Images/userImage.png" alt="" />
                      <div className="info">
                        <p>Hardik Pandya</p>
                        <span>Mentor of Web Design</span>
                      </div>
                    </div>
                    <div className="profile">
                      <img src="../ui/Images/userImage.png" alt="" />
                      <div className="info">
                        <p>Joe Root</p>
                        <span>Mentor of UI/UX</span>
                      </div>
                    </div>
                  </div>
                  <a to="#" className="d-flex align-items-center">
                    See More
                    <img src="../ui/Images/rightarrow.svg" alt="right" />
                  </a>
                  {/* </CardBody> */}
                </div>
                {/* </Card> */}
              </div>
              <div
                className="dots"
                style={{ backgroundImage: "url(../ui/Images/24.svg)" }}
              />
              {/* <Card class='profile-card'> */}
              <div className="card profile-card">
                {/* <CardBody class='d-flex justify-content-center align-items-center flex-column'> */}
                <div className="card-body d-flex justify-content-center align-items-center flex-column">
                  <img src="../ui/Images/Profilebig.png" alt="userImage" />
                  <h3>Vishal Ponkiya</h3>
                  <span>Professional Logo Designer</span>
                  <button className="green-btn">CONTACT</button>
                  {/* </CardBody> */}
                </div>
                {/* </Card> */}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="textContainer">
              <h3 className="heading gradient-text">
                Getting work done has never been easier
              </h3>
              <ul>
                <li>Get matched with expert designers in minutes</li>
                <li>Dedicated 24/7 customer service team</li>
                <li>Money back guarantee and anti-fraud protection</li>
              </ul>
              <button className="btn btn-primary my-3 blue-btn">
                About Flyses
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Profile Section */}
      {/* About Section */}
      <div className="about-section container mt-0">
        <div className="top-area">
          <h3 className="gradient-text head">What's great about us?</h3>
          <p>
            We derive from the culture of obeying regulations and follow the
            path of staying true to our core values. In order to level up
            profitability, we never choose unethical practices.
          </p>
        </div>
        <div className="bottom-area">
          <div className="row">
            <div className="col-md-4">
              <div className="about-card">
                <div>
                  <img src="../ui/Images/community-icon.svg" />
                </div>
                <h5>Community Support</h5>
                <p>
                  General Committee for National and General Association
                  Activities for General Society Association
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="about-card">
                <div>
                  <img src="../ui/Images/security-icon.svg" />
                </div>
                <h5>Security First</h5>
                <p>
                  Website security is thus important to protect your business,
                  brand, and website.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="about-card">
                <div>
                  <img src="../ui/Images/shield-icon.svg" />
                </div>
                <h5>24/7 Admin Support</h5>
                <p>
                  24×7 Internet Technologies having experienced team of Designer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About Section */}
      {/* Brand Trust */}
      <div className="brandTrust">
        <div className="container">
          {/* <div class="img-div-1 float-parallax floating-animate-model-1"> */}
          <div className="img-div-1">
            <img src="../ui/Images/PP_1.png" alt="" />
          </div>
          {/* <div class="float-parallax floating-animate-model-1 img-div-2"> */}
          <div className="img-div-2">
            <img src="../ui/Images/PP_2.png" alt="" />
          </div>
          {/* <div class="float-parallax floating-animate-model-1 img-div-3"> */}
          <div className="img-div-3">
            <img src="../ui/Images/PP_3.png" alt="" />
          </div>
          {/* <div class="float-parallax floating-animate-model-1 img-div-4"> */}
          <div className="img-div-4">
            <img src="../ui/Images/PP_4.png" alt="" />
          </div>
          {/* <div class="float-parallax floating-animate-model-1 img-div-5"> */}
          <div className="img-div-5">
            <img src="../ui/Images/PP_5.png" alt="" />
          </div>
          {/* <div class="float-parallax floating-animate-model-1 img-div-6"> */}
          <div className="img-div-6">
            <img src="../ui/Images/PP_6.png" alt="" />
          </div>
          {/* <div> */}
          <div className="container-slide">
            <h3 className="head gradient-text">
              Trusted by leading
              <br />
              brands and startups
            </h3>
            <div className="slider">
              <div
                className="slide"
                data-slide={1}
                style={{ backgroundColor: "#fff" }}
              />
              <div
                className="slide slide--active"
                data-slide={2}
                style={{ backgroundColor: "#fff" }}
              >
                <div className="subtext">
                  <p>
                    I was very pleased to work with flyses on logo project.
                    The work went well, and he was available for questions and
                    clarifications as needed. I look forward to working on
                    further projects with him.
                  </p>
                  <p className="footer">Leslie Alexander</p>
                  <p className="sub-footer">CtO Of flyses</p>
                </div>
              </div>
              <div
                className="slide"
                data-slide={3}
                style={{ backgroundColor: "#fff" }}
              />
              <div
                className="slide"
                data-slide={4}
                style={{ backgroundColor: "#fff" }}
              />
              <div
                className="slide"
                data-slide={5}
                style={{ backgroundColor: "#fff" }}
              />
              <div
                className="slide"
                data-slide={5}
                style={{ backgroundColor: "#fff" }}
              />
              <div
                className="slide"
                data-slide={5}
                style={{ backgroundColor: "#fff" }}
              />
              <div
                className="slide"
                data-slide={5}
                style={{ backgroundColor: "#fff" }}
              />
            </div>
            <div className="controls">
              <div id="back" onClick={prevSlide}>
                <img
                  src="../ui/Images/right.svg"
                  height={20}
                  width={20}
                  alt=""
                />
              </div>
              <div id="forvard" className="active" onClick={nextSlide}>
                <img
                  src="../ui/Images/right.svg"
                  height={20}
                  width={20}
                  alt=""
                />
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="dotted-img">
            <img src="../ui/Images/dotted-1.svg" alt="" />
          </div>
          <div className="dotted-img-2">
            <img src="../ui/Images/dotted-2.svg" alt="" />
          </div>
        </div>
      </div>
      {/* Brand Trust */}
      {/* ContactUs Section */}
      <div className="carousel-sec mt-5 d-none">
        <div>
          <h3 className="gradient-text head">
            Trusted by leading brands and startups
          </h3>
          <p />
        </div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://picsum.photos/id/123/1200/400"
                alt="First slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Image 1</h5>
                <p>Image 1</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://picsum.photos/id/456/1200/400"
                alt="Second slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Image 2</h5>
                <p>Image 2</p>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="https://picsum.photos/id/678/1200/400"
                alt="Third slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Image 3</h5>
                <p>Image 3</p>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      <ContectUs />
      {/* <div className="contact-us-section">
        <div className="container sub-section">
          <div className="row text-center justify-content-center">
            <div className="col-3">
              <h3 className="contact-head" id="projectDone">
                126
              </h3>
              <h6>Projects Done</h6>
            </div>
            <div className="col-3">
              <h3 className="contact-head" id="yearsExper">
                4+
              </h3>
              <h6>Years Experience</h6>
            </div>
            <div className="col-3">
              <h3 className="contact-head" id="happyCus">
                98
              </h3>
              <h6>Happy Customers</h6>
            </div>
          </div>
          <div className="contact-text">
            <h3>Want to start a Project With us?</h3>
            <p>
              Enter your email address to receive all news from our awesome
              services and offers.
            </p>
            <button className="con-us-btn btn btn-secondary">Contact Us</button>
          </div>
        </div>
      </div> */}
      {/* ContactUs Section */}
      {/* FAQ */}
      <div className="faq-section">
        <div className="container">
          <h4 className="text-center faq-title">
            <span className="color-pink">F</span>requently
            <span className="color-pink">A</span>sked
            <span className="color-pink">Q</span>uestions
          </h4>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Why should i choose Flyses?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Lorem ipsum dolor sit amet consectetur. A ac lorem massa
                  pellentesque sit tellus ac. Arcu mauris mauris quam sed.
                  Viverra eleifend pretium donec in egestas sit. Est cras vitae
                  sollicitudin purus mi eu massa sodales.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  How does it work?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Lorem ipsum dolor sit amet consectetur. A ac lorem massa
                  pellentesque sit tellus ac. Arcu mauris mauris quam sed.
                  Viverra eleifend pretium donec in egestas sit. Est cras vitae
                  sollicitudin purus mi eu massa sodales.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  How can i believe on flyses before payment?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Lorem ipsum dolor sit amet consectetur. A ac lorem massa
                  pellentesque sit tellus ac. Arcu mauris mauris quam sed.
                  Viverra eleifend pretium donec in egestas sit. Est cras vitae
                  sollicitudin purus mi eu massa sodales.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  How will this help to grow my business?
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Lorem ipsum dolor sit amet consectetur. A ac lorem massa
                  pellentesque sit tellus ac. Arcu mauris mauris quam sed.
                  Viverra eleifend pretium donec in egestas sit. Est cras vitae
                  sollicitudin purus mi eu massa sodales.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  Can i get my refund if i am not satisfied with work?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Lorem ipsum dolor sit amet consectetur. A ac lorem massa
                  pellentesque sit tellus ac. Arcu mauris mauris quam sed.
                  Viverra eleifend pretium donec in egestas sit. Est cras vitae
                  sollicitudin purus mi eu massa sodales.
                </div>
              </div>
            </div>
          </div>
          {/* <Accordion open={open} toggle={toggle}>
          <AccordionItem>
              <AccordionHeader targetId="1">Why should i choose Flyses?</AccordionHeader>
              <AccordionBody accordionId="1">
              Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
              </AccordionBody>
          </AccordionItem>
          <AccordionItem>
              <AccordionHeader targetId="2">How does it work?</AccordionHeader>
              <AccordionBody accordionId="2">
              Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
              </AccordionBody>
          </AccordionItem>
          <AccordionItem>
              <AccordionHeader targetId="3">How can i believe on flyses before payment? </AccordionHeader>
              <AccordionBody accordionId="3">
              Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
              </AccordionBody>
          </AccordionItem>
          <AccordionItem>
              <AccordionHeader targetId="4">How will this help to grow my business? </AccordionHeader>
              <AccordionBody accordionId="4">
              Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
              </AccordionBody>
          </AccordionItem>
          <AccordionItem>
              <AccordionHeader targetId="5">Can i get my refund if i am not satisfied with work? </AccordionHeader>
              <AccordionBody accordionId="5">
              Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
              </AccordionBody>
          </AccordionItem>
      </Accordion> */}
        </div>
      </div>
      {/* FAQ */}
      {/* Footer */}
      <Footer />
    </div>
  );
};