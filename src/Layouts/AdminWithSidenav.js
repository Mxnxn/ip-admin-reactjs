import { ADMIN, ALLROUTES, BANNER, BLOG, BRAND, CATEGORY, COUPON, DASHBOARD, ORDER, PRODUCT, TAX, USER, VARIATIONS } from "Constants/Routes";
import Dashboard from "Dashboard/components/Dashboard";

import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import AdminNavbar from "Shared/Navbars/AdminNavbar";
import Sidebar from "Shared/Sidebar/Sidebar";

import UserList from "User/components/UserList";

const AdminWithSidenav = (props) => {
    const { pathname } = useLocation();
    const [panelFlag, setPanel] = useState(false);

    const getActiveTabName = () => {
        try {
            if (!ALLROUTES[pathname]) {
                const route = ADMIN.path + "/" + pathname.split("/")[2];
                return ALLROUTES[route].heading;
            }
            return ALLROUTES[pathname].heading;
        } catch (error) {
            return "Error getting";
        }
    };

    const togglePanel = () => {
        setPanel((prev) => !prev);
    };

    return (
        <>
            <Sidebar togglePanel={togglePanel} />
            <div className="main-content bg-white" style={{ minHeight: "100vh", overflowX: "hidden" }}>
                <AdminNavbar activeTabName={getActiveTabName()} panel={panelFlag} togglePanel={togglePanel} />
                <Route path="/admin" exact render={() => <Redirect to={DASHBOARD.path} />} />
                <Route path={DASHBOARD.path} exact component={Dashboard} />

                {/* user */}
                <Route path={USER.path} exact render={() => <UserList />} />
            </div>
        </>
    );
};

export default AdminWithSidenav;
