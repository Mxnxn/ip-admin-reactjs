import React from "react";
import { Row, Col, Card, CardHeader, Table, CardFooter } from "reactstrap";
import { useEffect } from "react";
import { useState } from "react";
import HeadingWithSearch from "Shared/CardCustomizations/HeadingWithSearch";
import Loader from "Shared/Loader";
import { GetAllUsers, RestrictUser, UnblockUser } from "User/Repository/User";
import { FiMoreVertical } from "react-icons/fi";
import Snackbar from "Shared/Notification/Snackbar";
import { Link } from "react-router-dom";
import { USER } from "Constants/Routes";
import ImagePreview from "Shared/Modals/ImagePreview";
import GlobalLogout from "Shared/GlobalLogout";

const UserList = () => {
    const [state, setState] = useState({
        users: [],
        dataFetched: false,
    });

    useEffect(() => {
        const fetch = async () => {
            const users = await GetAllUsers();
            if (users.code === 401) return GlobalLogout();
            if (users.status) setState({ ...state, users: users.message, dataFetched: true });
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
            const index = state.users.findIndex((user) => user._id === id);
            state.users[index].granted_access = false;
            setState({ ...state });
            return displaySnackbar({ head: "User", variant: "danger", message: response.message[0] });
        }
        return displaySnackbar({ head: "User", variant: "danger", message: response.message[0] });
    };

    const onClickActive = async (id) => {
        const response = await UnblockUser(id);
        setMoreMenu(null);
        if (response.status) {
            const index = state.users.findIndex((user) => user._id === id);
            state.users[index].granted_access = true;
            setState({ ...state });
            return displaySnackbar({ head: "User", variant: "success", message: response.message[0] });
        }
        return displaySnackbar({ head: "User", variant: "danger", message: response.message[0] });
    };

    const [modal, setModal] = useState({ open: false, imageSrc: null });

    return state.dataFetched ? (
        <>
            <Row>
                <ImagePreview modal={modal.open} imageSrc={modal.imageSrc} onCancelHandler={() => setModal({ open: false, imageSrc: null })} />
                <Col className="mb-5 mb-xl-0" xl="12">
                    <Card className={"bg-white"}>
                        <CardHeader className="bg-white border-0">
                            <HeadingWithSearch mainHeading={"Users"} subHeading={"Added"} btnName={"Add"} disableBtn={true} />
                        </CardHeader>
                        <Table className={"pp table-white table-hover table-flush"} responsive={window.innerWidth < 1280 ? true : false}>
                            <thead className={"thead-light"}>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Access</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.users.map((user, idx) => (
                                    <tr>
                                        <th scope="row">{user.name}</th>
                                        <th scope="row">{user.email}</th>
                                        <th scope="row">{user.phone}</th>
                                        <th scope="row">
                                            {user.granted_access ? (
                                                <span className="text-success">Granted</span>
                                            ) : (
                                                <span className="text-danger">Restricted</span>
                                            )}
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
                                                    <span onClick={() => {}} role="menuitem" className="dropdown-item cp">
                                                        Preview Orders
                                                    </span>
                                                    <Link to={`${USER.path}/${user._id}`} role="menuitem" className="dropdown-item cp">
                                                        Preview Wallet
                                                    </Link>
                                                    <span
                                                        onClick={() => {
                                                            setModal({ open: true, imageSrc: user.businessproof });
                                                            setMoreMenu(null);
                                                        }}
                                                        role="menuitem"
                                                        className="dropdown-item cp"
                                                    >
                                                        Preview BusinessProof
                                                    </span>
                                                    {user.granted_access ? (
                                                        <span onClick={() => onClickBlock(user._id)} role="menuitem" className="dropdown-item cp text-danger">
                                                            Restrict
                                                        </span>
                                                    ) : (
                                                        <span onClick={() => onClickActive(user._id)} role="menuitem" className="dropdown-item cp text-success">
                                                            Unblock
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

export default UserList;
