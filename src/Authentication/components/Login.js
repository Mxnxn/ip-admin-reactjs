import React, { useState } from "react";
import { Button, Card, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from "reactstrap";
import { Mail, Lock, AlertOctagon } from "react-feather";
import { Link } from "react-router-dom";
import { FORGOT, LOGIN, REGISTER } from "Constants/Routes";
import { LoginAdmin } from "../repository/Authentication";
import { useHistory } from "react-router-dom";
import { Loader } from "Shared/Loader/Loader";

const Login = ({ setView }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    let history = useHistory();

    const login = async () => {
        if (!email || !email.includes("@")) return setError("Invalid email.");
        if (!password) return setError("Invalid password.");
        setLoading(true);
        try {
            const response = await LoginAdmin({ email, password });
            if (response.status) {
                localStorage.setItem("_b", response.message.token);
                localStorage.setItem("_c", response.message.email);
                localStorage.setItem("_uid", response.message.uid);
                window.location.reload();
            } else {
                setError(response.data);
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <>
            {!loading && (
                <Col lg="5" md="7">
                    <Card className="bg-white shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-left text-muted mb-4 geb">
                                <span className="fs-48">{LOGIN.heading}</span>
                            </div>
                            {error ? (
                                <div className="alert alert-danger">
                                    <AlertOctagon size="18" className="mr-2" style={{ verticalAlign: "sub" }} /> {error}
                                </div>
                            ) : null}
                            <Form role="form" onSubmit={(e) => e.preventDefault() && false}>
                                <FormGroup className={error.includes("email") || error.includes("credential") || error.includes("Email") ? "is-danger" : ""}>
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
                                <FormGroup className={error.includes("password") || error.includes("credential") ? " is-danger" : ""}>
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
                                            autoComplete="new-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </InputGroup>
                                </FormGroup>

                                <div className="text-left">
                                    <Button className="my-2 nn" color="primary" type="button" onClick={login}>
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                    <Row className="mt-3">
                        <Col xs="6">
                            <Link to={FORGOT.path} className="text-primary cp">
                                <small className="gl fs-18">Forgot Password?</small>
                            </Link>
                        </Col>
                        <Col className="text-right" xs="6">
                            <Link to={REGISTER.path} className="text-primary cp">
                                <small className="gl fs-18">Create new account</small>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            )}
            {loading && <Loader />}
        </>
    );
};
export default Login;
