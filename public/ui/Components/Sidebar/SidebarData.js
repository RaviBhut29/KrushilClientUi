import React from "react";
import { Briefcase, Grid, HelpCircle, Home, Settings } from "react-feather";

export const SidebarData = [
    {
        title: "Services",
        path: "/admin-services",
        icon: <Settings size={16} />,
        cName: "nav-text"
    },
    {
        title: "Categories",
        path: "/admin-categories",
        icon: <Grid size={16} />,
        cName: "nav-text"
    },
    {
        title: "Portfolio",
        path: "/admin-portfolio",
        icon: <Briefcase size={16} />,
        cName: "nav-text"
    },
    {
        title: "FAQ",
        path: "/admin-FAQ",
        icon: <HelpCircle size={16} />,
        cName: "nav-text"
    }
];
