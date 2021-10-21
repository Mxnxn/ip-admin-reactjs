import React from "react";
import { Row, Col, Button, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
const ConfirmModal = ({ modal, onCancelHandler, handleSubmit }) => {
    return (
        <Modal isOpen={modal} size="md">
            <ModalHeader className="bg" toggle={onCancelHandler} style={{ background: "#F1F6FF" }}>
                <span className="text fs-24 geb text-primary">Confirm</span>
            </ModalHeader>
            <ModalBody style={{ background: "#F1F6FF" }}>
                <Col>
                    <Row>
                        <h3 className=" pp">Are you sure?</h3>
                    </Row>
                </Col>
            </ModalBody>
            <ModalFooter style={{ background: "#F1F6FF" }}>
                <Button color="danger" onClick={onCancelHandler}>
                    No
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    Yes
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmModal;
