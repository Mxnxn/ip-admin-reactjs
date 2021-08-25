import { LOGIN } from "Constants/Routes";
import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (window.localStorage.getItem("token")) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to={LOGIN.path} />;
                }
            }}
        />
    );
};
export default AuthRoute;
