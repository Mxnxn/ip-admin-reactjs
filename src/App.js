import React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { ADMIN, AUTH } from "Constants/Routes";
import AdminWithSidenav from "Layouts/AdminWithSidenav";
import Authentication from "Layouts/Authentication";
import NotificationProvider from "Shared/Notification/NotificationProvider";
import AuthRoute from "Shared/AuthRoute";
import ReverseAuthRoute from "Shared/ReverseAuthRoute";

const App = (props) => {
    return (
        <BrowserRouter basename="/">
            <NotificationProvider>
                <ReverseAuthRoute path={AUTH.path} component={Authentication} />
                <AuthRoute path={ADMIN.path} component={AdminWithSidenav} />
                <Route path="/" exact render={() => <Redirect to={ADMIN.path} />} />
            </NotificationProvider>
        </BrowserRouter>
    );
};

export default App;
