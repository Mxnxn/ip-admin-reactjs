import React from "react";
import { Container, Row, Col, Card, CardHeader, Table, CardFooter } from "reactstrap";
import Header from "Shared/Header/Header";
import AdminFooter from "Shared/Footers/AdminFooter";
import { useEffect } from "react";
import { useState } from "react";
import HeadingWithSearch from "Shared/CardCustomizations/HeadingWithSearch";
import Loader from "Shared/Loader";

const UserList = () => {
    const [state, setState] = useState({
        users: [],
        dataFetched: true,
    });

    return state.dataFetched ? (
        <>
            <Header bg={"primary"} />
            <Container className=" pt-4" fluid>
                <Row>
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className={"bg-white"}>
                            <CardHeader className="bg-white border-0">
                                <HeadingWithSearch mainHeading={"Users"} subHeading={"Added"} btnName={"Add"} disableBtn={true} />
                            </CardHeader>
                            <Table className={"pp table-white table-hover table-flush"} responsive>
                                <thead className={"thead-light"}>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Email Verified</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Blocked</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </Table>
                            <CardFooter className={"bg-white"}>
                                <nav>
                                    <div className="col text-warning text-left ml--3">
                                        <span className="fira bg" style={{ fontSize: "14px" }}>
                                            Any kind of information
                                        </span>
                                    </div>
                                </nav>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <AdminFooter />
            </Container>
        </>
    ) : (
        <Loader />
    );
};

export default UserList;
