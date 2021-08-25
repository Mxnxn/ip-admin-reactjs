import React, { useState } from "react";
import { AlertOctagon } from "react-feather";
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
import { Link, useHistory, withRouter } from "react-router-dom";
import { User, Lock, Mail } from "react-feather";
import { LOGIN, REGISTER } from "Constants/Routes";
import { useSnackbar } from "notistack";
import { FiX } from "react-icons/fi";
import { registerAdmin } from "Authentication/repository/Authentication";

const Register = ({ setView }) => {
	const history = useHistory();

	const [name, setName] = React.useState({ firstName: "", lastName: "" });
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState({
		password: "",
		cpassword: "",
	});
	const [weak, setWeak] = React.useState(true);
	const [medium, setMedium] = React.useState(false);
	const [strong, setStrong] = React.useState(false);

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const Snackbar = async (head, variant, message) => {
		enqueueSnackbar(
			<div style={{ marginLeft: 12 }}>
				<div className="d-flex" style={{ height: 40, flexDirection: "column" }}>
					<div className="row">
						<span className="pp" style={{ textTransform: "capitalize" }}>
							{head}
						</span>
					</div>
					<div className="row">
						<span className="pp-l fs-12" style={{ color: "text.secondary" }}>
							{message}
						</span>
					</div>
				</div>
			</div>,
			{
				variant: variant,
				action: (key) => (
					<span onClick={() => closeSnackbar(key)} style={{ cursor: "pointer", color: "white" }}>
						<FiX style={{ height: 22, width: 22 }} />
					</span>
				),
			}
		);
	};

	function passwordCheck(e) {
		const re = new RegExp("^([a-zA-Z0-9@?!.*#]{8,15})$");
		const re1 = new RegExp("^([a-zA-Z0-9]{6,15})$");
		if (e.target.value.length < 7) {
			setMedium(false);
			setWeak(true);
			setStrong(false);
		}
		if (re.test(e.target.value)) {
			setStrong(true);
			setWeak(false);
			setMedium(false);
		}
		if (re1.test(e.target.value)) {
			setMedium(true);
			setWeak(false);
			setStrong(false);
		}
	}

	const [error, setError] = useState("");

	const onRegister = async () => {
		if (!name) return setError("Invalid name.");
		if (!email || !email.includes("@")) return setError("Invalid email.");
		if (!password.password || !password.cpassword) return setError("Invalid password.");
		if (password.length < 8) return setError("Min. 8 character password");

		try {
			const payload = {
				first_name: name.firstName,
				last_name: name.lastName,
				password: password.password,
				master_password: password.cpassword,
				email: email,
			};
			const response = await registerAdmin(payload);
			if (response.success) {
				Snackbar("Registration", "success", "Successful");
				setTimeout(() => {
					history.push("/auth/login");
				}, 2000);
			}
		} catch (error) {
			Snackbar("Registration", "error", "Something Went Wrong");
			console.log(error);
		}
	};

	return (
		<>
			<Col lg="5" md="8">
				<Card className="shadow border-0 mt--2">
					<CardBody className="px-lg-5 py-lg-5">
						<div className="text-left text-muted mb-4 geb">
							<span className="fs-48">{REGISTER.heading}</span>
						</div>
						{error ? (
							<div className="alert alert-danger">
								<AlertOctagon size="18" className="mr-2" style={{ verticalAlign: "sub" }} /> {error}
							</div>
						) : null}
						<Form role="form">
							<FormGroup className={error.includes("name") && " is-danger"}>
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<User size="18" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										className="nn"
										placeholder="First Name"
										type="text"
										value={name.firstName}
										onChange={(e) => setName({ ...name, firstName: e.target.value })}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className={error.includes("name") && " is-danger"}>
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<User size="18" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										className="nn"
										placeholder="Last Name"
										type="text"
										value={name.lastName}
										onChange={(e) => setName({ ...name, lastName: e.target.value })}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className={error.includes("email") ? "is-danger" : ""}>
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<Mail size="18" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										className="nn"
										placeholder="Email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										autoComplete="new-email"
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className={error.includes("password") || (error.includes("Password") && "is-danger")}>
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<Lock size="18" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										className="nn"
										placeholder="Password"
										type="password"
										value={password.password}
										onChange={(evt) => {
											setPassword({ ...password, password: evt.target.value });
											passwordCheck(evt);
										}}
										autoComplete="new-password"
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className={error.includes("password") || (error.includes("Password") && "is-danger")}>
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<Lock size="18" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										className="nn"
										placeholder="Master Password"
										type="password"
										value={password.cpassword}
										onChange={(evt) => {
											setPassword({ ...password, cpassword: evt.target.value });
											passwordCheck(evt);
										}}
										autoComplete="new-password"
									/>
								</InputGroup>
							</FormGroup>
							{password.length > 0 ? (
								<div className="text-muted font-italic">
									<small>
										password strength: {weak ? <span className="text-danger font-weight-700">Weak</span> : null}
										{medium ? <span className="text-primary font-weight-700">Medium</span> : null}
										{strong ? <span className="text-success font-weight-700">Strong</span> : null}
									</small>
								</div>
							) : null}

							<div className="text-left nn">
								<Button className="mt-4" color="primary" type="button" onClick={onRegister}>
									Create account
								</Button>
							</div>
						</Form>
					</CardBody>
				</Card>
				<Row className="mt-3">
					<Col xs="12">
						<Link to={LOGIN.path} className="text-primary cp">
							<small className="gl fs-18">Already have an Account?</small>
						</Link>
					</Col>
				</Row>
			</Col>
		</>
	);
};

export default withRouter(Register);
