import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function NavBar(){

    const navigate = useNavigate();

    const handleRegisterButtonClick = () => {
        navigate("/report");
    };

    return (
        <div className="border-bottom border-1 border-dark sticky-top" style={{backgroundColor: "white"}}>
            <div className="d-flex justify-content-between align-items-center mx-2" style={{minHeight: "100px"}}>
                <h1>Tendedero Virtual de Denuncia</h1>
                <button className="main-button" onClick={handleRegisterButtonClick}>Registrar denuncia</button>
            </div>
            <div className="d-flex justify-content-between align-items-center mx-2 mb-2">
                <Link to={"/terms-of-use"} className="text-muted">Términos de Uso</Link>
            </div>
        </div>
    );
}

export default NavBar;