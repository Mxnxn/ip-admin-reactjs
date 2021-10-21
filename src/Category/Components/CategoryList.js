import React from "react";
import { Row, Col, Card, CardHeader, Table, CardFooter } from "reactstrap";
import { useEffect } from "react";
import { useState } from "react";
import HeadingWithSearch from "Shared/CardCustomizations/HeadingWithSearch";
import Loader from "Shared/Loader";
import { FiMoreVertical } from "react-icons/fi";
import Snackbar from "Shared/Notification/Snackbar";
import { EditCategory, GetCategories } from "Category/Repository/Category";
import ChangeModal from "Shared/Modals/ChangeModal";

const CategoryList = () => {
    const [state, setState] = useState({
        categories: [],
        dataFetched: false,
    });

    useEffect(() => {
        const fetch = async () => {
            const categories = await GetCategories();
            console.log(categories);
            if (categories.status) setState({ ...state, categories: categories.message, dataFetched: true });
        };
        fetch();
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [moreMenu, setMoreMenu] = useState(null);

    const displaySnackbar = Snackbar();

    const [modal, setModal] = useState({ open: false, text: "", catid: "" });

    const editCategoryName = async (id) => {
        const formdata = new FormData();
        formdata.set("cat", id);
        formdata.set("name", modal.text);
        const response = await EditCategory(formdata);
        console.log(response);
        if (response.status) {
            const index = state.categories.findIndex((el) => el._id === id);
            state.categories[index].name = modal.text;
            setState({ ...state });
            setModal({ open: false, text: "", catid: "" });
            console.log("here", response);
            return displaySnackbar({ head: "Category", variant: "success", message: response.message[0] });
        }
        setModal({ open: false, text: "", catid: "" });
        return displaySnackbar({ head: "Category", variant: "danger", message: response.message[0] });
    };

    return state.dataFetched ? (
        <>
            <Row>
                <ChangeModal
                    modal={modal.open}
                    state={modal}
                    onCancelHandler={() => setModal({ open: false, text: "", catid: "" })}
                    onChangeValue={(evt) => setModal({ ...modal, text: evt.target.value })}
                    handleSubmit={() => editCategoryName(modal.catid)}
                />
                <Col className="mb-5 mb-xl-0" xl="5">
                    <Card className={"bg-white"}>
                        <CardHeader className="bg-white border-0">
                            <HeadingWithSearch mainHeading={"Categories"} subHeading={"Added"} btnName={"Add"} />
                        </CardHeader>
                        <Table className={"pp table-white table-hover table-flush"} responsive={window.innerWidth < 1280 ? true : false}>
                            <thead className={"thead-light"}>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>

                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.categories.map((cat, idx) => (
                                    <tr>
                                        <th scope="row">{idx + 1}</th>
                                        <th scope="row">{cat.name}</th>
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
                                                    <span
                                                        onClick={() => {
                                                            setModal({ open: true, text: cat.name, catid: cat._id });
                                                            setMoreMenu(null);
                                                        }}
                                                        role="menuitem"
                                                        className="dropdown-item cp"
                                                    >
                                                        Edit
                                                    </span>
                                                    <span role="menuitem" className="dropdown-item cp text-danger">
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

export default CategoryList;
