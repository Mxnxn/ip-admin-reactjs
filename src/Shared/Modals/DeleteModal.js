import React from "react";
import { Row, Col, Button, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
const DeleteModal = ({ modal, modalHead, onCancelHandler }) => {
	return (
		<Modal isOpen={modal} size="lg">
			<ModalHeader className="bg" toggle={onCancelHandler} style={{ background: "#F1F6FF" }}>
				<span className="text fs-24 geb text-primary">Delete {modalHead}</span>
			</ModalHeader>
			<ModalBody style={{ background: "#F1F6FF" }}>
				<Col>
					<Row>
						<h4 className=" pp">Are you sure?</h4>
					</Row>
				</Col>
			</ModalBody>
			<ModalFooter style={{ background: "#F1F6FF" }}>
				<Button color="danger">Delete</Button>
			</ModalFooter>
		</Modal>
	);
};

export default DeleteModal;
