import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import OrganizationData from "./OrganizationData";

function NavBar(){

    const navigate = useNavigate();

    const handleRegisterButtonClick = () => {
        navigate("/report");
    };

    const handleTermsButtonClick = () => {
        navigate("/terms-of-use");
    };

    return (
    
        <div className="border-bottom border-1 border-dark sticky-top" style={{ backgroundColor: "white" }}>
        
            <div className="d-flex justify-content-between align-items-center mx-2" style={{ minHeight: "100px" }}>
                
                <div className="d-flex align-items-center">
                    
                    <button
                        className="btn d-xl-none me-2"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#mobileMenu"
                    >
                        <i className="bi bi-list fs-2"></i>
                    </button>
                    <h1 className="m-0">Tendedero Virtual de Denuncia</h1>

                </div>
                
                <button
                    className="main-button d-none d-xl-block"
                    onClick={handleRegisterButtonClick}
                >
                    Registrar denuncia
                </button>

            </div>
  
            <div className="d-none d-xl-flex justify-content-between align-items-center mx-2 mb-2">
                
                <Link to={"/terms-of-use"} className="text-muted">
                    Términos de Uso
                </Link>

            </div>
        
            <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="mobileMenu"
            >

                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Tendedero Virtual de Denuncia</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
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
                            onClick={handleTermsButtonClick}
                            data-bs-dismiss="offcanvas"
                        >
                            Términos de Uso
                        </button>

                        <div className="mt-auto">
                            <OrganizationData/>
                        </div>

                    </div>
                    
                </div>

            </div>
        
        </div>
    );
}

export default NavBar;