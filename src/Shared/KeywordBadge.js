import React from "react";
import { IoClose } from "react-icons/io5";

const KeywordBadge = ({ value, onClickHandler }) => {
    return (
        <div className="badge mt-2 mr-2 badge-primary badge-lg ">
            <span>{value.name}</span>
            <span className="text text-danger" style={{ cursor: "pointer" }}>
                <IoClose onClick={onClickHandler} style={{ fontSize: 18 }} />
            </span>
        </div>
    );
};

export default KeywordBadge;
