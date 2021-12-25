import React from "react";
import { Row, Col, Card, CardHeader, Table, CardFooter } from "reactstrap";
import { useEffect } from "react";
import { useState } from "react";
import HeadingWithSearch from "Shared/CardCustomizations/HeadingWithSearch";
import Loader from "Shared/Loader";
import { FiMoreVertical } from "react-icons/fi";
import Snackbar from "Shared/Notification/Snackbar";
import { Link } from "react-router-dom";
import { PRODUCT } from "Constants/Routes";
import { DeleteProduct, GetProducts, ToggleProductVisibility } from "Product/repository/Product";
import { HiChevronDown, HiOutlineLink } from "react-icons/hi";
import { BsImages } from "react-icons/bs";
import { BiX } from "react-icons/bi";
import { AiOutlineNodeIndex } from "react-icons/ai";

const ProductList = () => {
    const [state, setState] = useState({
        products: [],
        dataFetched: false,
    });

    useEffect(() => {
        const fetch = async () => {
            const products = await GetProducts();
            console.log(products);
            if (products.status) setState({ ...state, products: products.message, dataFetched: true });
        };
        fetch();
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [moreMenu, setMoreMenu] = useState(null);
    const [categoryShow, setCategoryShow] = useState({ open: false, arr: [] });
    const [descriptionShow, setDescriptionShow] = useState({ open: false, msg: "" });

    const displaySnackbar = Snackbar();

    const deleteProduct = async (id, idx) => {
        try {
            const response = await DeleteProduct(id);
            if (response.status) {
                displaySnackbar({
                    head: "Product",
                    variant: "success",
                    message: response.message[0],
                });
                return window.location.reload();
            }
            return displaySnackbar({
                head: "Product",
                variant: "danger",
                message: response.message[0],
            });
        } catch (error) {}
    };

    return state.dataFetched ? (
        <>
            <Row>
                <Col className="mb-5 mb-xl-0" xl="12">
                    <Card className={"bg-white"}>
                        <CardHeader className="bg-white border-0">
                            <HeadingWithSearch mainHeading={"Products"} subHeading={"Added"} btnName={"Add"} url={PRODUCT.path + "/add"} />
                        </CardHeader>
                        <Table className={"pp table-white table-hover table-flush"} responsive={window.innerWidth < 1280 ? true : false}>
                            <thead className={"thead-light"}>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">GSM/Micron</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Categories</th>
                                    <th scope="col">Discription</th>
                                    <th scope="col">Display Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.products.map((prodct, idx) => (
                                    <tr>
                                        <th scope="row">{idx + 1}</th>
                                        <th scope="row">{prodct.name}</th>
                                        <th scope="row">{prodct.gsmOrMicron}</th>
                                        <th scope="row">{prodct.price}</th>
                                        <th scope="row">
                                            <div className="dropdown ">
                                                <button
                                                    type="button"
                                                    aria-haspopup="true"
                                                    aria-expanded="true"
                                                    className="btn-icon-only text-light btn btn-sm"
                                                    onMouseEnter={() => {
                                                        setCategoryShow((prev) => ({ open: idx, arr: prodct.category }));
                                                    }}
                                                    onMouseLeave={() => {
                                                        setCategoryShow((prev) => ({ open: false, arr: [] }));
                                                    }}
                                                >
                                                    <HiChevronDown style={{ fontSize: 15, color: "#115EF6" }} classNameName="text-primary" />
                                                </button>
                                                <div
                                                    tabindex="-1"
                                                    role="menu"
                                                    aria-hidden="false"
                                                    className={
                                                        categoryShow.open === idx
                                                            ? "dropdown-menu-arrow table-dropdown-menu dropdown-menu dropdown-menu-right show"
                                                            : "dropdown-menu-arrow table-dropdown-menu dropdown-menu dropdown-menu-right"
                                                    }
                                                    x-placement="bottom-end"
                                                >
                                                    {categoryShow.arr.map((el) => (
                                                        <span role="menuitem" className="dropdown-item cp">
                                                            {el.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </th>
                                        <th scope="row">
                                            <div className="dropdown ">
                                                <button
                                                    type="button"
                                                    aria-haspopup="true"
                                                    aria-expanded="true"
                                                    className="btn-icon-only text-light btn btn-sm"
                                                    onMouseEnter={() => {
                                                        setDescriptionShow((prev) => ({ open: idx, msg: prodct.description }));
                                                    }}
                                                    onMouseLeave={() => {
                                                        setDescriptionShow((prev) => ({ open: false, msg: "" }));
                                                    }}
                                                >
                                                    <HiChevronDown style={{ fontSize: 15, color: "#115EF6" }} classNameName="text-primary" />
                                                </button>
                                                <div
                                                    tabindex="-1"
                                                    role="menu"
                                                    aria-hidden="false"
                                                    className={
                                                        descriptionShow.open === idx
                                                            ? "dropdown-menu-arrow table-dropdown-menu dropdown-menu dropdown-menu-right show"
                                                            : "dropdown-menu-arrow table-dropdown-menu dropdown-menu dropdown-menu-right"
                                                    }
                                                    x-placement="bottom-end"
                                                >
                                                    <span role="menuitem" className="dropdown-item cp">
                                                        {descriptionShow.msg}
                                                    </span>
                                                </div>
                                            </div>
                                        </th>
                                        <th scope="row">
                                            <label className="custom-toggle">
                                                <input
                                                    defaultChecked={prodct.isAvailable}
                                                    type="checkbox"
                                                    onChange={async () => {
                                                        const res = await ToggleProductVisibility(prodct._id);
                                                        if (res.status)
                                                            displaySnackbar({
                                                                head: "Product",
                                                                variant: "success",
                                                                message: "Status Changed successfully!",
                                                            });
                                                        else
                                                            displaySnackbar({
                                                                head: "Product",
                                                                variant: "error",
                                                                message: "Something Went Wrong",
                                                            });
                                                    }}
                                                />
                                                <span className="custom-toggle-slider rounded-circle" />
                                            </label>
                                        </th>
                                        <th scope="row">
                                            <div className="dropdown ">
                                                <button
                                                    type="button"
                                                    aria-haspopup="true"
                                                    aria-expanded="true"
                                                    className="btn-icon-only text-light btn btn- btn-sm"
                                                    onClick={() => {
                                                        setMoreMenu((prev) => (prev === idx ? null : idx));
                                                    }}
                                                >
                                                    <FiMoreVertical style={{ fontSize: 15, color: "#115EF6" }} classNameName="text-primary" />
                                                </button>
                                                <div
                                                    tabindex="-1"
                                                    role="menu"
                                                    aria-hidden="false"
                                                    className={
                                                        moreMenu === idx
                                                            ? "dropdown-menu-arrow table-dropdown-menu dropdown-menu dropdown-menu-right show"
                                                            : "dropdown-menu-arrow table-dropdown-menu dropdown-menu dropdown-menu-right"
                                                    }
                                                    x-placement="bottom-end"
                                                >
                                                    <Link role="menuitem" to={`${PRODUCT.path}/edit/${prodct._id}`} className="dropdown-item cp">
                                                        <HiOutlineLink />
                                                        Edit Details
                                                    </Link>
                                                    <Link role="menuitem" to={`${PRODUCT.path}/add/${prodct._id}/variant`} className="dropdown-item cp">
                                                        <AiOutlineNodeIndex />
                                                        Add New Variants
                                                    </Link>
                                                    <Link role="menuitem" to={`${PRODUCT.path}/edit/images/${prodct._id}`} className="dropdown-item cp">
                                                        <BsImages />
                                                        Manage Images
                                                    </Link>
                                                    <span
                                                        onClick={() => {
                                                            deleteProduct(prodct._id, idx);
                                                        }}
                                                        role="menuitem"
                                                        className="dropdown-item cp text-danger"
                                                    >
                                                        <BiX />
                                                        Delete
                                                    </span>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <CardFooter className={"bg-white"}>
                            <nav>
                                <div className="col text-warning text-left ml--3">
                                    <span className="fira bg" style={{ fontSize: "14px" }}>
                                        Any kind of information
                                    </span>
                                </div>
                            </nav>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </>
    ) : (
        <Loader />
    );
};

export default ProductList;
