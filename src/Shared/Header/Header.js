import React from "react";

const Header = ({ bg }) => {
    return (
        <div className={bg === "primary" ? "header  pt-5 pt-md-8" : "header pb-8 pt-5 pt-md-8"}>
            {/* <Container fluid>
                <div className="header-body">
                    <Row>
                        <Col lg="6" xl="3">
                            <HeaderCard Icon={Users} text={"UserStats1"} />
                        </Col>
                        <Col lg="6" xl="3">
                            <HeaderCard Icon={Users} text={"UserStats2"} />
                        </Col>
                    </Row>
                </div>
            </Container> */}
        </div>
    );
};

export default Header;
