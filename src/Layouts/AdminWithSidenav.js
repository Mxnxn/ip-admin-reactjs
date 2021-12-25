import { ADMIN, ALLROUTES, BALANCEREQUEST, CATEGORY, DASHBOARD, PRODUCT, USER } from "Constants/Routes";
import Dashboard from "Dashboard/components/Dashboard";

import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import AdminNavbar from "Shared/Navbars/AdminNavbar";
import Sidebar from "Shared/Sidebar/Sidebar";
import AdminFooter from "Shared/Footers/AdminFooter";
import UserList from "User/components/UserList";
import Header from "Shared/Header/Header";
import { Container } from "reactstrap";
import UserDetail from "User/components/UserDetail";
import CategoryList from "Category/Components/CategoryList";
import BalanceHistoryList from "BalanceRequest/components/BalanceHistoryList";
import ProductList from "Product/components/ProductList";
import AddProduct from "Product/components/AddProduct";
import EditProduct from "Product/components/EditProduct";
import EditImageProduct from "Product/components/EditImageProduct";
import AddVariant from "Product/components/AddVariant";

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
                <Header bg={"primary"} />
                <Container className="" fluid>
                    <Route path="/admin" exact render={() => <Redirect to={DASHBOARD.path} />} />
                    <Route path={DASHBOARD.path} exact component={Dashboard} />

                    {/* user */}
                    <Route path={USER.path} exact render={() => <UserList />} />
                    <Route path={USER.path + "/:uid"} exact render={() => <UserDetail />} />

                    {/* Category */}
                    <Route path={CATEGORY.path} exact render={() => <CategoryList />} />

                    {/* BALANCE REQUESTS */}
                    <Route path={BALANCEREQUEST.path + "/:page"} exact render={() => <BalanceHistoryList />} />

                    {/* BALANCE REQUESTS */}
                    <Route path={PRODUCT.path} exact render={() => <ProductList />} />
                    <Route path={PRODUCT.path + "/add"} exact render={() => <AddProduct />} />
                    <Route path={PRODUCT.path + "/add/:pid/variant"} exact render={() => <AddVariant />} />
                    <Route path={PRODUCT.path + "/edit/:id"} exact render={() => <EditProduct />} />
                    <Route path={PRODUCT.path + "/edit/images/:id"} exact render={() => <EditImageProduct />} />

                    <AdminFooter />
                </Container>
            </div>
        </>
    );
};

export default AdminWithSidenav;
