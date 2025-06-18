import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ backTo }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (backTo) {
            navigate(backTo);
        } else {
            navigate(-1);
        }
    };

    return (
        <button onClick={handleGoBack} className="secondary-button small d-flex align-items-center">
            <i className="bi bi-arrow-left-circle-fill me-2"></i>
            Regresar
        </button>
    );
};

export default BackButton;
