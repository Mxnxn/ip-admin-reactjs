import React from "react";
import { FormGroup, Form, Input, Row, Col, Container, Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

const ChangeALT = ({ modal, onCancelHandler, state, onChangeValue, handleSubmit }) => {
    return (
        <Modal isOpen={modal} size="lg" toggle={onCancelHandler}>
            <ModalHeader className="bg" toggle={onCancelHandler}>
                <span className="text fs-24 geb">Add Comment</span>
            </ModalHeader>
            <Container fluid>
                <Col>
                    <Form>
                        <Row>
                            <Col lg="12">
                                <FormGroup>
                                    <label className="form-control-label pp fs-12" htmlFor="input-name"></label>
                                    <Input
                                        className="nn form-control-alternative"
                                        value={state.text}
                                        name="clientName"
                                        placeholder="Name"
                                        onChange={onChangeValue}
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Container>
            <ModalFooter className="bg">
                <Button color="danger" className="fira" onClick={onCancelHandler}>
                    Cancel
                </Button>
                <Button className="fira" onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ChangeALT;
