import { DASHBOARD, CATEGORY, BRAND, PRODUCT, BLOG, USER, TAX, COUPON, BANNER, VARIATIONS, ORDER } from "Constants/Routes";
import React from "react";
import { Bell } from "react-feather";
/* eslint-disable */
import { Link, useLocation } from "react-router-dom";
// nodejs library to set properties for components
// reactstrap components
import { Collapse, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Media, Navbar, Nav, Container, Row, Col } from "reactstrap";
import Divider from "Shared/Divider";
import SidebarLink from "Shared/Sidebar/SidebarLink";

const Sidebar = ({ togglePanel }) => {
    const [collapseOpen, setCollapseOpen] = React.useState(false);

    const toggleCollapse = () => {
        setCollapseOpen(!collapseOpen);
    };
    // closes the collapse
    const closeCollapse = () => {
        setCollapseOpen(false);
    };

    const currentPath = (path) => {
        const { pathname } = useLocation();
        const pths = "/" + pathname.split("/")[1] + "/" + pathname.split("/")[2];
        return pths === path ? true : false;
    };
    // creates the links that appear in the left menu / Sidebar

    return (
        <Navbar className={`navbar-vertical fixed-left navbar-light bg-default`} style={{ zIndex: 1000000 }} expand="md" id="sidenav-main">
            <Container fluid>
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                    <span className="navbar-toggler-icon" />
                </button>
                <Link to="/" className="pt-0">
                    LOGO
                </Link>

                <Nav className="align-items-center d-md-none ml-auto">
                    <UncontrolledDropdown nav>
                        <DropdownToggle nav>
                            <Media className="align-items-center">
                                <span className="avatar avatar-sm rounded-circle bg-danger" onClick={togglePanel}>
                                    <Bell size="12" />
                                </span>
                            </Media>
                        </DropdownToggle>
                    </UncontrolledDropdown>
                </Nav>
                <Nav className="align-items-center d-md-none">
                    <UncontrolledDropdown nav>
                        <DropdownToggle nav>
                            <Media className="align-items-center">
                                <span className="avatar avatar-sm rounded-circle">DP</span>
                            </Media>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem href="#pablo">
                                <i className="ni ni-user-run" />
                                <span>Logout</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <Collapse navbar isOpen={collapseOpen} toggle={toggleCollapse}>
                    <div className="navbar-collapse-header d-md-none">
                        <Row>
                            <Col className="collapse-close" xs="7">
                                <button className="navbar-toggler" onClick={closeCollapse}>
                                    <span />
                                    <span />
                                </button>
                            </Col>
                        </Row>
                    </div>
                    <h6 className="navbar-heading text-muted geb" style={{ letterSpacing: "1.5px", fontSize: "14px" }}>
                        Features
                    </h6>
                    <Nav className="mb-md-3" navbar>
                        <SidebarLink Icon={DASHBOARD.icon} text={DASHBOARD.heading} isActive={currentPath(DASHBOARD.path)} url={DASHBOARD.path + "/1"} />
                        <SidebarLink Icon={USER.icon} text={USER.heading} isActive={currentPath(USER.path)} url={USER.path} />
                    </Nav>
                    <Divider />
                    <h6 className="navbar-heading text-muted" style={{ letterSpacing: "1.5px", fontSize: "14px" }}>
                        More
                    </h6>
                    <Nav className="mb-md-3" navbar>
                        <SidebarLink Icon={USER.icon} text={USER.heading} isActive={currentPath(USER.path)} url={USER.path} />
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

export default Sidebar;
