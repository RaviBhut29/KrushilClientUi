import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.scss";
import logoWhite from '../../Images/logo-white.svg';
import { LogOut } from "react-feather";
import { ApolloConsumer } from '@apollo/client';
import SignOut from "../../Functions/SignOut";

export default function Sidebar(props) {
    const navigate = useNavigate()
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className={"w-100"}>
            {/* All the icons now are white */}
            {/* <div className="navbar">
                <NavLink to="#" className="menu-bars">
                    <Menu size={16} onClick={showSidebar} />
                </NavLink>
            </div> */}
            {/* <nav className={sidebar ? "nav-menu active" : "nav-menu"}> */}
            <nav className="nav-menu active d-flex flex-column justify-content-between">
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <NavLink to="#" className="menu-bars">
                            <img src={logoWhite} alt="" style={{ width: "75%" }} />
                        </NavLink>
                    </li>

                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <NavLink to={item.path}>
                                    {item.icon}
                                    <span className="nav-item">{item.title}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                <div className="sidebar-footer d-flex justify-content-center cursor-pointer">
                    {/* <div></div> */}
                    <ApolloConsumer>
                        {(client) => (
                            <div className="logout-btn d-flex align-items-center justify-content-between" onClick={() => { SignOut(client, navigate) }}>
                                <LogOut size={22} color="#e71d7c" /> <div className="btn-text">Sign out</div>
                            </div>
                        )}
                    </ApolloConsumer>
                </div>
            </nav>
            <div className="ml-13 px-3 pt-2">
                {props?.children}
            </div>
        </div>
    );
}
