import React from "react";
import { X } from "react-feather";
import { Card, CardBody, CardHeader, Row } from "reactstrap";

const PanelCard = ({ title, body }) => {
	return (
		<Card className="mt-2">
			<CardHeader>
				<Row className="align-items-center geb">
					<div className="col">
						<h4
							className={"text-default mb-0 geb fs-14"}
							style={{
								textTransform: "uppercase",
								letterSpacing: "1px",
							}}
						>
							{title}
						</h4>
					</div>
					<span>
						<button className="btn btn-sm btn-danger">
							<X size="16" />
						</button>
					</span>
				</Row>
			</CardHeader>
			<CardBody>
				<div className="px-1">
					<p>{body}</p>
				</div>
			</CardBody>
		</Card>
	);
};

export default PanelCard;
