import React from "react";
import { Row } from "reactstrap";

const CardHeading = ({ editMode, mainHeading, subHeading }) => {
	return (
		<Row className="align-items-center geb">
			<div className="col">
				<h6 className="text-uppercase text-muted ls-1 mb-1">{subHeading}</h6>
				<h2
					className={"text-default mb-0 geb fs-24"}
					style={{
						textTransform: "uppercase",
						letterSpacing: "1px",
						color: editMode ? "#fb6340" : "#115EF6",
					}}
				>
					{mainHeading}
				</h2>
			</div>
		</Row>
	);
};

export default CardHeading;
