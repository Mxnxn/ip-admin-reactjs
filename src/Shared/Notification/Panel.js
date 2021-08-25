import { LOREM } from "Constants/Dummy";
import React from "react";
import { X } from "react-feather";
import PanelCard from "./PanelCard";

const Panel = ({ panel, togglePanel }) => {
    return (
        <div className={panel ? "panel panel-show" : "panel"}>
            <div className="close-row">
                <span className="close">
                    <button className="btn btn-sm btn-danger" onClick={togglePanel}>
                        <X size="16" />
                    </button>
                </span>
                <span className="clearall">
                    <button className="btn btn-sm btn-default">Clear All</button>
                </span>
            </div>
            <div className="panel-body">
                <PanelCard title={"Notification 1"} body={LOREM} />
            </div>
        </div>
    );
};

export default Panel;
