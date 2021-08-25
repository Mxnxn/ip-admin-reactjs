import React from "react";

import { Row, Col } from "reactstrap";

class Footer extends React.Component {
	constructor(props) {
		super();
		this.props = props;
	}
	render() {
		return (
			<footer className={"footer"} style={{ color: "#115ef6" }}>
				<Row className={"align-items-center  justify-content-xl-between"}>
					<Col xl="6">
						<div className="copyright text-center text-xl-left ">
							© 2021{" "}
							<a className={"font-weight-bold  ml-1 "} href="/#" rel="noopener noreferrer" target="_blank">
								VDOXON
							</a>
						</div>
					</Col>
				</Row>
			</footer>
		);
	}
}

export default Footer;
