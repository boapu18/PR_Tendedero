import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ backTo }) => {
    return (
        <Link to={backTo} className="btn border-0 p-0 bg-transparent">
            <i className="bi bi-caret-left-fill fs-2"></i>
        </Link>
    );
};

export default BackButton;
