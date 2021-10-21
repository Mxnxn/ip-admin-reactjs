import React from "react";

import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useState } from "react";

const DelaySnackbar = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [state, setState] = useState({
        message: "",
    });

    useEffect(() => {
        if (state.message)
            enqueueSnackbar(
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center",
                        padding: "1rem",
                        borderRadius: 9,
                        background: "#115EF6",
                    }}
                >
                    <div className="d-flex" style={{ height: 40, flexDirection: "column" }}>
                        <div className="row">
                            <span className="pp-l fs-12" style={{ color: "text.secondary", marginRight: 12, marginLeft: 12 }}>
                                {state.message}
                            </span>
                        </div>
                    </div>
                </div>,
                {
                    autoHideDuration: 5000,
                }
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return (value) => setState({ message: value.message });
};

export default DelaySnackbar;
