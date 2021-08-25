import React, { useState } from "react";
import {
	Button,
	Card,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Col,
} from "reactstrap";
import { Mail, AlertOctagon } from "react-feather";
import { Link } from "react-router-dom";
import { FORGOT, LOGIN, REGISTER } from "Constants/Routes";
const ForgotPassword = ({ setView }) => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const login = async () => {
		if (!email || !email.includes("@")) return setError("Invalid email.");
	};

	return (
		<>
			<Col lg="5" md="7">
				<Card className=" shadow border-0">
					<CardBody className="px-lg-5 py-lg-5">
						<div className="text-left text-muted mb-4 geb">
							<span style={{ fontSize: 42 }}>{FORGOT.heading}</span>
						</div>
						{error ? (
							<div className="alert alert-danger">
								<AlertOctagon size="18" className="mr-2" style={{ verticalAlign: "sub" }} /> {error}
							</div>
						) : null}
						<Form role="form" onSubmit={(e) => e.preventDefault() && false}>
							<FormGroup
								className={
									error.includes("email") || error.includes("credential") || error.includes("Email")
										? "mb-3 is-danger"
										: "mb-3"
								}
							>
								<InputGroup className="input-group-alternative ">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<Mail size="18" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										className="nn "
										placeholder="Email"
										type="email"
										autoComplete="new-email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</InputGroup>
							</FormGroup>

							<div className="text-left">
								<Button className="my-4 nn" color="primary" type="button" onClick={login}>
									Send
								</Button>
							</div>
						</Form>
					</CardBody>
				</Card>
				<Row className="mt-3">
					<Col xs="6">
						<Link to={LOGIN.path} className="text-primary cp">
							<small className="gl fs-18">Login</small>
						</Link>
					</Col>
					<Col className="text-right" xs="6">
						<Link to={REGISTER.path} className="text-primary cp">
							<small className="gl fs-18">Create new account</small>
						</Link>
					</Col>
				</Row>
			</Col>
		</>
	);
};
export default ForgotPassword;
