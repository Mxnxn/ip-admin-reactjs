import { PRODUCT } from "Constants/Routes";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ArrowLeft } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Row } from "reactstrap";
import HeadingWithSearch from "Shared/CardCustomizations/HeadingWithSearch";
import Loader from "Shared/Loader";
import Snackbar from "Shared/Notification/Snackbar";
import { GetCategories } from "Category/Repository/Category";

import KeywordBadge from "Shared/KeywordBadge";
import { EditAProduct, getProduct } from "Product/repository/Product";
import { FIXSIZES } from "Constants/Dummy";

const EditProduct = (props) => {
    const { id } = useParams();
    const displaySnackbar = Snackbar();

    const [state, setState] = useState({
        name: "",
        price: "",
        description: "",
        gsmOrMicron: "",
        isAvailable: false,
        sizeWithQty: false,
        eyelets: false,
        category: [],
        sizes: [],
    });

    const [fetched, setFetched] = useState({
        categories: [],
        stopLoading: false,
        error: false,
    });

    useEffect(() => {
        const fetch = async () => {
            const response = await GetCategories();
            const product = await getProduct(id);
            if (product.status) {
                setState({
                    pid: product.message._id,
                    name: product.message.name,
                    price: product.message.price,
                    description: product.message.description,
                    gsmOrMicron: product.message.gsmOrMicron,
                    isAvailable: product.message.isAvailable,
                    sizeWithQty: product.message.sizeWithQty,
                    category: product.message.category.map((el) => el._id),
                    sizes: product.message.sizes,
                    eyelets: product.message.eyelets,
                });
                setSelectedCategory(product.message.category);
            }
            if (response.status) setFetched({ categories: response.message, stopLoading: true });
        };
        fetch();
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubCategorySelection = (evt) => {
        let temp = state.category;
        temp = [...new Set([...temp, evt.target.value])];
        setState({ ...state, category: temp });
        let arr = [];
        for (let i = 0; i < temp.length; i++) {
            let idx = fetched.categories.findIndex((el) => el._id === temp[i]);
            arr = [...arr, fetched.categories[idx]];
        }
        setSelectedCategory([...arr]);
    };

    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.set("id", state.pid);
        formData.set("name", state.name);
        formData.set("price", state.price);
        formData.set("description", state.description);
        formData.set("gsmOrMicron", parseInt(state.gsmOrMicron));
        formData.set("isAvailable", state.isAvailable);
        formData.set("sizeWithQty", state.sizeWithQty);
        formData.set("eyelets", state.eyelets);
        state.sizes.map((el, i) => formData.set(`sizes[${i}]`, el));
        for (let i = 0; i < state.category.length; i++) {
            const cat = state.category[i];
            formData.set(`category[${i}]`, cat);
        }

        const response = await EditAProduct(formData);
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
            message: response.message[0],
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
                                                        className="nn form-control-alternative"
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
                                                        value={state.price}
                                                        onChange={(evt) => setState({ ...state, price: evt.target.value })}
                                                        className="nn form-control-alternative"
                                                        name="price"
                                                        placeholder="Price"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                        GSM or Micron<span className="text-danger"> (optional)</span>
                                                    </label>
                                                    <Input
                                                        value={state.gsmOrMicron}
                                                        onChange={(evt) => setState({ ...state, gsmOrMicron: evt.target.value })}
                                                        className="nn form-control-alternative"
                                                        name="gsmOrMicron"
                                                        placeholder="Weight"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                        Description<span className="text-danger">*</span>
                                                    </label>
                                                    <Input
                                                        value={state.description}
                                                        onChange={(evt) => setState({ ...state, description: evt.target.value })}
                                                        className="nn form-control-alternative"
                                                        name="description"
                                                        placeholder="Additional Details"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                        Categories<span className="text-danger">*</span>
                                                    </label>
                                                    <select className="form-control form-control-alternative" onChange={handleSubCategorySelection}>
                                                        <option value="0">Select</option>
                                                        {fetched.categories &&
                                                            fetched.categories.length > 0 &&
                                                            fetched.categories.map((cat, index) => (
                                                                <option key={index} value={cat._id}>
                                                                    {cat.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                    {selectedCategory.length > 0 && selectedCategory.map((k, idx) => <KeywordBadge key={k} value={k} />)}
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label pp fs-12" htmlFor="input-name">
                                                        Sizes of raw materials<span className="text-danger">*</span>
                                                    </label>
                                                    <select
                                                        className="form-control form-control-alternative"
                                                        onChange={(evt) => {
                                                            setState({ ...state, sizes: [...state.sizes, Number(evt.target.value)] });
                                                        }}
                                                    >
                                                        <option value="0">Select</option>
                                                        {FIXSIZES.map((num, index) => (
                                                            <option key={index} value={num}>
                                                                {num}
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
                                                        Length and Height required for Order<span className="text-danger">*</span>
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
                                            <Col lg="3">
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

                                        <Row className="mt-3">
                                            <Col lg="6">
                                                <Button color="primary" onClick={handleSubmit}>
                                                    Edit
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

export default EditProduct;
