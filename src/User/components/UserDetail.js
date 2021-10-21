import React from "react";
import { Row, Col, Card, CardHeader, Table, CardFooter } from "reactstrap";
import { useEffect } from "react";
import { useState } from "react";
import HeadingWithSearch from "Shared/CardCustomizations/HeadingWithSearch";
import Loader from "Shared/Loader";
import { RestrictUser, UnblockUser, GetUserDetail } from "User/Repository/User";
import { FiMoreVertical, FiUserCheck, FiUserX } from "react-icons/fi";
import Snackbar from "Shared/Notification/Snackbar";
import { useHistory, useParams } from "react-router-dom";
import { CgArrowLeft } from "react-icons/cg";
import { getDate } from "Constants/Helpers";
import ImagePreview from "Shared/Modals/ImagePreview";

const UserDetail = () => {
    const { uid } = useParams();

    const [state, setState] = useState({
        user: [],
        dataFetched: false,
    });

    useEffect(() => {
        const fetch = async () => {
            const user = await GetUserDetail(uid);
            if (user.status) setState({ ...state, user: user.message, dataFetched: true });
        };
        fetch();
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [moreMenu, setMoreMenu] = useState(null);

    const displaySnackbar = Snackbar();

    const onClickBlock = async (id) => {
        const response = await RestrictUser(id);
        setMoreMenu(null);
        if (response.status) {
            state.user.granted_access = false;
            setState({ ...state });
            return displaySnackbar({ head: "User", variant: "danger", message: response.message[0] });
        }
        return displaySnackbar({ head: "User", variant: "danger", message: response.message[0] });
    };

    const onClickActive = async (id) => {
        const response = await UnblockUser(id);
        setMoreMenu(null);
        if (response.status) {
            state.user.granted_access = true;
            setState({ ...state });
            return displaySnackbar({ head: "User", variant: "success", message: response.message[0] });
        }
        return displaySnackbar({ head: "User", variant: "danger", message: response.message[0] });
    };

    const history = useHistory();

    const [modal, setModal] = useState({ open: false, imageSrc: null });

    return state.dataFetched ? (
        <>
            <ImagePreview
                modal={modal.open}
                imageSrc={modal.imageSrc}
                onCancelHandler={() => {
                    setModal({ open: false, imageSrc: null });
                }}
            />
            <Row className="mb-3">
                <button className="btn btn-primary ml-3" onClick={() => history.goBack()}>
                    <CgArrowLeft style={{ fontSize: 18, marginRight: 8 }} />
                    Back
                </button>
                {state.user.granted_access ? (
                    <button className="btn btn-danger" onClick={() => onClickBlock(state.user._id)}>
                        <FiUserX style={{ fontSize: 18, marginRight: 8 }} />
                        Restrict User
                    </button>
                ) : (
                    <button className="btn btn-success" onClick={() => onClickActive(state.user._id)}>
                        <FiUserCheck style={{ fontSize: 18, marginRight: 8 }} />
                        Unblock User
                    </button>
                )}
            </Row>
            <Row>
                <Col className="mb-5 mb-xl-0" xl="3">
                    <Card className={"bg-white"}>
                        <CardHeader className="bg-white border-0">
                            <HeadingWithSearch mainHeading={"Wallet"} subHeading={state.user.name} btnName={"Add"} disableBtn={true} />
                        </CardHeader>
                        <Table className={"pp table-white table-hover table-flush"} responsive={window.innerWidth < 1280 ? true : false}>
                            <thead className={"thead-light"}>
                                <tr>
                                    <th scope="col">Current Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{state.user.wallet.currentBalance}</th>
                                </tr>
                            </tbody>
                        </Table>
                        <CardFooter className={"bg-white"}>
                            <nav>
                                <div className="col text-warning text-left ml--3"></div>
                            </nav>
                        </CardFooter>
                    </Card>
                </Col>
                <Col className="mb-5 mb-xl-0" xl="9">
                    <Card className={"bg-white"}>
                        <CardHeader className="bg-white border-0">
                            <HeadingWithSearch mainHeading={"Balance History"} subHeading={state.user.name} btnName={"Add"} disableBtn={true} />
                        </CardHeader>
                        <Table className={"pp table-white table-hover table-flush"} responsive={window.innerWidth < 1280 ? true : false}>
                            <thead className={"thead-light"}>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Balance</th>
                                    <th scope="col">Requested</th>
                                    <th scope="col">Updated On</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.user.wallet.balanceHistory.map((txn, idx) => (
                                    <tr>
                                        <th scope="row">{idx + 1}</th>
                                        <th scope="row">{txn.balance}</th>
                                        <th scope="row">{getDate(txn.createdAt)}</th>
                                        <th scope="row">{getDate(txn.updatedAt)}</th>
                                        <th scope="row">
                                            {!txn.granted && !txn.reject && <span className="text-primary">Pending</span>}
                                            {txn.granted && <span className="text-success">Success</span>}
                                            {txn.reject && <span className="text-danger">Rejected</span>}
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
                                                    <span
                                                        onClick={() => {
                                                            setModal({ open: true, imageSrc: txn.file });
                                                            setMoreMenu(null);
                                                        }}
                                                        role="menuitem"
                                                        className="dropdown-item cp"
                                                    >
                                                        Receipt
                                                    </span>
                                                    <span onClick={() => {}} role="menuitem" className="dropdown-item cp">
                                                        Change Status
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
                                <div className="col text-warning text-left ml--3"></div>
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

export default UserDetail;
