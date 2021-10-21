import React from "react";
import { DASHBOARD } from "Constants/Routes";
import { Route, Redirect } from "react-router-dom";

const ReverseAuthRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (window.localStorage.getItem("_b") && window.localStorage.getItem("_uid") && window.localStorage.getItem("_c")) {
                    return <Redirect to={DASHBOARD.path} />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );
};

export default ReverseAuthRoute;
