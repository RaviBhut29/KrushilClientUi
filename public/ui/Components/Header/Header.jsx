import React, { useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input } from 'reactstrap';
import logo from '../../Images/logo.svg';
import search from '../../Images/search.svg';
import mail from '../../Images/mail.svg';
import bell from '../../Images/bell.svg';
import world from '../../Images/world.svg';
import userImage from '../../Images/userImage.png'
import './Header.scss';
import { useState } from 'react';
import { Clipboard, FileText, LogOut, Settings, User } from 'react-feather';
import SignOut from '../../Functions/SignOut';
import { ApolloConsumer } from '@apollo/client';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
const Header = () => {

    const location = useLocation();

    const token = useMemo(() => localStorage?.getItem("token"))
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate()
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    return (
        <div className='main-header container'>
            <div className='d-flex align-items-center pb-3'>
                <div className="logo">
                    <img src={logo} alt="main logo" />
                </div>
                <div className='d-flex ms-auto align-items-center'>
                    <div className="menu">
                        <ul className='navigation'>
                            <li> <Link to="/" >Home</Link> </li>
                            <li> <Link to="/portfolio">Portfolio</Link> </li>
                            <li> <Link to="/services" className='service-nav'>Services
                                <div className="services">

                                    <div className='first'>
                                        <Link to="#"> Logo Design</Link>
                                        <Link to="#"> Brand Identity</Link>
                                        <Link to="#"> Label design</Link>
                                        <Link to="#"> Stationery Design</Link>
                                        <Link to="#"> Social media</Link>
                                    </div>
                                    <div className='second'>
                                        <Link to="#"> Business Card Design</Link>
                                        <Link to="#"> Products Packaging Design</Link>
                                        <Link to="#"> Banner/Hoardings/Billboard</Link>
                                        <Link to="#"> Brochure/catalogue/Flayr</Link>
                                        <Link to="#"> WordPress Website Development</Link>
                                    </div>


                                </div>
                            </Link> </li>
                            <li> <Link to="/services">How it work</Link> </li>
                            <li> <Link to="/services">About Flyses</Link> </li>
                        </ul>
                    </div>
                    <div className="search">
                        <img src={search} alt="Search icon" />
                        <Input placeholder='Search' />
                    </div>
                    <div className="notifications d-flex justify-content-center align-items-center">
                        <div className="general-notification">
                            <span className='badge-yellow'></span>
                            <img src={bell} alt="bell" />
                        </div>
                        <div className="mail-notification">
                            <span className='badge-green'></span>
                            <img src={mail} alt="mail" />
                        </div>
                        <div className="language">
                            <img src={world} alt="world" />
                        </div>
                        {/* {
                            token && */}
                            <div className="userProfile">
                                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={"down"}>
                                    <DropdownToggle className='userDropdown'><img src={userImage} alt="userProfile" /></DropdownToggle>
                                    <DropdownMenu>
                                        <Link to="/user-profile"><DropdownItem><User />Profile</DropdownItem></Link>
                                        <DropdownItem><FileText /> Orders</DropdownItem>
                                        <DropdownItem><Settings /> Settings </DropdownItem>
                                        <DropdownItem><Clipboard /> Billing </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>English</DropdownItem>
                                        <DropdownItem>INR</DropdownItem>
                                        <DropdownItem>Help and Support</DropdownItem>
                                        <DropdownItem divider />
                                        <ApolloConsumer>
                                            {(client) => (
                                                <DropdownItem onClick={() => { SignOut(client, navigate) }}>
                                                    <LogOut />Log Out
                                                </DropdownItem>
                                            )}
                                        </ApolloConsumer>

                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        {/* } */}
                    </div>
                    {1 === 2 && <div className="login-btn"><Link to="/login" style={{ color: "white" }}> <Button color='secondary' className='w-100'>Login</Button></Link></div>}

                </div>
            </div>
            {location?.pathname !== '/' && <BreadCrumb />}
        </div>
    )
}

export default Header