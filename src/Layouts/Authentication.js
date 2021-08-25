import Login from "Authentication/components/Login";
import Register from "Authentication/components/Register";
import AuthNavbar from "Shared/Navbars/AuthNavbar";
import { AUTH, FORGOT, LOGIN, REGISTER } from "Constants/Routes";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Container, Row } from "reactstrap";
import ForgotPassword from "Authentication/components/ForgotPassword";

const Authentication = () => {
	return (
		<div style={{ height: "100vh" }}>
			<div className="main-content h-100  d-flex align-items-center">
				<AuthNavbar />
				<div className="header"></div>
				<Container className="">
					<Row className="justify-content-center">
						<Route path={AUTH.path} exact render={() => <Redirect to={LOGIN.path} />} />
						<Switch>
							<Route path={LOGIN.path} render={() => <Login />} />
							<Route path={REGISTER.path} render={() => <Register />} />
							<Route path={FORGOT.path} render={() => <ForgotPassword />} />
						</Switch>
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default Authentication;
