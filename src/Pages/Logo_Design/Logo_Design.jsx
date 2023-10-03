import React from 'react'

export const Logo_Design = () => {
    return (
        <>
            <div className="home">
                <div className="container logo-design" style={{ position: "relative" }}>
                    {/* Navigation */}
                    <header>
                        <div className="menu-btn">
                            {/* <span class="fa fa-list menu-btn"></span> */}
                            <img src="/ui/Images/menu-icon.png" alt="bell" />
                        </div>
                        <a href="#" className="logo">
                            <img className="logo_img" src="/ui/Images/logo.svg" alt="Main Logo" />
                        </a>
                        <nav className="navbar">
                            <div className="btn">
                                <span className="fa fa-close close-btn" />
                            </div>
                            <a href="#" className="active">
                                Home
                            </a>
                            <a href="#">Portfolio</a>
                            <div className="s_hide">
                                <a href="#" className="Services">
                                    Services
                                </a>
                                <div className="ddl">
                                    <div className="first-ddl">
                                        <a href="#">Logo Design</a>
                                        <a href="#">Brand Identity</a>
                                        <a href="#">Label design</a>
                                        <a href="#">Stationery Design</a>
                                        <a href="#">Social media</a>
                                    </div>
                                    <div className="Second-ddl">
                                        <a href="#">Business Card Design</a>
                                        <a href="#">Products Packaging Design</a>
                                        <a href="#">Banner/Hoardings/Billboard</a>
                                        <a href="#">Brochure/catalogue/Flayr</a>
                                        <a href="#">WordPress Website Development</a>
                                    </div>
                                </div>
                            </div>
                            <a href="#">How It work</a>
                            <a href="#">About Flyese</a>
                            <div className="search">
                                <img
                                    className="nav-search-img"
                                    src="/ui/Images/search.svg"
                                    alt="Search icon"
                                />
                                <input className="form-control nav-search" placeholder="Search" />
                                <div className="ddl_search">
                                    <div className="row">
                                        <div>
                                            <a href="#">Logo</a>
                                        </div>
                                        <div>
                                            <a href="#">Logo Design</a>
                                        </div>
                                        <div>
                                            <a href="#">Logo For Business</a>
                                        </div>
                                        <div>
                                            <a href="#">Minimal Logo</a>
                                        </div>
                                        <div>
                                            <a href="#">Minimal Logo</a>
                                        </div>
                                        <div>
                                            <a href="#">Minimal Logo</a>
                                        </div>
                                        <div>
                                            <a href="#">Minimal Logo</a>
                                        </div>
                                        <div>
                                            <a href="#">Minimal Logo</a>
                                        </div>
                                        <div>
                                            <a href="#">Minimal Logo</a>
                                        </div>
                                        <div>
                                            <a href="#">Minimal Logo</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="notifications d-flex justify-content-center align-items-center mb-2">
                                <div className="general-notification">
                                    <span className="badge-yellow" />
                                    <img src="/ui/Images/bell.svg" alt="bell" />
                                </div>
                                <div className="mail-notification">
                                    <span className="badge-green" />
                                    <img src="/ui/Images/mail.svg" alt="mail" />
                                </div>
                                <div className="language">
                                    <img src="/ui/Images/world.svg" alt="world" />
                                </div>
                                <div className="userProfile">
                                    <img
                                        className="img_profile"
                                        src="/ui/Images/userImage.png"
                                        alt="userProfile"
                                    />
                                    <div className="userDropdown">
                                        <a href="#">
                                            <img
                                                className="img_profile"
                                                src="/ui/Images/user-icon.png"
                                                alt="userProfile"
                                            />
                                            {/* <i class="fa fa-user"></i> */}
                                            Profile
                                        </a>
                                        <a href="#">
                                            <img
                                                className="img_profile"
                                                src="/ui/Images/orders-icon.png"
                                                alt="userProfile"
                                            />
                                            {/* <i class="fa fa-file"></i> */}
                                            Orders
                                        </a>
                                        <hr />
                                        <a href="#">English</a>
                                        <a href="#">INR</a>
                                        <a href="#">Help and Support</a>
                                        <hr />
                                        <a href="#">
                                            <img
                                                className="img_profile"
                                                src="/ui/Images/logout-icon.png"
                                                alt="userProfile"
                                            />
                                            <span style={{ color: "#dd3d4c" }}>Logout</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <div className="mobile-noti general-notification">
                            <img src="/ui/Images/bell.svg" alt="bell" />
                        </div>
                        <div className="on-mobile-navbar">
                            <img src="/ui/Images/logo.svg" style={{ height: 40 }} />
                            <div className="btn">
                                <span className="fa fa-close close-btn" />
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <a href="#">Home</a>
                                    </li>
                                    <li>
                                        <a href="#">About Us</a>
                                    </li>
                                    <div className="nav_s_hide">
                                        <li className="Nav-Services">
                                            <a href="#">Services</a>
                                        </li>
                                        {/* <a href="#" class="Services">Services</a> */}
                                        <div className="ddl">
                                            <div className="first-ddl">
                                                <a href="#">Logo Design</a>
                                                <a href="#">Brand Identity</a>
                                                <a href="#">Label design</a>
                                                <a href="#">Stationery Design</a>
                                                <a href="#">Social media</a>
                                            </div>
                                            <div className="Second-ddl">
                                                <a href="#">Business Card Design</a>
                                                <a href="#">Products Packaging Design</a>
                                                <a href="#">Banner/Hoardings/Billboard</a>
                                                <a href="#">Brochure/catalogue/Flayr</a>
                                                <a href="#">WordPress Website Development</a>
                                            </div>
                                        </div>
                                    </div>
                                    <li>
                                        <a href="#">How it Work</a>
                                    </li>
                                    <li>
                                        <a href="#">Portfolio</a>
                                    </li>
                                </ul>
                                <hr style={{ margin: "20px 0" }} />
                                <ul>
                                    <li>
                                        <a href="#">Profile</a>
                                    </li>
                                    <li>
                                        <a href="#">Message</a>
                                    </li>
                                    <li>
                                        <a href="#">Orders</a>
                                    </li>
                                    <li>
                                        <a href="#">English</a>
                                    </li>
                                    <li>
                                        <a href="#">INR</a>
                                    </li>
                                    <li>
                                        <a href="#">Help &amp; Support</a>
                                    </li>
                                </ul>
                                <hr style={{ margin: "20px 0" }} />
                                <div className="log-out">
                                    <a href="#">Log out</a>
                                </div>
                            </div>
                        </div>
                    </header>
                    {/* Navigation */}
                    <div className="breaddiv my-5">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <svg
                                        width={12}
                                        height={14}
                                        viewBox="0 0 12 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.30975 1.00195C6.26911 0.961202 6.22083 0.928877 6.16768 0.906822C6.11453 0.884766 6.05755 0.873413 6 0.873413C5.94245 0.873413 5.88547 0.884766 5.83232 0.906822C5.77917 0.928877 5.73089 0.961202 5.69025 1.00195L0.440251 6.25195C0.399649 6.29265 0.367468 6.34096 0.345548 6.39411C0.323628 6.44725 0.312398 6.5042 0.312501 6.5617V12.6867C0.312501 12.8027 0.358594 12.914 0.440641 12.9961C0.522689 13.0781 0.633968 13.1242 0.750001 13.1242H4.6875C4.80353 13.1242 4.91481 13.0781 4.99686 12.9961C5.07891 12.914 5.125 12.8027 5.125 12.6867V9.1867H6.875V12.6867C6.875 12.8027 6.92109 12.914 7.00314 12.9961C7.08519 13.0781 7.19647 13.1242 7.3125 13.1242H11.25C11.366 13.1242 11.4773 13.0781 11.5594 12.9961C11.6414 12.914 11.6875 12.8027 11.6875 12.6867V6.5617C11.6876 6.5042 11.6764 6.44725 11.6545 6.39411C11.6325 6.34096 11.6004 6.29265 11.5598 6.25195L10.375 5.06807V2.1867C10.375 2.07066 10.3289 1.95938 10.2469 1.87734C10.1648 1.79529 10.0535 1.7492 9.9375 1.7492H9.0625C8.94647 1.7492 8.83519 1.79529 8.75314 1.87734C8.67109 1.95938 8.625 2.07066 8.625 2.1867V3.31807L6.30975 1.00195ZM1.1875 12.2492V6.74282L6 1.93032L10.8125 6.74282V12.2492H7.75V8.7492C7.75 8.63316 7.70391 8.52188 7.62186 8.43984C7.53981 8.35779 7.42853 8.3117 7.3125 8.3117H4.6875C4.57147 8.3117 4.46019 8.35779 4.37814 8.43984C4.29609 8.52188 4.25 8.63316 4.25 8.7492V12.2492H1.1875Z"
                                            fill="#212529"
                                        />
                                    </svg>
                                    <a href="#" className="default">
                                        <span>Home</span>
                                    </a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <a>Services</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <a>Logo design</a>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="my-5">
                        <p className="h1 title1">
                            Many Types of Logos to Inspire Your Next Design
                        </p>
                        <p className="title2">
                            There are many different types of logos, and we’re going to provide all
                            of them in this plate-form. we’ll pinpoint the pros and cons, so you can
                            make the best decision when creating a logo design.
                        </p>
                    </div>
                </div>
                <div className="container text-center justify-content-center pb-5 Product-cards logo-design">
                    <div
                        className="row lead text-lg-start justify-content-center"
                        style={{ background: "#ffffff" }}
                    >
                        <div className="col-3 d-flex justify-content-center mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <img src="/ui/Images/minimalist-logo.png" />
                                    <h5 className="card-title my-3 px-3">
                                        Minimalist logo
                                        <span>Like: Airbnb</span>
                                    </h5>
                                    <p className="card-text mx-3">
                                        <span className="amount">₹2500</span>
                                        <span className="mx-2">from Starting</span>
                                    </p>
                                    <p className="card-text desc px-3">
                                        We will design modern logo and unique for your next level business
                                    </p>
                                    <p className="card-text discount mx-3 my-3">
                                        <span>Save up to 70%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 d-flex justify-content-center mx-5 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <img src="/ui/Images/minimalist-logo.png" />
                                    <h5 className="card-title my-3 px-3">
                                        Minimalist logo
                                        <span>Like: Airbnb</span>
                                    </h5>
                                    <p className="card-text mx-3">
                                        <span className="amount">₹2500</span>
                                        <span className="mx-2">from Starting</span>
                                    </p>
                                    <p className="card-text desc px-3">
                                        We will design modern logo and unique for your next level business
                                    </p>
                                    <p className="card-text discount mx-3 my-3">
                                        <span>Save up to 70%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 d-flex justify-content-center mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <img src="/ui/Images/minimalist-logo.png" />
                                    <h5 className="card-title my-3 px-3">
                                        Minimalist logo
                                        <span>Like: Airbnb</span>
                                    </h5>
                                    <p className="card-text mx-3">
                                        <span className="amount">₹2500</span>
                                        <span className="mx-2">from Starting</span>
                                    </p>
                                    <p className="card-text desc px-3">
                                        We will design modern logo and unique for your next level business
                                    </p>
                                    <p className="card-text discount mx-3 my-3">
                                        <span>Save up to 70%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* </div>

  <div class="row lead text-lg-start my-5 justify-content-center" style="background: #ffffff"> */}
                        <div className="col-3 d-flex justify-content-center mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <img src="/ui/Images/minimalist-logo.png" />
                                    <h5 className="card-title my-3 px-3">
                                        Minimalist logo
                                        <span>Like: Airbnb</span>
                                    </h5>
                                    <p className="card-text mx-3">
                                        <span className="amount">₹2500</span>
                                        <span className="mx-2">from Starting</span>
                                    </p>
                                    <p className="card-text desc px-3">
                                        We will design modern logo and unique for your next level business
                                    </p>
                                    <p className="card-text discount mx-3 my-3">
                                        <span>Save up to 70%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 d-flex justify-content-center mx-5 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <img src="/ui/Images/minimalist-logo.png" />
                                    <h5 className="card-title my-3 px-3">
                                        Minimalist logo
                                        <span>Like: Airbnb</span>
                                    </h5>
                                    <p className="card-text mx-3">
                                        <span className="amount">₹2500</span>
                                        <span className="mx-2">from Starting</span>
                                    </p>
                                    <p className="card-text desc px-3">
                                        We will design modern logo and unique for your next level business
                                    </p>
                                    <p className="card-text discount mx-3 my-3">
                                        <span>Save up to 70%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 d-flex justify-content-center mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <img src="/ui/Images/minimalist-logo.png" />
                                    <h5 className="card-title my-3 px-3">
                                        Minimalist logo
                                        <span>Like: Airbnb</span>
                                    </h5>
                                    <p className="card-text mx-3">
                                        <span className="amount">₹2500</span>
                                        <span className="mx-2">from Starting</span>
                                    </p>
                                    <p className="card-text desc px-3">
                                        We will design modern logo and unique for your next level business
                                    </p>
                                    <p className="card-text discount mx-3 my-3">
                                        <span>Save up to 70%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* </div>

  <div class="row lead text-lg-start my-5 justify-content-center" style="background: #ffffff"> */}
                        <div className="col-3 d-flex justify-content-center mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <img src="/ui/Images/minimalist-logo.png" />
                                    <h5 className="card-title my-3 px-3">
                                        Minimalist logo
                                        <span>Like: Airbnb</span>
                                    </h5>
                                    <p className="card-text mx-3">
                                        <span className="amount">₹2500</span>
                                        <span className="mx-2">from Starting</span>
                                    </p>
                                    <p className="card-text desc px-3">
                                        We will design modern logo and unique for your next level business
                                    </p>
                                    <p className="card-text discount mx-3 my-3">
                                        <span>Save up to 70%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 d-flex justify-content-center mx-5 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <img src="/ui/Images/minimalist-logo.png" />
                                    <h5 className="card-title my-3 px-3">
                                        Minimalist logo
                                        <span>Like: Airbnb</span>
                                    </h5>
                                    <p className="card-text mx-3">
                                        <span className="amount">₹2500</span>
                                        <span className="mx-2">from Starting</span>
                                    </p>
                                    <p className="card-text desc px-3">
                                        We will design modern logo and unique for your next level business
                                    </p>
                                    <p className="card-text discount mx-3 my-3">
                                        <span>Save up to 70%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 d-flex justify-content-center mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <img src="/ui/Images/minimalist-logo.png" />
                                    <h5 className="card-title my-3 px-3">
                                        Minimalist logo
                                        <span>Like: Airbnb</span>
                                    </h5>
                                    <p className="card-text mx-3">
                                        <span className="amount">₹2500</span>
                                        <span className="mx-2">from Starting</span>
                                    </p>
                                    <p className="card-text desc px-3">
                                        We will design modern logo and unique for your next level business
                                    </p>
                                    <p className="card-text discount mx-3 my-3">
                                        <span>Save up to 70%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* </div>

  <div class="row lead text-lg-start my-5 justify-content-center" style="background: #ffffff"> */}
                        <div className="col-3 d-flex justify-content-center mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <img src="/ui/Images/minimalist-logo.png" />
                                    <h5 className="card-title my-3 px-3">
                                        Minimalist logo
                                        <span>Like: Airbnb</span>
                                    </h5>
                                    <p className="card-text mx-3">
                                        <span className="amount">₹2500</span>
                                        <span className="mx-2">from Starting</span>
                                    </p>
                                    <p className="card-text desc px-3">
                                        We will design modern logo and unique for your next level business
                                    </p>
                                    <p className="card-text discount mx-3 my-3">
                                        <span>Save up to 70%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 d-flex justify-content-center mx-5 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <img src="/ui/Images/minimalist-logo.png" />
                                    <h5 className="card-title my-3 px-3">
                                        Minimalist logo
                                        <span>Like: Airbnb</span>
                                    </h5>
                                    <p className="card-text mx-3">
                                        <span className="amount">₹2500</span>
                                        <span className="mx-2">from Starting</span>
                                    </p>
                                    <p className="card-text desc px-3">
                                        We will design modern logo and unique for your next level business
                                    </p>
                                    <p className="card-text discount mx-3 my-3">
                                        <span>Save up to 70%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 d-flex justify-content-center mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <img src="/ui/Images/minimalist-logo.png" />
                                    <h5 className="card-title my-3 px-3">
                                        Minimalist logo
                                        <span>Like: Airbnb</span>
                                    </h5>
                                    <p className="card-text mx-3">
                                        <span className="amount">₹2500</span>
                                        <span className="mx-2">from Starting</span>
                                    </p>
                                    <p className="card-text desc px-3">
                                        We will design modern logo and unique for your next level business
                                    </p>
                                    <p className="card-text discount mx-3 my-3">
                                        <span>Save up to 70%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-center mb-5 logo-design">
                    <span className="b1">Grow faster with help your customers</span>
                    <br />
                    <span className="b2 mt-3">
                        Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
                        consectetur.Lorem ipsum dolor sit amet consectetur.
                    </span>
                </p>
                <section>
                    <div className="container logo-design">
                        <div className="row justify-content-center">
                            <div className="col-3 d-flex justify-content-center">
                                <div
                                    className="card icon-link"
                                    style={{ width: "18rem", border: "none", boxShadow: "none" }}
                                >
                                    <img
                                        className="my-3"
                                        src="/ui/Images/rating-review.svg"
                                        alt="Card image cap"
                                    />
                                    <div
                                        className="rhead"
                                        style={{ backgroundColor: "#ffffff", border: "none" }}
                                    >
                                        <p>Ratings &amp; Reviews</p>
                                    </div>
                                    <div className="rbody">
                                        <p>
                                            Collect reviews, Q&amp;A and other content from your customers
                                            started.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 d-flex justify-content-center">
                                <div
                                    className="card icon-link"
                                    style={{ width: "18rem", border: "none", boxShadow: "none" }}
                                >
                                    <img
                                        className="my-3"
                                        src="/ui/Images/rating-review.svg"
                                        alt="Card image cap"
                                    />
                                    <div
                                        className="rhead"
                                        style={{ backgroundColor: "#ffffff", border: "none" }}
                                    >
                                        <p>Ratings &amp; Reviews</p>
                                    </div>
                                    <div className="rbody">
                                        <p>
                                            Collect reviews, Q&amp;A and other content from your customers
                                            started.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 d-flex justify-content-center">
                                <div
                                    className="card icon-link"
                                    style={{ width: "18rem", border: "none", boxShadow: "none" }}
                                >
                                    <img
                                        className="my-3"
                                        src="/ui/Images/rating-review.svg"
                                        alt="Card image cap"
                                    />
                                    <div
                                        className="rhead"
                                        style={{ backgroundColor: "#ffffff", border: "none" }}
                                    >
                                        <p>Ratings &amp; Reviews</p>
                                    </div>
                                    <div className="rbody">
                                        <p>
                                            Collect reviews, Q&amp;A and other content from your customers
                                            started.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Footer */}
                <div className="footer-sec">
                    <div className="mailing-section">
                        <div className="container">
                            <div className="mailing-col">
                                <h3 className="text-gradient">Ready to get started?</h3>
                                <p className="grey-text text-center">
                                    Products on online services or over the Internet. Electronic
                                    commerce draws on technologies such as mobile commerce application
                                </p>
                                <div className="mailing-input">
                                    <input type="text" placeholder="Enter mail address" />
                                    <button className="blue-btn btn btn-secondary mt-3">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="container">
                            <div className="logo cursor-pointer">
                                <img src="/ui/Images/logo.svg" alt="main logo" />
                            </div>
                            <div className="row mt-1 mb-2">
                                <div className="col">
                                    <div className="footer-col">
                                        <ul>
                                            <li>
                                                <a>Services</a>
                                            </li>
                                            <li>
                                                <a>Portfolio</a>
                                            </li>
                                            <li>
                                                <a>How it work</a>
                                            </li>
                                            <li>
                                                <a>FAQs</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col">
                                    <ul>
                                        <li>
                                            <a>About us</a>
                                        </li>
                                        <li>
                                            <a>Contact us</a>
                                        </li>
                                        <li>
                                            <a>Privacy &amp; Policy</a>
                                        </li>
                                        <li>
                                            <a>Trust &amp; Safety</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <ul>
                                        <li>
                                            <a>Logo Design</a>
                                        </li>
                                        <li>
                                            <a>Brand Design</a>
                                        </li>
                                        <li>
                                            <a>Stationery Design</a>
                                        </li>
                                        <li>
                                            <a>Social Media</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <ul>
                                        <li>
                                            <a>Business Card Design</a>
                                        </li>
                                        <li>
                                            <a>Lable Design</a>
                                        </li>
                                        <li>
                                            <a>Banner Design</a>
                                        </li>
                                        <li>
                                            <a>Hoardings Design</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <ul>
                                        <li>
                                            <a>Billboard Design</a>
                                        </li>
                                        <li>
                                            <a>Brochure Design</a>
                                        </li>
                                        <li>
                                            <a>Catalogue Design</a>
                                        </li>
                                        <li>
                                            <a>Flayer Design</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bottom-col d-flex align-items-center justify-content-between">
                                <p className="cursor-pointer grey-text">
                                    © 2023 Flyses. All rights reserved. Terms &amp; Condition
                                </p>
                                <div className="d-flex align-items-center">
                                    <div className="footer-link-icon">
                                        <twitter>
                                            <i className="fa-brands fa-twitter" />
                                        </twitter>
                                    </div>
                                    <div className="footer-link-icon">
                                        <instagram>
                                            <i className="fa-brands fa-instagram" />
                                        </instagram>
                                    </div>
                                    <div className="footer-link-icon">
                                        <facebook>
                                            <i className="fa-brands fa-facebook-f" />
                                        </facebook>
                                    </div>
                                    <div className="footer-link-icon">
                                        <linkedin>
                                            <i className="fa-brands fa-linkedin-in" />
                                        </linkedin>
                                    </div>
                                    <div className="footer-ddl me-3">
                                        <select>
                                            <option
                                                style={{ backgroundImage: "url(/ui/Images/VISA.png)" }}
                                            >
                                                INR
                                            </option>
                                        </select>
                                    </div>
                                    <div className="footer-ddl">
                                        <select>
                                            <option>Eng</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
