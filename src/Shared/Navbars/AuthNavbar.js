import { AUTH } from "Constants/Routes";
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { UncontrolledCollapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class AuthNavbar extends React.Component {
	render() {
		return (
			<>
				<Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
					<Container className="px-4">
						<NavbarBrand to={AUTH.path} tag={Link}>
							LOGO
						</NavbarBrand>
						<button className="navbar-toggler" id="navbar-collapse-main">
							<span className="navbar-toggler-icon" />
						</button>
						<UncontrolledCollapse navbar toggler="#navbar-collapse-main">
							<div className="navbar-collapse-header d-md-none">
								<Row>
									<Col className="collapse-brand" xs="6">
										<Link to={AUTH.path}>LOGO</Link>
									</Col>
									<Col className="collapse-close" xs="6">
										<button className="navbar-toggler" id="navbar-collapse-main">
											<span />
											<span />
										</button>
									</Col>
								</Row>
							</div>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink className="nav-link-icon" to="/" tag={Link}>
										<i className="ni ni-send" />
										<span className="nav-link-inner--text">Home</span>
									</NavLink>
								</NavItem>
							</Nav>
						</UncontrolledCollapse>
					</Container>
				</Navbar>
			</>
		);
	}
}

export default AuthNavbar;
