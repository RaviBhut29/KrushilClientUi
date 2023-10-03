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
                Logos that Speak, Graphics that Inspire
              </h2>
              <span className="text">
                Providing brands with expressive logos and captivating graphics
                that inspire customers and move them towards success.
              </span>
              <div className="d-flex">
                <Link
                  to="/services"
                  style={{ padding: "13px" }}
                  className="me-2 btn btn-primary"
                >
                  Order Now
                </Link>
                <Link
                  to={
                    (sessionStorage.getItem("userSortName") || "") === ""
                      ? "/login"
                      : "/chat"
                  }
                >
                  <button className="btn msg-btn-outline">Message us</button>
                </Link>
                {/* <button class="btn btn-primary">Message us</button> */}
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="ImagesClass">
              {/* <img
                  src="/ui/Images/Home-Content.svg"
                  alt="heroContent"
                  className="w-100"
                /> */}
              <img
                // src="/ui/Images/Home-Content-Card-1.svg"
                src="/ui/Images/1st-01.jpg"
                alt="heroContent"
                className="Home-Content-Card-1"
              />
              <img
                // src="/ui/Images/Home-Content-Card-2.svg"
                src="/ui/Images/2nd-01.jpg"
                alt="heroContent"
                className="Home-Content-Card-2"
              />
              <img
                // src="/ui/Images/Home-Content-Card-3.svg"
                src="/ui/Images/4th.jpg"
                alt="heroContent"
                className="Home-Content-Card-3"
              />
              <img
                // src="/ui/Images/Home-Content-Card-4.svg"
                src="/ui/Images/5th.jpg"
                alt="heroContent"
                className="Home-Content-Card-4"
              />
              <img
                // src="/ui/Images/Home-Content-Card-5.svg"
                src="/ui/Images/3rd-01.jpg"
                alt="heroContent"
                className="Home-Content-Card-5"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      {/* Explore Section */}
      <div className="exploreCategories container mt-5">
        <h3 className="head gradient-text">Explore by Category</h3>
        <p className="subtext">
          Flyses bring your ideas to life. Browse through our services by
          category to discover your ideal solution.
        </p>
        <div className="brandingCards row">
          <div className="col-lg-4">
            <div className="brands-card me-0">
              <img src="/ui/Images/star.svg" alt="star" />
              <h3>Logo Designing</h3>
              <p>
                Curating brand identity through unique,
                <strong>
                  impactful logos, Increase exposure, communicate values{" "}
                </strong>
                , and outperform rivals with our skilled designs.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="brands-card">
              <img src="/ui/Images/branding.svg" alt="star" />
              <h3>Brand identity</h3>
              <p>
                Improve brand reputation, attract customers, and deliver
                powerful messages with aesthetically appealing brand identity.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="brands-card ms-0">
              <img src="/ui/Images/pen.svg" alt="star" />
              <h3>Graphic Designing</h3>
              <p>
                Promote brands, captivate audiences and deliver powerful
                messages by transforming ideas into appealing images.
              </p>
            </div>
          </div>
          {/* class="btn btn-primary d-flex align-items-center justify-content-center"> */}
          <Link
            style={{ padding: "13px" }}
            className="btn btn-SeeAll"
            to="/services"
          >
            See all
          </Link>
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
                    <img src="/ui/Images/pickAplan.svg" />
                  </div>
                  <h5 className="mt-3">Pick a plan</h5>
                  <p className="subtext1">
                    Choose from one of our plans, and you'll be matched to your
                    dedicated graphic designer.
                  </p>
                </div>
              </div>
              <img className="line-svg" src="/ui/Images/qlli-line.svg" />
              <div className="col-md-4">
                <div className="about-card card-2">
                  <div className="icon-svgs">
                    <img src="/ui/Images/request-design.svg" />
                  </div>
                  <h5 className="mt-3">Request a design</h5>
                  <p className="subtext2">
                    Let us know what design you need and our team will start
                    work straight away.
                  </p>
                </div>
              </div>
              <img className="line-svg1" src="/ui/Images/qlli-line.svg" />
              <div className="col-md-4">
                <div className="about-card card-3">
                  <div className="icon-svgs">
                    <img src="/ui/Images/recive-design.svg" />
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
      {/* About Section */}
      <div className="about-section container mt-0">
        <div className="top-area">
          <h3 className="gradient-text head">What's great about us?</h3>
          <p>
            Our superior creativity, individualized approach, and track record
            of success make us the best option. Flyses will help your brand soar
            since it combines excellence and innovation.
          </p>
        </div>
        <div className="bottom-area">
          <div className="row">
            <div className="col-md-4">
              <div className="about-card">
                <div>
                  <img src="/ui/Images/community-icon.svg" />
                </div>
                <h5>Professional team</h5>
                <p>
                  Customized art curated by Flyses' experienced professionals to
                  reflect your ideas.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="about-card">
                <div>
                  <img src="/ui/Images/security-icon.svg" />
                </div>
                <h5>Perfect strategy</h5>
                <p>
                  Strategic design creation for powerful branding of your
                  business.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="about-card">
                <div>
                  <img src="/ui/Images/shield-icon.svg" />
                </div>
                <h5>100% Customer satisfaction</h5>
                <p>
                  Delivering exceptional customer service by being thorough,
                  transparent, and committed.
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
            <img src="/ui/Images/PP_1.png" alt="" />
          </div>
          {/* <div class="float-parallax floating-animate-model-1 img-div-2"> */}
          <div className="img-div-2">
            <img src="/ui/Images/PP_2.png" alt="" />
          </div>
          {/* <div class="float-parallax floating-animate-model-1 img-div-3"> */}
          <div className="img-div-3">
            <img src="/ui/Images/PP_3.png" alt="" />
          </div>
          {/* <div class="float-parallax floating-animate-model-1 img-div-4"> */}
          <div className="img-div-4">
            <img src="/ui/Images/PP_4.png" alt="" />
          </div>
          {/* <div class="float-parallax floating-animate-model-1 img-div-5"> */}
          <div className="img-div-5">
            <img src="/ui/Images/PP_5.png" alt="" />
          </div>
          {/* <div class="float-parallax floating-animate-model-1 img-div-6"> */}
          <div className="img-div-6">
            <img src="/ui/Images/PP_6.png" alt="" />
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
                className="slide slide--active"
                data-slide={2}
                style={{ backgroundColor: "#fff" }}
              >
                <div className="subtext">
                  <p>
                    Kudos to Flyses for their outstanding logo design! They
                    delivered exactly what we were looking for in our brand.
                    Highly recommended!
                  </p>
                  <p className="footer">Rahul Savaliya</p>
                  <p className="sub-footer">CtO Of flyses</p>
                </div>
              </div>
              <div
                className="slide"
                data-slide={3}
                style={{ backgroundColor: "#fff" }}
              >
                <div className="subtext">
                  <p>
                    Flyses' graphic design services improved our marketing to a
                    whole new level. Professional, eye-catching, and spot-on
                    every time!
                  </p>
                  <p className="footer">Mehul Nariya</p>
                  <p className="sub-footer"></p>
                </div>
              </div>
              <div
                className="slide"
                data-slide={4}
                style={{ backgroundColor: "#fff" }}
              >
                <div className="subtext">
                  <p>
                    They truly excel in logo design, crafting a unique and
                    memorable design that perfectly represents our brand. A true
                    creative partner!
                  </p>
                  <p className="footer">Bhavin Desai</p>
                  <p className="sub-footer"></p>
                </div>
              </div>
              <div
                className="slide"
                data-slide={5}
                style={{ backgroundColor: "#fff" }}
              >
                <div className="subtext">
                  <p>
                    Their brand identity work is top-notch! Flyses truly
                    understood our needs and beautifully put them into visuals.
                    Worth the money!
                  </p>
                  <p className="footer">Satyam Suvagiya</p>
                  <p className="sub-footer"></p>
                </div>
              </div>
              <div
                className="slide"
                data-slide={6}
                style={{ backgroundColor: "#fff" }}
              >
                <div className="subtext">
                  <p>
                    Flyses did a fantastic job with our logo. It's now
                    professional and memorable, just like we wanted. Thank you!
                  </p>
                  <p className="footer">Chirag Agarwal</p>
                  <p className="sub-footer"></p>
                </div>
              </div>
            </div>
            <div className="controls">
              <div id="back" onClick={prevSlide}>
                <img src="/ui/Images/right.svg" height={20} width={20} alt="" />
              </div>
              <div id="forvard" className="active" onClick={nextSlide}>
                <img src="/ui/Images/right.svg" height={20} width={20} alt="" />
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="dotted-img">
            <img src="/ui/Images/dotted-1.svg" alt="" />
          </div>
          <div className="dotted-img-2">
            <img src="/ui/Images/dotted-2.svg" alt="" />
          </div>
        </div>
      </div>
      {/* Brand Trust */}
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
                  Why should I choose Flyses?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Customized graphics that reflect your ideas, impactful
                  branding, and a relentless commitment to thorough, open, and
                  customer-focused service makes Flyses stand out and guarantee
                  your utmost happiness.
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
                  Which industry sectors has Flyses worked in?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Our broad range of services includes industries such as
                  technology, fashion, food and beverage, healthcare, and other
                  sectors. We enjoy taking on fresh challenges and enriching
                  each project with new concepts.
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
                  How long does it typically take to complete a branding
                  project?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Depending on how complex the project is, turnaround times can
                  change. However, we respect your time and work hard to create
                  top-notch designs by the deadline.
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
                  How can I believe in Flyses before payment?
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Experience the credibility of Flyses through our portfolio,
                  client testimonials, and open communication. Before making any
                  financial commitment, we first prioritize gaining your trust
                  and displaying our skills.
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
                  How do I begin using Flyses for my branding and design
                  requirements?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Starting out is easy! Contact us via our website or contact
                  information, and we'll arrange a consultation to go over your
                  requirements, your objectives, and how we can improve the
                  visual identity of your company.
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
                  What if my design project has a tight budget?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  We are aware that budgets can differ. Flyses provides
                  adaptable design options and may work within your budgetary
                  restrictions to produce distinctive designs that make you
                  stand out.
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
                  Do Flyses offer revisions if I am not satisfied with work?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  We appreciate your feedback and provide an open revision
                  process. Initial drawings are shown, and we welcome your
                  comments. We then work directly with you to revise the designs
                  until they completely reflect your vision.
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
                  Can I expect a refund if I am not satisfied with work?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Flyses offer a full refund of your amount if you are not fully
                  satisfied with our work and designs.
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
