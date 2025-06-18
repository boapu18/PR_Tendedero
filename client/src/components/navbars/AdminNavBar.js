import React from "react";
import LogOutButton from "../auth/LogOutButton";
import { useNavigate } from "react-router-dom";

function AdminNavBar() {
    const navigate = useNavigate();

    const handleConfigButtonClick = () => {
        navigate("/amatista/config");
    };

    const handleAdminReportsButtonClick = () => {
        navigate("/amatista");
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
                    <div className="d-flex flex-column">
                        <button
                            className="main-button mb-3"
                            onClick={handleAdminReportsButtonClick}
                            data-bs-dismiss="offcanvas"
                        >
                            Administrar denuncias
                        </button>
                        <button
                            className="main-button mb-3"
                            onClick={handleConfigButtonClick}
                            data-bs-dismiss="offcanvas"
                        >
                            Configuración
                        </button>
                        <LogOutButton />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminNavBar;
