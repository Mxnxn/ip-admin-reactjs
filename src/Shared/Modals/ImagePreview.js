import React from "react";
import { Row, Col, Button, Modal, ModalHeader, ModalFooter, ModalBody, Card } from "reactstrap";
const ImagePreview = ({ modal, imageSrc, onCancelHandler }) => {
    return (
        <Modal isOpen={modal} size="md">
            <ModalHeader className="bg" toggle={onCancelHandler} style={{ background: "#F1F6FF" }}>
                <span className="text fs-24 geb text-primary">Preview</span>
            </ModalHeader>
            <ModalBody style={{ background: "#F1F6FF" }}>
                <Row>
                    <Col md="2"></Col>
                    <Col md="8">
                        <Card>
                            <img src={process.env.REACT_APP_API_URL + "/" + imageSrc} alt="bussinessproof" />
                        </Card>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter style={{ background: "#F1F6FF" }}>
                <Button onClick={onCancelHandler} color="primary">
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ImagePreview;
