import React from "react";

import { PRODUCT } from "Constants/Routes";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Row } from "reactstrap";
import { ArrowLeft } from "react-feather";
import HeadingWithSearch from "Shared/CardCustomizations/HeadingWithSearch";
import { IoAddSharp } from "react-icons/io5";
import { AddProductVariant } from "Product/repository/Product";
import Snackbar from "Shared/Notification/Snackbar";
const AddVariant = (props) => {
    const { pid } = useParams("pid");
    const mSnackbar = Snackbar();

    const addRawVariant = {
        value: {
            index: 0,
            pid: pid,
            name: "",
            price: "",
            numericPrice: 0,
            details: "",
        },
        validation: {
            details: false,
            price: false,
        },
    };

    const [variants, setVariant] = useState([addRawVariant]);

    const handleSubmit = async () => {
        if (variants.length < 1) {
            return mSnackbar({ variant: "danger", head: "Invalid Variant", message: "Add Atleast 1 Variant to Save" });
        }
        const arr = variants.map((el) => ({
            pid: pid,
            price: el.value.price,
            numericPrice: el.value.numericPrice,
            name: el.value.name,
            details: el.value.details,
        }));
        console.log(arr);
        const formData = new FormData();
        arr.forEach((el, idx) => formData.set(`variant[${idx}]`, JSON.stringify(el)));
        const response = await AddProductVariant(formData);
        if (response.code !== 200) return mSnackbar({ variant: "danger", head: "Invalid Variant", message: response.message[0] });
        mSnackbar({ variant: "success", head: "Successfully", message: response.message[0] });
        return window.location.replace(PRODUCT.path);
    };

    return (
        <>
            <Row className="">
                <Col lg="3">
                    <Link to={PRODUCT.path} className="btn-primary btn text-center pp fs-16">
                        <ArrowLeft size="16" style={{ verticalAlign: "inherit" }} /> Back
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col className="mb-5 mb-xl-0 pt-3" xl="12">
                    <Card className={" "} style={{ background: "#F1F6FF", boxShadow: "1px 1px 20px -8px #B6C1F4" }}>
                        <CardHeader className=" border-0" style={{ background: "#F1F6FF" }}>
                            <HeadingWithSearch mainHeading={"Product Variant"} subHeading={"Add"} disableBtn={true} />
                        </CardHeader>
                        <CardBody className=" border-0">
                            <Form>
                                {variants.map((variant, idex) => (
                                    <Row className="mt-2">
                                        <Col lg="4" sm="12">
                                            <FormGroup>
                                                <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                    Name<span className="text-danger">*</span>
                                                </label>
                                                <Input
                                                    value={variant.value.name}
                                                    onChange={(evt) => {
                                                        const temp = [...variants];
                                                        const idx = temp.findIndex((el) => el.value.index === idex);
                                                        temp[idx].value.name = evt.target.value;
                                                        setVariant([...temp]);
                                                    }}
                                                    className={`nn form-control ${variant.validation.name && "is-invalid"}`}
                                                    placeholder="Variant Of This Product"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4" sm="12">
                                            <FormGroup>
                                                <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                    Detail<span className="text-danger">*</span>
                                                </label>
                                                <Input
                                                    value={variant.value.details}
                                                    onChange={(evt) => {
                                                        const temp = [...variants];
                                                        const idx = temp.findIndex((el) => el.value.index === idex);
                                                        temp[idx].value.details = evt.target.value;
                                                        setVariant([...temp]);
                                                    }}
                                                    className={`nn form-control ${variant.validation.details && "is-invalid"}`}
                                                    placeholder="Variant Of This Product"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4" sm="12">
                                            <FormGroup>
                                                <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                    Display Price<span className="text-danger">*</span>
                                                </label>
                                                <Input
                                                    value={variant.value.price}
                                                    onChange={(evt) => {
                                                        const temp = [...variants];
                                                        const idx = temp.findIndex((el) => el.value.index === idex);
                                                        temp[idx].value.price = evt.target.value;
                                                        setVariant([...temp]);
                                                    }}
                                                    className={`nn form-control ${variant.validation.price && "is-invalid"}`}
                                                    placeholder="Price"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4" sm="12">
                                            <FormGroup>
                                                <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                    Price<span className="text-danger">*</span>
                                                </label>
                                                <Input
                                                    value={variant.value.numericPrice}
                                                    onChange={(evt) => {
                                                        const temp = [...variants];
                                                        const idx = temp.findIndex((el) => el.value.index === idex);
                                                        temp[idx].value.numericPrice = evt.target.value;
                                                        setVariant([...temp]);
                                                    }}
                                                    className={`nn form-control ${variant.validation.numericPrice && "is-invalid"}`}
                                                    placeholder="Price"
                                                    type="number"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="2" sm="6">
                                            <FormGroup>
                                                <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                    Action<span className="text-danger">*</span>
                                                </label>
                                                <div className="d-flex">
                                                    <Button
                                                        size="sm"
                                                        color="danger"
                                                        onClick={() => {
                                                            variants.splice(idex, 1);
                                                            setVariant([...variants]);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                ))}
                                <Row>
                                    <Col lg="12" sm="12">
                                        <div className="d-flex align-items-center">
                                            <Button
                                                onClick={() =>
                                                    setVariant([...variants, { ...addRawVariant, value: { ...addRawVariant.value, index: variants.length } }])
                                                }
                                                size="sm"
                                                color="warning"
                                            >
                                                Add New Variant
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <Button color="primary" onClick={handleSubmit}>
                                            Save
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                        <CardFooter className="border-0" style={{ background: "#F1F6FF" }}></CardFooter>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AddVariant;
