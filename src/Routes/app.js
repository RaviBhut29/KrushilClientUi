import { Category } from "../Pages/Category/Category.jsx";
import { Home } from "../Pages/Home/Home.jsx";
import Login from "../Pages/Login/Login.jsx";
import Register from "../Pages/Register/Register.jsx";
import ResetPassword from "../Pages/ResetPassword/ResetPassword.jsx";
import { Product } from "../Pages/Product/Product.jsx";
import Portfolio from "../Pages/Portfolio/Portfolio.jsx";
import { Services } from "../Pages/Services/Service.jsx";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword.jsx";
import { Chat } from "../Pages/Chat/Chat.jsx";
import PlanPackages from "../Pages/PlanPackages/PlanPackages.jsx";
import { User_Profile } from "../Pages/User_Profile/User_Profile.jsx";
import Order from "../Pages/Order/Order.jsx";
import { Requirement } from "../Pages/Requirement/Requirement.jsx";
import { About } from "../Pages/About/About.jsx";
import { HowItWork } from "../Pages/HowItWork/HowItWork.jsx";

const RoutesArray = [
  {
    path: "/",
    component: Home,
    exact: true,
    footer: true,
    type: "user",
  },
  {
    path: "/home",
    component: Home,
    exact: true,
    footer: true,
    type: "user",
  },
  {
    path: "/services",
    component: Services,
    exact: true,
    footer: true,
    type: "user",
  },
  {
    path: "/services/*",
    component: Services,
    exact: true,
    footer: true,
    type: "user",
  },
  {
    path: "/category",
    component: Category,
    exact: true,
    footer: true,
    type: "user",
  },
  {
    path: "/about",
    component: About,
    exact: true,
    footer: true,
    type: "user",
  },
  {
    path: "/howitwork",
    component: HowItWork,
    exact: true,
    footer: true,
    type: "user",
  },
  {
    path: "/category/*",
    component: Category,
    exact: true,
    footer: true,
    type: "user",
  },
  {
    path: "/order/*",
    component: Order,
    exact: true,
    footer: true,
    type: "user",
  },
  {
    path: "/requirement/*",
    component: Requirement,
    exact: true,
    footer: true,
    type: "user",
  },
  {
    path: "/product/*",
    component: Product,
    exact: true,
    footer: true,
    type: "user",
  },
  {
    path: "/portfolio",
    component: Portfolio,
    exact: true,
    footer: true,
    type: "user",
  },
  {
    path: "/login",
    component: Login,
    exact: true,
    footer: true,
    type: "authentication",
  },
  {
    path: "/register",
    component: Register,
    exact: true,
    footer: true,
    type: "authentication",
  },
  {
    path: "/forgotpassword",
    component: ForgotPassword,
    exact: true,
    footer: true,
    type: "authentication",
  },
  {
    path: "/chat",
    component: Chat,
    exact: true,
    footer: true,
    type: "authentication",
  },
  {
    path: "/planPackages",
    component: PlanPackages,
    exact: true,
    footer: true,
    type: "user",
  },
  {
    path: "/profile",
    component: User_Profile,
    exact: true,
    footer: true,
    type: "user",
  },
];

export default RoutesArray;
