import { Home, Star, Tool, Users } from "react-feather";
import { AiOutlinePicture } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { CgArrowsExchange } from "react-icons/cg";
import { HiOutlineTruck } from "react-icons/hi";
export const ADMIN = {
    heading: "Admin",
    path: "/admin",
    icon: Users,
    id: 3,
};

export const DASHBOARD = {
    heading: "Dashboard",
    path: ADMIN.path + "/dashboard",
    icon: Home,
    id: 1,
};

export const USER = {
    heading: "Users",
    path: ADMIN.path + "/users",
    icon: Users,
    id: 7,
};

export const AUTH = {
    heading: "Authentication",
    path: "/auth",
    id: 6,
};

export const LOGIN = {
    heading: "Login",
    path: AUTH.path + "/login",
    id: 7,
};
export const FORGOT = {
    heading: "Forgot Password",
    path: AUTH.path + "/forgotpassword",
    id: 7,
};
export const REGISTER = {
    heading: "Register",
    path: AUTH.path + "/register",
    id: 8,
};

export const AUTHROUTES = {
    "/auth/login": LOGIN,
    "/auth/register": REGISTER,
    "/auth/forgotpassword": FORGOT,
};

export const ALLROUTES = {
    "/admin": ADMIN,
    "/admin/dashboard": DASHBOARD,
    "/admin/users": USER,
};
