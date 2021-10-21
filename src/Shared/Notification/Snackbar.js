import React from "react";

import { useSnackbar } from "notistack";
import { FiX } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect } from "react";
import { useState } from "react";

const Snackbar = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [state, setState] = useState({
        head: "",
        message: "",
        variant: "",
    });

    useEffect(() => {
        if (state.head && state.variant && state.message)
            enqueueSnackbar(
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        alignContent: "center",
                        padding: "1rem",
                        borderRadius: 9,
                        height: "100%",
                        background: state.variant === "success" ? "#2DCE89" : "#f5365c",
                    }}
                >
                    <span style={{ cursor: "pointer", color: "white", margin: "auto 0" }}>
                        {state.variant === "success" ? (
                            <AiOutlineCheckCircle style={{ height: 28, width: 28, marginRight: 24 }} />
                        ) : (
                            <AiOutlineCloseCircle style={{ height: 28, width: 28, marginRight: 24 }} />
                        )}
                    </span>
                    <div className="d-flex" style={{ height: 40, flexDirection: "column" }}>
                        <div className="row">
                            <span className="pp" style={{ textTransform: "capitalize" }}>
                                {state.head}
                            </span>
                        </div>
                        <div className="row">
                            <span className="pp-l fs-12" style={{ color: "text.secondary" }}>
                                {state.message}
                            </span>
                        </div>
                    </div>
                </div>,
                {
                    autoHideDuration: 2500,
                    action: (key) => (
                        <span
                            style={{
                                background: state.variant === "success" ? "#2DCE89" : "#f5365c",
                                cursor: "pointer",
                                color: "white",
                            }}
                            onClick={() => {
                                closeSnackbar(key);
                            }}
                        >
                            <FiX style={{ fontSize: 18 }} />
                        </span>
                    ),
                }
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return (value) => setState({ head: value.head, variant: value.variant, message: value.message });
};

export default Snackbar;
