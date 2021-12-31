import { Home, Users } from "react-feather";
import { BiOutline, BiTransferAlt } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";

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
    id: 2,
};

export const CATEGORY = {
    heading: "Category",
    path: ADMIN.path + "/category",
    icon: BiOutline,
    id: 3,
};

export const BALANCEREQUEST = {
    heading: "Balance Requests",
    path: ADMIN.path + "/recentrequests",
    icon: BiTransferAlt,
    id: 4,
};

export const PRODUCT = {
    heading: "Products",
    path: ADMIN.path + "/products",
    icon: FiPackage,
    id: 5,
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
    "/admin/category": CATEGORY,
    "/admin/recentrequests": BALANCEREQUEST,
    "/admin/products": PRODUCT,
};
