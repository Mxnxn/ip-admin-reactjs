import { PRODUCT } from "Constants/Routes";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ArrowLeft } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Row } from "reactstrap";
import HeadingWithSearch from "Shared/CardCustomizations/HeadingWithSearch";
import Loader from "Shared/Loader";
import Snackbar from "Shared/Notification/Snackbar";

import { RiCloseFill } from "react-icons/ri";
import { AddProductImage, DeleteProductImage, getProduct } from "Product/repository/Product";

const EditImageProduct = (props) => {
    const { id } = useParams();
    const displaySnackbar = Snackbar();

    const [state, setState] = useState({
        name: "",
        price: "",
        description: "",
        gsmOrMicron: "",
        isAvailable: false,
        images: [],
        category: [],
    });

    const [fetched, setFetched] = useState({
        categories: [],
        stopLoading: false,
        error: false,
    });

    useEffect(() => {
        const fetch = async () => {
            const product = await getProduct(id);
            if (product.status) {
                setState({ ...state, images: product.message.images, name: product.message.name, _id: product.message._id });
                setFetched({ ...fetched, stopLoading: true });
                let temp = [];
                for (let i = 0; i < parseInt(5 - product.message.images.length); i++) {
                    temp = [...temp, { file: null, error: false }];
                }
                setDynamicEntry([...temp]);
            }
        };
        fetch();
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [dynamicEntry, setDynamicEntry] = useState([]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append(`id`, state._id);
        dynamicEntry.forEach((el) => {
            if (el.file) formData.append(`photos`, el.file);
        });
        const response = await AddProductImage(formData);
        if (!response.status) {
            return displaySnackbar({
                head: "Product",
                variant: "danger",
                message: response.message[0],
            });
        }
        displaySnackbar({
            head: "Product",
            variant: "success",
            message: "Added Changed successfully!",
        });
        window.location.reload();
    };

    const deleteImage = async (iid, pid) => {
        try {
            const formData = new FormData();
            formData.set("iid", iid);
            formData.set("id", pid);
            const response = await DeleteProductImage(formData);
            if (response.status) {
                let temp = [...state.images];
                let idx = temp.findIndex((el) => el._id === iid);
                temp.splice(idx, 1);
                setState({ ...state, images: [...temp] });
                setDynamicEntry([...dynamicEntry, { file: null, error: false }]);
                return displaySnackbar({
                    head: "Product",
                    variant: "success",
                    message: response.message[0],
                });
            }
            displaySnackbar({
                head: "Product",
                variant: "danger",
                message: "Something Went Wrong!",
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {fetched.stopLoading && (
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
                                    <HeadingWithSearch mainHeading={state.name} subHeading={"Add"} disableBtn={true} />
                                </CardHeader>
                                <CardBody className=" border-0">
                                    {fetched.error && (
                                        <Row>
                                            <Col lg="12">
                                                <div className="alert alert-danger">{fetched.error}</div>
                                            </Col>
                                        </Row>
                                    )}

                                    <Row>
                                        <Col lg="6">
                                            <label className="form-control-label pp fs-12">
                                                Images<span className="text-danger">*</span>
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {state.images.map((el) => (
                                            <Col lg="3">
                                                <FormGroup>
                                                    <Card style={{ overflow: "hidden" }}>
                                                        <img src={process.env.REACT_APP_API_URL + "/uploads/" + el.url} alt="img" />
                                                        <CardBody>
                                                            <button
                                                                onClick={() => {
                                                                    deleteImage(el._id, el.product);
                                                                }}
                                                                className="btn btn-sm btn-danger"
                                                            >
                                                                Delete
                                                            </button>
                                                        </CardBody>
                                                    </Card>
                                                </FormGroup>
                                            </Col>
                                        ))}
                                    </Row>
                                    <Row>
                                        {dynamicEntry.map((form, idx) => (
                                            <>
                                                <Col lg="5">
                                                    <FormGroup>
                                                        <input
                                                            onChange={(evt) => {
                                                                console.log(evt.target.files[0].type);
                                                                if (evt.target.files[0].type === "image/jpg" || evt.target.files[0].type === "image/jpeg") {
                                                                    dynamicEntry[idx].file = evt.target.files[0];
                                                                    dynamicEntry[idx].error = false;
                                                                    setDynamicEntry([...dynamicEntry]);
                                                                } else {
                                                                    dynamicEntry[idx].file = null;
                                                                    dynamicEntry[idx].error = "Please upload in valid Format";
                                                                    setDynamicEntry([...dynamicEntry]);
                                                                }
                                                            }}
                                                            type="file"
                                                            id={`img-upload-${idx}`}
                                                            style={{ display: "none" }}
                                                        />
                                                        <div
                                                            disabled
                                                            className={"alert bg-white "}
                                                            name="clientName"
                                                            onClick={() => document.getElementById(`img-upload-${idx}`).click()}
                                                            placeholder="Valid Format is jpeg and jpg."
                                                            style={{
                                                                padding: "0.75rem 1.5rem",
                                                                cursor: "pointer",
                                                                boxShadow: "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
                                                            }}
                                                        >
                                                            {form.file ? form.file.name : !form.error && "Valid Format are jpeg, jpg and png."}
                                                            {form.error && <span>{form.error}</span>}
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="1">
                                                    <button className="alert btn-danger" style={{ height: "47px" }}>
                                                        <RiCloseFill />
                                                    </button>
                                                </Col>
                                            </>
                                        ))}
                                    </Row>

                                    <Row className="mt-3">
                                        <Col lg="6">
                                            <Button color="primary" onClick={handleSubmit}>
                                                Add
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter className="border-0" style={{ background: "#F1F6FF" }}></CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
            {!fetched.stopLoading && <Loader />}
        </>
    );
};

export default EditImageProduct;
