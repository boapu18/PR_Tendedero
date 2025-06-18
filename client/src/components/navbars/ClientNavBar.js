import React from "react";
import { useNavigate } from "react-router-dom";

function ClientNavBar() {
    const navigate = useNavigate();

    const handleRegisterButtonClick = () => {
        navigate("/report");
    };

    const handleTermsButtonClick = () => {
        navigate("/terms-of-use");
    };

    const handleAboutButtonClick = () => {
        navigate("/about");
    };

    return (
        <div
            className="border-bottom border-1 border-dark sticky-top"
            style={{ backgroundColor: "white" }}
        >
            <div
                className="d-flex justify-content-between align-items-center mx-2"
                style={{ minHeight: "100px" }}
            >
                <div className="d-flex align-items-center">
                    <button
                        className="btn me-2"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#mobileMenu"
                    >
                        <i className="bi bi-list fs-2"></i>
                    </button>
                    <h1 className="m-0">Tendedero Virtual de Denuncia</h1>
                </div>
            </div>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileMenu">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Tendedero Virtual de Denuncia</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                    ></button>
                </div>

                <div className="offcanvas-body">
                    <div className="d-flex flex-column h-100 position-relative">
                        <button
                            className="main-button mb-3"
                            onClick={handleRegisterButtonClick}
                            data-bs-dismiss="offcanvas"
                        >
                            Registrar denuncia
                        </button>

                        <button
                            className="main-button mb-3"
                            onClick={handleAboutButtonClick}
                            data-bs-dismiss="offcanvas"
                        >
                            Acerca del sitio
                        </button>

                        <button
                            className="main-button mb-3"
                            onClick={handleTermsButtonClick}
                            data-bs-dismiss="offcanvas"
                        >
                            Términos de Uso
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientNavBar;
