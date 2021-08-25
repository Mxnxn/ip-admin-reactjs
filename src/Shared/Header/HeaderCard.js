import React from "react";
import { ArrowUp } from "react-feather";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
const HeaderCard = ({ Icon, text }) => {
	return (
		<Card className="card-stats mb-4 mb-xl-0 shadow" style={{ background: "#115ef6" }}>
			<CardBody className="card-bg">
				<Row>
					<div className="col">
						<CardTitle
							tag="h5"
							className="text-uppercase geb mb-1"
							style={{ letterSpacing: "1px", fontSize: "14px", color: "#fff" }}
						>
							{text}
						</CardTitle>
						<h2 className="geb mb-0" style={{ letterSpacing: "1px", color: "#fff" }}>
							0
						</h2>
					</div>
					<Col className="col-auto">
						<div
							style={{ background: "#F1F6FF !important" }}
							className="icon icon-shape  text-white rounded-circle shadow"
						>
							<Icon size="32" />
						</div>
					</Col>
				</Row>
				<p className="mt-3 mb-0 text-sm">
					<span className="text-success mr-2 gl">
						<ArrowUp size="17" style={{ verticalAlign: "text-bottom" }} /> 0
					</span>
					<span className="text-nowrap text-white font-weight-bold gl">added this month</span>
				</p>
			</CardBody>
		</Card>
	);
};

export default HeaderCard;
