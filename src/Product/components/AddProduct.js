import { PRODUCT } from "Constants/Routes";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ArrowLeft } from "react-feather";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Row } from "reactstrap";
import HeadingWithSearch from "Shared/CardCustomizations/HeadingWithSearch";
import Loader from "Shared/Loader";
import Snackbar from "Shared/Notification/Snackbar";
import { GetCategories } from "Category/Repository/Category";

import KeywordBadge from "Shared/KeywordBadge";
import { RiCloseFill } from "react-icons/ri";
import { AddNewProduct } from "Product/repository/Product";
import { FIXSIZES } from "Constants/Dummy";

const AddProduct = (props) => {
    const displaySnackbar = Snackbar();

    const [state, setState] = useState({
        name: "",
        price: "",
        description: "",
        gsmOrMicron: "",
        isAvailable: false,
        sizeWithQty: false,
        images: [],
        category: [],
        sizes: [],
        eyelets: false,
    });

    const [fetched, setFetched] = useState({
        categories: [],
        stopLoading: false,
        error: false,
    });

    useEffect(() => {
        const fetch = async () => {
            const response = await GetCategories();
            if (response.status) setFetched({ categories: response.message, stopLoading: true });
        };
        fetch();
    }, []);

    const [dynamicEntry, setDynamicEntry] = useState([
        { file: null, error: false },
        { file: null, error: false },
        { file: null, error: false },
        { file: null, error: false },
        { file: null, error: false },
    ]);

    const handleSubCategorySelection = (evt) => {
        console.log(selectedCategory);
        let temp = state.category;
        let tem = fetched.categories.findIndex((el) => el._id === evt.target.value);
        temp = [...new Set([...temp, evt.target.value])];
        setState({ ...state, category: temp });
        setSelectedCategory([...selectedCategory, fetched.categories[tem]]);
    };

    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.set("name", state.name);
        formData.set("price", state.price);
        formData.set("numericPrice", state.numericPrice);
        formData.set("description", state.description);
        if (state.gsmOrMicron) formData.set("gsmOrMicron", parseInt(state.gsmOrMicron));
        formData.set("isAvailable", state.isAvailable);
        formData.set("sizeWithQty", state.sizeWithQty);
        formData.set("eyelets", state.eyelets);
        state.sizes.map((el, i) => formData.set(`sizes[${i}]`, el));
        for (let i = 0; i < state.category.length; i++) {
            const cat = state.category[i];
            formData.set(`category[${i}]`, cat);
        }
        dynamicEntry.forEach((el) => {
            if (el.file) formData.append(`photos`, el.file);
        });
        const response = await AddNewProduct(formData);
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
            message: "Status Changed successfully!",
        });
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
                                    <HeadingWithSearch mainHeading={"Product"} subHeading={"Add"} disableBtn={true} />
                                </CardHeader>
                                <CardBody className=" border-0">
                                    <Form>
                                        {fetched.error && (
                                            <Row>
                                                <Col lg="12">
                                                    <div className="alert alert-danger">{fetched.error}</div>
                                                </Col>
                                            </Row>
                                        )}
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                        Name<span className="text-danger">*</span>
                                                    </label>
                                                    <Input
                                                        value={state.name}
                                                        onChange={(evt) => setState({ ...state, name: evt.target.value })}
                                                        className="nn form-control"
                                                        placeholder="Name"
                                                        name="name"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                        Base Price<span className="text-danger">*</span>
                                                    </label>
                                                    <Input
                                                        value={state.numericPrice}
                                                        onChange={(evt) => setState({ ...state, numericPrice: evt.target.value })}
                                                        className="nn form-control"
                                                        name="numericPrice"
                                                        placeholder="15"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                        Display Price<span className="text-danger">*</span>
                                                    </label>
                                                    <Input
                                                        value={state.price}
                                                        onChange={(evt) => setState({ ...state, price: evt.target.value })}
                                                        className="nn form-control"
                                                        name="price"
                                                        placeholder="Rs 15 per Sq.ft"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                        GSM or Micron<span className="text-danger">*</span>
                                                    </label>
                                                    <Input
                                                        value={state.gsmOrMicron}
                                                        onChange={(evt) => setState({ ...state, gsmOrMicron: evt.target.value })}
                                                        className="nn form-control"
                                                        name="gsmOrMicron"
                                                        placeholder="Weight"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                        Description<span className="text-danger">*</span>
                                                    </label>
                                                    <Input
                                                        value={state.description}
                                                        onChange={(evt) => setState({ ...state, description: evt.target.value })}
                                                        className="nn form-control"
                                                        name="description"
                                                        placeholder="Additional Details"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                        Child Categories<span className="text-danger">*</span>
                                                    </label>
                                                    <select className="form-control form-control" onChange={handleSubCategorySelection}>
                                                        <option value="0">Select</option>
                                                        {fetched.categories &&
                                                            fetched.categories.length > 0 &&
                                                            fetched.categories.map((cat, index) => (
                                                                <option key={index} value={cat._id}>
                                                                    {cat.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                    {selectedCategory.length > 0 &&
                                                        selectedCategory.map((k, idx) => (
                                                            <KeywordBadge
                                                                onClickHandler={() => {
                                                                    let temp = selectedCategory;
                                                                    temp.splice(idx, 1);
                                                                    setSelectedCategory([...temp]);
                                                                }}
                                                                key={k}
                                                                value={k}
                                                            />
                                                        ))}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                        Sizes of Raw Material<span className="text-danger">*</span>
                                                    </label>
                                                    <select
                                                        className="form-control form-control"
                                                        onChange={(evt) => {
                                                            setState({ ...state, sizes: [...state.sizes, Number(evt.target.value)] });
                                                        }}
                                                    >
                                                        <option value="0">Select</option>
                                                        {FIXSIZES.map((number, index) => (
                                                            <option key={index} value={number}>
                                                                {number}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {state.sizes.length > 0 &&
                                                        state.sizes.map((k, idx) => (
                                                            <KeywordBadge
                                                                onClickHandler={(idx) => {
                                                                    let temp = state.sizes;
                                                                    temp.splice(idx, 1);
                                                                    setState({ ...state });
                                                                }}
                                                                key={k}
                                                                value={k}
                                                            />
                                                        ))}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="1">
                                                <FormGroup>
                                                    <label className="form-control-label pp fs-12">
                                                        Available<span className="text-danger">*</span>
                                                    </label>
                                                    <div>
                                                        <label className="custom-toggle">
                                                            <input
                                                                defaultChecked={state.isAvailable}
                                                                type="checkbox"
                                                                onChange={async () => {
                                                                    setState((prev) => ({ ...state, isAvailable: !prev.isAvailable }));
                                                                }}
                                                            />
                                                            <span className="custom-toggle-slider rounded-circle" />
                                                        </label>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="3">
                                                <FormGroup>
                                                    <label className="form-control-label pp fs-12">
                                                        Length and Height Required for Order<span className="text-danger">*</span>
                                                    </label>
                                                    <div>
                                                        <label className="custom-toggle">
                                                            <input
                                                                defaultChecked={state.sizeWithQty}
                                                                type="checkbox"
                                                                onChange={async () => {
                                                                    setState((prev) => ({ ...state, sizeWithQty: !prev.sizeWithQty }));
                                                                }}
                                                            />
                                                            <span className="custom-toggle-slider rounded-circle" />
                                                        </label>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="1">
                                                <FormGroup>
                                                    <label className="form-control-label pp fs-12">
                                                        Eyelets Option<span className="text-danger">*</span>
                                                    </label>
                                                    <div>
                                                        <label className="custom-toggle">
                                                            <input
                                                                defaultChecked={state.eyelets}
                                                                type="checkbox"
                                                                onChange={async () => {
                                                                    setState((prev) => ({ ...state, eyelets: !prev.eyelets }));
                                                                }}
                                                            />
                                                            <span className="custom-toggle-slider rounded-circle" />
                                                        </label>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <label className="form-control-label pp fs-12">
                                                    Images<span className="text-danger">*</span>
                                                </label>
                                            </Col>
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
                                                    {form.file && (
                                                        <Col lg="1">
                                                            <button
                                                                className="alert btn-danger"
                                                                onClick={() => {
                                                                    dynamicEntry[idx].file = null;
                                                                    setDynamicEntry([...dynamicEntry]);
                                                                }}
                                                                style={{ height: "47px" }}
                                                            >
                                                                <RiCloseFill />
                                                            </button>
                                                        </Col>
                                                    )}
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
                                    </Form>
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

export default AddProduct;
