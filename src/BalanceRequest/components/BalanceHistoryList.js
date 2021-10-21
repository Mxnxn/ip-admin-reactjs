import React from "react";
import { Row, Col, Card, CardHeader, Table, CardFooter } from "reactstrap";
import { useEffect } from "react";
import { useState } from "react";
import HeadingWithSearch from "Shared/CardCustomizations/HeadingWithSearch";
import Loader from "Shared/Loader";
import { FiMoreVertical } from "react-icons/fi";
import Snackbar from "Shared/Notification/Snackbar";
import { useParams } from "react-router-dom";
import { BALANCEREQUEST } from "Constants/Routes";
import ImagePreview from "Shared/Modals/ImagePreview";
import ChangeModal from "Shared/Modals/ChangeModal";
import { GetBalanceRequests, GrantBalanceRequest, RejectBalanceRequest } from "BalanceRequest/Repository/BalanceHistory";
import { getDate } from "Constants/Helpers";
import Pagination from "Shared/Pagination/Pagination";
import ConfirmModal from "Shared/Modals/ConfirmModal";
import DelaySnackbar from "Shared/Notification/DelaySnackbar";
import { HiCheck, HiOutlineX } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import { BsFileEarmarkCheck } from "react-icons/bs";

const BalanceHistoryList = () => {
    const { page } = useParams();
    const [state, setState] = useState({
        requests: [],
        dataFetched: false,
    });

    useEffect(() => {
        const fetch = async () => {
            const requests = await GetBalanceRequests(page);
            console.log(requests);
            if (requests.status) setState({ ...state, requests: requests.message.requests, count: requests.message.count, dataFetched: true });
            console.log(requests);
        };
        fetch();
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const [moreMenu, setMoreMenu] = useState(null);

    const displaySnackbar = Snackbar();
    const delaySnackbar = DelaySnackbar();

    const [modal, setModal] = useState({ open: false, text: "", catid: "" });
    const [confirmModal, setConfirmModal] = useState({ open: false, bhid: "", uid: "" });
    const [rejectModal, setRejectModal] = useState({ open: false, bhid: "", uid: "", text: "" });

    const [cpage, setPage] = useState(parseInt(page));

    const grantRequest = async () => {
        const formdata = new FormData();
        formdata.set("bhid", confirmModal.bhid);
        formdata.set("uid", confirmModal.uid);
        const response = await GrantBalanceRequest(formdata);
        if (response.status) {
            const index = state.requests.findIndex((txn) => txn._id === confirmModal.bhid);
            state.requests[index].granted = true;
            setState({ ...state });
            setConfirmModal({ open: false, bhid: "", uid: "" });
            return displaySnackbar({ head: "Requested", variant: "success", message: response.message[0] });
        }
        return displaySnackbar({ head: "Requested", variant: "danger", message: response.message[0] });
    };

    const rejectRequest = async () => {
        const formdata = new FormData();
        formdata.set("bhid", rejectModal.bhid);
        formdata.set("uid", rejectModal.uid);
        formdata.set("reason", rejectModal.text);
        const response = await RejectBalanceRequest(formdata);
        if (response.status) {
            const index = state.requests.findIndex((txn) => txn._id === rejectModal.bhid);
            state.requests[index].reject = true;
            state.requests[index].reason = rejectModal.text;
            setState({ ...state });
            setRejectModal({ open: false, bhid: "", uid: "", text: "" });
            return displaySnackbar({ head: "Requested", variant: "success", message: response.message[0] });
        }
        return displaySnackbar({ head: "Requested", variant: "danger", message: response.message[0] });
    };

    return state.dataFetched ? (
        <>
            <Row>
                <ConfirmModal
                    modal={confirmModal.open}
                    onCancelHandler={() => setConfirmModal({ open: false, bhid: "", uid: "" })}
                    handleSubmit={grantRequest}
                />
                <ChangeModal
                    modal={rejectModal.open}
                    state={rejectModal}
                    onCancelHandler={() => setRejectModal({ open: false, bhid: "", uid: "", text: "" })}
                    onChangeValue={(evt) => setRejectModal({ ...rejectModal, text: evt.target.value })}
                    handleSubmit={rejectRequest}
                />
                <ImagePreview modal={modal.open} imageSrc={modal.imageSrc} onCancelHandler={() => setModal({ open: false, imageSrc: null })} />
                <Col className="mb-5 mb-xl-0" xl="12">
                    <Card className={"bg-white"}>
                        <CardHeader className="bg-white border-0">
                            <HeadingWithSearch mainHeading={"Requests"} subHeading={"User's"} btnName={"Add"} disableBtn={true} />
                        </CardHeader>
                        <Table className={"pp table-white table-hover table-flush"} responsive={window.innerWidth < 1280 ? true : false}>
                            <thead className={"thead-light"}>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Requested On</th>
                                    <th scope="col">Modified On</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.requests.map((txn, idx) => (
                                    <tr>
                                        <th scope="row">{idx + 1}</th>
                                        <th scope="row">{txn.uid.name}</th>
                                        <th scope="row">{txn.uid.phone}</th>
                                        <th scope="row">{txn.balance}</th>
                                        <th scope="row">{getDate(txn.createdAt)}</th>
                                        <th scope="row">{getDate(txn.updatedAt)}</th>
                                        <th scope="row">
                                            {!txn.granted && !txn.reject && <span className="text-primary">Pending</span>}
                                            {txn.granted && <span className="text-success">Added to wallet</span>}
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
                                                            setMoreMenu(null);
                                                            setModal({ open: true, imageSrc: txn.file });
                                                        }}
                                                        role="menuitem"
                                                        className="dropdown-item cp "
                                                    >
                                                        <BsFileEarmarkCheck />
                                                        Preview Receipt
                                                    </span>
                                                    {txn.reject && (
                                                        <span
                                                            onClick={() => {
                                                                setMoreMenu(null);

                                                                delaySnackbar({ message: txn.reason });
                                                            }}
                                                            role="menuitem"
                                                            className="dropdown-item cp text-danger"
                                                        >
                                                            <AiOutlineEye />
                                                            Preview Reason
                                                        </span>
                                                    )}
                                                    {!txn.granted && !txn.reject && (
                                                        <span
                                                            onClick={() => {
                                                                setMoreMenu(null);
                                                                setConfirmModal({ open: true, bhid: txn._id, uid: txn.uid._id });
                                                            }}
                                                            role="menuitem"
                                                            className="dropdown-item cp text-success"
                                                        >
                                                            <HiCheck />
                                                            Credit to Wallet
                                                        </span>
                                                    )}
                                                    {!txn.granted && !txn.reject && (
                                                        <span
                                                            onClick={() => {
                                                                setMoreMenu(null);
                                                                setRejectModal({ open: true, bhid: txn._id, uid: txn.uid._id, text: "" });
                                                            }}
                                                            role="menuitem"
                                                            className="dropdown-item cp text-danger"
                                                        >
                                                            <HiOutlineX />
                                                            Reject Request
                                                        </span>
                                                    )}
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
                                <Pagination count={state.count} currentPage={cpage} setPage={setPage} fromPath={BALANCEREQUEST.path} />
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

export default BalanceHistoryList;
