import React from "react";
import { HashLoader } from "react-spinners";
import { Col, Row } from "reactstrap";

const Loader = (props) => {
    return (
        <Row>
            <Col md="12" sm="12">
                <div className="d-flex justify-content-center" style={{ marginTop: 256 }}>
                    <HashLoader color={"#115EF6"} loading={true} size={70} />
                </div>
            </Col>
        </Row>
    );
};

export default Loader;
