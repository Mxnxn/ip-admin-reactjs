import React from "react";
import { FiMoreVertical } from "react-icons/fi";

const MoreMenu = ({ onPress }) => {
    return (
        <button type="button" aria-haspopup="true" aria-expanded="true" onClick={onPress} class="btn-icon-only text-light btn btn- btn-sm">
            <FiMoreVertical style={{ fontSize: 15 }} className="text-primary" />
        </button>
    );
};

export default MoreMenu;
