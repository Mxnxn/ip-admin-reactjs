import React from "react";
import { IoClose } from "react-icons/io5";

const KeywordBadge = ({ value, onClickHandler, idx }) => {
    return (
        <div className="badge mt-2 mr-2 badge-primary badge-lg ">
            <span>{value.name ? value.name : value}</span>
            <span className="text text-danger" style={{ cursor: "pointer" }}>
                <IoClose onClick={() => onClickHandler()} style={{ fontSize: 18 }} />
            </span>
        </div>
    );
};

export default KeywordBadge;
