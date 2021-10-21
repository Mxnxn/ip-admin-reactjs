import React from "react";
import { useHistory, withRouter } from "react-router-dom";
// reactstrap components
import { DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Navbar, Nav, Container, Media } from "reactstrap";
import { Bell, LogOut, Settings } from "react-feather";
import Divider from "Shared/Divider";
import Panel from "Shared/Notification/Panel";
import { HiOutlineMail } from "react-icons/hi";
const AdminNavbar = ({ activeTabName, togglePanel, panel }) => {
    let history = useHistory();
    return (
        <>
            <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                <Container fluid>
                    <span className="h4 mb-0 text-default geb text-uppercase d-none d-lg-inline-block" style={{ letterSpacing: "1px" }}>
                        {activeTabName}
                    </span>
                    {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form> */}
                    <Nav className="align-items-center  d-none d-md-flex ml-auto" navbar>
                        <UncontrolledDropdown nav>
                            <Media className="align-items-center">
                                <span onClick={togglePanel} className="avatar avatar-sm rounded-circle bg-danger" style={{ cursor: "pointer" }}>
                                    {/* <img alt="..." src={props.url} /> */}
                                    <Bell size="14" />
                                </span>
                            </Media>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav className="align-items-center d-none d-md-flex" navbar>
                        <UncontrolledDropdown nav>
                            <DropdownToggle className="pr-0" nav>
                                <Media className="align-items-center">
                                    <span className="avatar avatar-sm rounded-circle">{/* <img alt="..." src={props.url} /> */}MG</span>
                                </Media>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" id="dropdownmenu-dp" right>
                                <DropdownItem>
                                    <HiOutlineMail size="18" />
                                    <span className="mb-0 fs-12 fira ">{window.localStorage.getItem("_c")}</span>
                                </DropdownItem>

                                <DropdownItem>
                                    <Settings size="18" />
                                    <span className="mb-0 fs-12 fira ">Preferences</span>
                                </DropdownItem>
                                <Divider />
                                <DropdownItem
                                    onClick={async (e) => {
                                        history.push("/auth");
                                        window.localStorage.removeItem("_b");
                                        window.localStorage.removeItem("_c");
                                        window.localStorage.removeItem("_uid");
                                    }}
                                >
                                    <LogOut size="18" />
                                    <span className="fira">Logout</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Panel panel={panel} togglePanel={togglePanel} />
                </Container>
            </Navbar>
        </>
    );
};

export default withRouter(AdminNavbar);
