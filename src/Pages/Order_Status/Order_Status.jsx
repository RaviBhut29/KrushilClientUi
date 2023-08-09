import React from 'react'

export const Order_Status = () => {
    return (
        <>
            <div className="container Order-status">
                {/* Navigation */}
                <header>
                    <div className="menu-btn">
                        {/* <span class="fa fa-list menu-btn"></span> */}
                        <img src="../ui/Images/menu-icon.png" alt="bell" />
                    </div>
                    <a href="#" className="logo">
                        <img className="logo_img" src="../ui/Images/logo.svg" alt="Main Logo" />
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
                                src="../ui/Images/search.svg"
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
                                <img src="../ui/Images/bell.svg" alt="bell" />
                            </div>
                            <div className="mail-notification">
                                <span className="badge-green" />
                                <img src="../ui/Images/mail.svg" alt="mail" />
                            </div>
                            <div className="language">
                                <img src="../ui/Images/world.svg" alt="world" />
                            </div>
                            <div className="userProfile">
                                <img
                                    className="img_profile"
                                    src="../ui/Images/userImage.png"
                                    alt="userProfile"
                                />
                                <div className="userDropdown">
                                    <a href="#">
                                        <img
                                            className="img_profile"
                                            src="../ui/Images/user-icon.png"
                                            alt="userProfile"
                                        />
                                        {/* <i class="fa fa-user"></i> */}
                                        Profile
                                    </a>
                                    <a href="#">
                                        <img
                                            className="img_profile"
                                            src="../ui/Images/orders-icon.png"
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
                                            src="../ui/Images/logout-icon.png"
                                            alt="userProfile"
                                        />
                                        <span style={{ color: "#dd3d4c" }}>Logout</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="mobile-noti general-notification">
                        <img src="../ui/Images/bell.svg" alt="bell" />
                    </div>
                    <div className="on-mobile-navbar">
                        <img src="../ui/Images/logo.svg" style={{ height: 40 }} />
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
                <div className="breaddiv mt-5">
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
                                <a className="default" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <a>Order</a>
                                {/* Portfolio */}
                            </li>
                        </ol>
                    </nav>
                </div>
                <p className="order-id my-3">
                    Order ID:
                    <span>#26562356</span>
                </p>
                <div className="row gy-5">
                    <div className="col-8 card1">
                        <div className="card">
                            <div className="card-header py-3">
                                <div className="card1-info d-flex">
                                    <span className="info">I will design watercolour logo for you</span>
                                    <span className="info-date ms-2">06 April, 2023</span>
                                    <button
                                        type="button"
                                        style={{ marginLeft: "auto" }}
                                        className="btn-edit"
                                    >
                                        Edit
                                    </button>
                                    <button type="button" className="btn-close" aria-label="Close" />
                                </div>
                            </div>
                            <div className="card-body">
                                <p>
                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9.94165 19.4136C15.1583 19.4136 19.3872 15.1847 19.3872 9.96802C19.3872 4.75138 15.1583 0.522461 9.94165 0.522461C4.72501 0.522461 0.496094 4.75138 0.496094 9.96802C0.496094 15.1847 4.72501 19.4136 9.94165 19.4136ZM14.3186 8.44151C14.7797 7.98042 14.7797 7.23284 14.3186 6.77175C13.8575 6.31066 13.1099 6.31066 12.6489 6.77175L8.76096 10.6597L7.23445 9.13314C6.77336 8.67205 6.02578 8.67205 5.56469 9.13314C5.1036 9.59423 5.1036 10.3418 5.56469 10.8029L7.92608 13.1643C8.38717 13.6254 9.13474 13.6254 9.59583 13.1643L14.3186 8.44151Z"
                                            fill="#198754"
                                        />
                                    </svg>
                                    <span className="card1-title">1 Day Delivery</span>
                                    <svg
                                        className="ms-2"
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9.94165 19.4136C15.1583 19.4136 19.3872 15.1847 19.3872 9.96802C19.3872 4.75138 15.1583 0.522461 9.94165 0.522461C4.72501 0.522461 0.496094 4.75138 0.496094 9.96802C0.496094 15.1847 4.72501 19.4136 9.94165 19.4136ZM14.3186 8.44151C14.7797 7.98042 14.7797 7.23284 14.3186 6.77175C13.8575 6.31066 13.1099 6.31066 12.6489 6.77175L8.76096 10.6597L7.23445 9.13314C6.77336 8.67205 6.02578 8.67205 5.56469 9.13314C5.1036 9.59423 5.1036 10.3418 5.56469 10.8029L7.92608 13.1643C8.38717 13.6254 9.13474 13.6254 9.59583 13.1643L14.3186 8.44151Z"
                                            fill="#198754"
                                        />
                                    </svg>
                                    <span className="card1-title">Unlimited Revisions</span>
                                </p>
                                <p className="card-text mx-2 card1-Features">Included Features</p>
                                <ul className="mx-2 card1-Features-li">
                                    <li>4 concepts included</li>
                                    <li>Logo transparency</li>
                                    <li>Vector file</li>
                                    <li>Printable file</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Right First Card */}
                    <div className="col-4 card2">
                        <div className="card">
                            <div className="card-header py-3">
                                <div className="card1-info d-flex">
                                    <span className="info">Order Details</span>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 details">Order Status</div>
                                    <div className="col-6" style={{ textAlign: "end" }}>
                                        <svg
                                            width={19}
                                            height={18}
                                            viewBox="0 0 19 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.275 10.575L6.39375 8.69375C6.23333 8.53333 6.02917 8.45312 5.78125 8.45312C5.53333 8.45312 5.32917 8.53333 5.16875 8.69375C5.00833 8.85417 4.92812 9.05833 4.92812 9.30625C4.92812 9.55417 5.00833 9.75833 5.16875 9.91875L7.6625 12.4125C7.8375 12.5875 8.04167 12.675 8.275 12.675C8.50833 12.675 8.7125 12.5875 8.8875 12.4125L13.8313 7.46875C13.9917 7.30833 14.0719 7.10417 14.0719 6.85625C14.0719 6.60833 13.9917 6.40417 13.8313 6.24375C13.6708 6.08333 13.4667 6.00312 13.2188 6.00312C12.9708 6.00312 12.7667 6.08333 12.6062 6.24375L8.275 10.575ZM9.5 17.75C8.28958 17.75 7.15208 17.5202 6.0875 17.0605C5.02292 16.6008 4.09688 15.9775 3.30938 15.1906C2.52188 14.4031 1.89858 13.4771 1.4395 12.4125C0.980417 11.3479 0.750583 10.2104 0.75 9C0.75 7.78958 0.979833 6.65208 1.4395 5.5875C1.89917 4.52292 2.52246 3.59688 3.30938 2.80938C4.09688 2.02188 5.02292 1.39858 6.0875 0.9395C7.15208 0.480417 8.28958 0.250583 9.5 0.25C10.7104 0.25 11.8479 0.479833 12.9125 0.9395C13.9771 1.39917 14.9031 2.02246 15.6906 2.80938C16.4781 3.59688 17.1017 4.52292 17.5614 5.5875C18.021 6.65208 18.2506 7.78958 18.25 9C18.25 10.2104 18.0202 11.3479 17.5605 12.4125C17.1008 13.4771 16.4775 14.4031 15.6906 15.1906C14.9031 15.9781 13.9771 16.6017 12.9125 17.0614C11.8479 17.521 10.7104 17.7506 9.5 17.75Z"
                                                fill="#198754"
                                            />
                                        </svg>
                                        <span className="info" style={{ color: "#198754" }}>
                                            Placed
                                        </span>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-6 details">Order created</div>
                                    <div className="col-6" style={{ textAlign: "end" }}>
                                        <span className="info FontBold" style={{ color: "#000" }}>
                                            06 April, 2023
                                        </span>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-6 details">Order number</div>
                                    <div className="col-6" style={{ textAlign: "end" }}>
                                        <span className="info" style={{ color: "#000" }}>
                                            #26562356
                                        </span>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-6 details">Delivery date &amp; time</div>
                                    <div className="col-6" style={{ textAlign: "end" }}>
                                        <span className="info" style={{ color: "#000" }}>
                                            10 April, 10:30PM
                                        </span>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-6 details">Total</div>
                                    <div className="col-6" style={{ textAlign: "end" }}>
                                        <span className="info" style={{ color: "#000" }}>
                                            $120
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right First Card */}
                    {/* Left Second Card */}
                    <div className="col-8 card3 mt-3">
                        <div className="card">
                            <div className="card-header py-3">
                                <div className="card1-info d-flex">
                                    <span className="info">Your Delivery</span>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row no-order">
                                    <div className="col-2">
                                        <img
                                            height={150}
                                            width={150}
                                            src="https://img.freepik.com/free-vector/messenger-concept-illustration_114360-1394.jpg?size=626&ext=jpg&ga=GA1.2.1238397793.1685471528&semt=ais"
                                        />
                                    </div>
                                    <div className="col-auto pt-4 ps-5">
                                        <span className="info">Nothing here to see yet</span>
                                        <p className="mt-1" style={{ width: 450 }}>
                                            Your delivery will appear here. your delivery date will be
                                            determined once you submit the requirements.
                                        </p>
                                    </div>
                                </div>
                                {/* downlaods */}
                                <div className="row pending-order">
                                    <div className="col-5">
                                        <div className="info-box">
                                            <span
                                                className="info-box-icon"
                                                style={{
                                                    backgroundImage:
                                                        "url(../ui/Images/upload-list-image-card.png)",
                                                    backgroundSize: "cover"
                                                }}
                                            >
                                                {/* <i class="far fa-envelope"></i> */}
                                                {/* <img width="100" height="100" src="../ui/Images/upload-list-image-card.png"> */}
                                            </span>
                                            <div className="info-box-content">
                                                <span className="info-box-text">Typography logo</span>
                                                <span className="info-box-number">Source file (AI)</span>
                                            </div>
                                            <div className="info-box-icon">
                                                <img src="../ui/Images/Vector.png" />
                                                {/* <i
                  class="fa fa-download p-2"
                  style="border: 1px solid black"></i> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <div className="info-box">
                                            <span
                                                className="info-box-icon"
                                                style={{
                                                    backgroundImage:
                                                        "url(../ui/Images/upload-list-image-card.png)",
                                                    backgroundSize: "cover"
                                                }}
                                            />
                                            <div className="info-box-content">
                                                <span className="info-box-text">Typography logo</span>
                                                <span className="info-box-number">Source file (AI)</span>
                                            </div>
                                            <div className="info-box-icon">
                                                <img src="../ui/Images/Vector.png" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* 2 */}
                                <div className="row pending-order my-4">
                                    <div className="col-5">
                                        <div className="info-box">
                                            <span
                                                className="info-box-icon"
                                                style={{
                                                    backgroundImage:
                                                        "url(../ui/Images/upload-list-image-card.png)",
                                                    backgroundSize: "cover"
                                                }}
                                            >
                                                {/* <i class="far fa-envelope"></i> */}
                                                {/* <img width="100" height="100" src="../ui/Images/upload-list-image-card.png"> */}
                                            </span>
                                            <div className="info-box-content">
                                                <span className="info-box-text">Typography logo</span>
                                                <span className="info-box-number">Source file (AI)</span>
                                            </div>
                                            <div className="info-box-icon">
                                                <img src="../ui/Images/Vector.png" />
                                                {/* <i
                  class="fa fa-download p-2"
                  style="border: 1px solid black"></i> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <div className="info-box">
                                            <span
                                                className="info-box-icon"
                                                style={{
                                                    backgroundImage:
                                                        "url(../ui/Images/upload-list-image-card.png)",
                                                    backgroundSize: "cover"
                                                }}
                                            />
                                            <div className="info-box-content">
                                                <span className="info-box-text">Typography logo</span>
                                                <span className="info-box-number">Source file (AI)</span>
                                            </div>
                                            <div className="info-box-icon">
                                                <img src="../ui/Images/Vector.png" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* 2 */}
                                {/* 3 */}
                                <div className="row pending-order">
                                    <div className="col-5">
                                        <div className="info-box">
                                            <span
                                                className="info-box-icon"
                                                style={{
                                                    backgroundImage:
                                                        "url(../ui/Images/upload-list-image-card.png)",
                                                    backgroundSize: "cover"
                                                }}
                                            >
                                                {/* <i class="far fa-envelope"></i> */}
                                                {/* <img width="100" height="100" src="../ui/Images/upload-list-image-card.png"> */}
                                            </span>
                                            <div className="info-box-content">
                                                <span className="info-box-text">Typography logo</span>
                                                <span className="info-box-number">Source file (AI)</span>
                                            </div>
                                            <div className="info-box-icon">
                                                <img src="../ui/Images/Vector.png" />
                                                {/* <i
                  class="fa fa-download p-2"
                  style="border: 1px solid black"></i> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <div className="info-box">
                                            <span
                                                className="info-box-icon"
                                                style={{
                                                    backgroundImage:
                                                        "url(../ui/Images/upload-list-image-card.png)",
                                                    backgroundSize: "cover"
                                                }}
                                            />
                                            <div className="info-box-content">
                                                <span className="info-box-text">Typography logo</span>
                                                <span className="info-box-number">Source file (AI)</span>
                                            </div>
                                            <div className="info-box-icon">
                                                <img src="../ui/Images/Vector.png" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* 3 */}
                                {/* downlaods */}
                            </div>
                        </div>
                    </div>
                    {/* Left Second Card */}
                    {/* Right Second Card */}
                    <div className="col-4 card4 mt-3">
                        <div className="card">
                            <div className="card-header py-3">
                                <div className="card1-info d-flex">
                                    <span className="info">Flyses Support</span>
                                </div>
                            </div>
                            <div className="card-body">
                                <div
                                    className="info-box support"
                                    style={{ boxShadow: "none", minHeight: "auto" }}
                                >
                                    <div className="info-box-content">
                                        <span className="info-box-text">FAQs</span>
                                    </div>
                                    <span className="info-box-icon" style={{ transition: "0.5s" }}>
                                        <img src="../ui/Images/arrow-right.png" />
                                    </span>
                                </div>
                                <div
                                    className="info-box support"
                                    style={{ boxShadow: "none", minHeight: "auto" }}
                                >
                                    <div className="info-box-content">
                                        <span className="info-box-text">Message to our team</span>
                                    </div>
                                    <span className="info-box-icon" style={{ transition: "0.5s" }}>
                                        <img src="../ui/Images/arrow-right.png" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div className="col card3">
                            <div className="py-3">
                                <div className="card1-info d-flex">
                                    <span className="info">Do you want to do it faster?</span>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <p>
                                    You can
                                    <a href="#" style={{ fontWeight: "bold" }}>
                                        contact
                                    </a>
                                    our team if you want to finish your assignment quickly.
                                </p>
                            </div>
                        </div>
                        {/*  */}
                    </div>
                    {/* Review */}
                    <div className="col-12 card5">
                        <div className="card">
                            <div className="card-body">
                                <div className="border-bottom row justify-content-between pending-order">
                                    <div className="col-8">
                                        <div
                                            className="info-box"
                                            style={{ border: "none", boxShadow: "none" }}
                                        >
                                            <div className="info-box-content">
                                                <span className="info-box-number">Service as Described</span>
                                                <span className="info-box-text">
                                                    Please give us a review, Your review should be about your
                                                    experience with the product.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div
                                            className="info-box"
                                            style={{ border: "none", boxShadow: "none" }}
                                        >
                                            <div className="info-box-content">
                                                <div className="rate">
                                                    <input
                                                        type="radio"
                                                        id="star5"
                                                        name="rate"
                                                        defaultValue={5}
                                                    />
                                                    <label htmlFor="star5" title="text" />
                                                    <input
                                                        type="radio"
                                                        id="star4"
                                                        name="rate"
                                                        defaultValue={4}
                                                    />
                                                    <label htmlFor="star4" title="text" />
                                                    <input
                                                        type="radio"
                                                        id="star3"
                                                        name="rate"
                                                        defaultValue={3}
                                                    />
                                                    <label htmlFor="star3" title="text" />
                                                    <input
                                                        type="radio"
                                                        id="star2"
                                                        name="rate"
                                                        defaultValue={2}
                                                    />
                                                    <label htmlFor="star2" title="text" />
                                                    <input
                                                        type="radio"
                                                        id="star1"
                                                        name="rate"
                                                        defaultValue={1}
                                                    />
                                                    <label htmlFor="star1" title="text" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-bottom row justify-content-between pending-order">
                                    <div className="col-8">
                                        <div
                                            className="info-box"
                                            style={{ border: "none", boxShadow: "none" }}
                                        >
                                            <div className="info-box-content">
                                                <span className="info-box-number">Communication with us</span>
                                                <span className="info-box-text">
                                                    Please give us a review, Your review should be about your
                                                    experience with the product.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div
                                            className="info-box"
                                            style={{ border: "none", boxShadow: "none" }}
                                        >
                                            <div className="info-box-content">
                                                <div className="rate">
                                                    <input
                                                        type="radio"
                                                        id="star6"
                                                        name="rate1"
                                                        defaultValue={5}
                                                    />
                                                    <label htmlFor="star6" title="text" />
                                                    <input
                                                        type="radio"
                                                        id="star7"
                                                        name="rate1"
                                                        defaultValue={4}
                                                    />
                                                    <label htmlFor="star7" title="text" />
                                                    <input
                                                        type="radio"
                                                        id="star8"
                                                        name="rate1"
                                                        defaultValue={3}
                                                    />
                                                    <label htmlFor="star8" title="text" />
                                                    <input
                                                        type="radio"
                                                        id="star9"
                                                        name="rate1"
                                                        defaultValue={2}
                                                    />
                                                    <label htmlFor="star9" title="text" />
                                                    <input
                                                        type="radio"
                                                        id="star10"
                                                        name="rate1"
                                                        defaultValue={1}
                                                    />
                                                    <label htmlFor="star10" title="text" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-bottom row justify-content-between pending-order">
                                    <div className="col-8">
                                        <div
                                            className="info-box"
                                            style={{ border: "none", boxShadow: "none" }}
                                        >
                                            <div className="info-box-content">
                                                <span className="info-box-number">
                                                    Buy again or Recommend
                                                </span>
                                                <span className="info-box-text">
                                                    Please give us a review, Your review should be about your
                                                    experience with the product.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div
                                            className="info-box"
                                            style={{ border: "none", boxShadow: "none" }}
                                        >
                                            <div className="info-box-content">
                                                <div className="rate">
                                                    <input
                                                        type="radio"
                                                        id="star15"
                                                        name="rate2"
                                                        defaultValue={5}
                                                    />
                                                    <label htmlFor="star15" title="text" />
                                                    <input
                                                        type="radio"
                                                        id="star14"
                                                        name="rate2"
                                                        defaultValue={4}
                                                    />
                                                    <label htmlFor="star14" title="text" />
                                                    <input
                                                        type="radio"
                                                        id="star13"
                                                        name="rate2"
                                                        defaultValue={3}
                                                    />
                                                    <label htmlFor="star13" title="text" />
                                                    <input
                                                        type="radio"
                                                        id="star12"
                                                        name="rate2"
                                                        defaultValue={2}
                                                    />
                                                    <label htmlFor="star12" title="text" />
                                                    <input
                                                        type="radio"
                                                        id="star11"
                                                        name="rate2"
                                                        defaultValue={1}
                                                    />
                                                    <label htmlFor="star11" title="text" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-3 input-g">
                                    <div className="col-12">
                                        <div className="row justify-content-between pending-order">
                                            <div className="col-12">
                                                <div
                                                    className="info-box"
                                                    style={{
                                                        alignItems: "center",
                                                        minHeight: 60,
                                                        background: "#f8f9fa"
                                                    }}
                                                >
                                                    <span
                                                        className="info-box-icon"
                                                        style={{
                                                            height: "fit-content",
                                                            borderRight: "1px solid #c8c8c8",
                                                            borderRadius: 0
                                                        }}
                                                    >
                                                        <img src="../ui/Images/Smile-group-24.png" />
                                                    </span>
                                                    <span
                                                        className="info-box-icon"
                                                        style={{
                                                            height: "fit-content",
                                                            borderRight: "1px solid #c8c8c8",
                                                            borderRadius: 0
                                                        }}
                                                    >
                                                        <img src="../ui/Images/icon-paperclip.png" />
                                                    </span>
                                                    <div className="ms-3 input-g">
                                                        <input
                                                            className="form-control"
                                                            style={{ border: "none" }}
                                                        />
                                                    </div>
                                                    <div className="info-box-icon download-triangle">
                                                        <img src="../ui/Images/download-tri.png" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="Order-status-footer">
                <div className="container">
                    <div className="footer">
                        <div className="row">
                            <div className="col confirm-ord">
                                <p>Do you want to confirm this order?</p>
                            </div>
                            <div className="col d-flex">
                                <button className="btn btn-outline-dark">Request Revisions</button>
                                <button className="btn btn-dark">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}